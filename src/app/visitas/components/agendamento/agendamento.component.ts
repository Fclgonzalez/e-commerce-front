import { formatDate, formatNumber } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Imovel } from 'src/app/imoveis/models/imovel';
import { ImoveisService } from 'src/app/imoveis/service/imoveis.service';
import { User } from 'src/app/user/models/user';
import { UserService } from 'src/app/user/services/user.service';
import { Visita } from '../../models/visita';
import { VisitaService } from '../../services/visita.service';
import { HorarioIndisponivelComponent } from '../horario-indisponivel/horario-indisponivel.component';
import { LoginAgendarVisitaComponent } from '../login-agendar-visita/login-agendar-visita.component';
import { SolicitacaoVisitaComponent } from '../solicitacao-visita/solicitacao-visita.component';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  consumidor?: User
  imovel?: Imovel
  card: boolean = true
  agenda: boolean = false
  enviado: boolean = false
  data: Date = new Date()
  date: Date = new Date()
  desabilitar: boolean = false

  time: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  hourStep = 1;
  minuteStep = 15;

  constructor(
    private route: ActivatedRoute,
    private visitaService: VisitaService,
    private imovelService: ImoveisService,
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  ngOnInit(): void {
    this.recuperarImovel()
    this.date.setDate(this.date.getDate() + 1)
    this.data = this.date
  }

  recuperarImovel() {
    this.route.paramMap.subscribe(
      (params) => {
        let idImovel = parseInt(params.get('idImovel') ?? '0')
        this.imovelService.getImoveisById(idImovel).subscribe(
          (imov) => {
            this.imovel = imov 
            this.recuperarConsumidor()
          }
        )
      }
    )
  }

  recuperarConsumidor() {
    if (this.authService.logado()) {
      const email = this.authService.decodeToken().sub
      this.userService.getUsuarioByUsername(email).subscribe(
        (user) => {
          this.consumidor = user
          this.desabilitarBtnVisita()
        }
      )
    }
  }

  agendarVisita() {
    if (this.authService.logado()) {
      this.card = false
      this.agenda = true
    } else {
      this.dialog.open(LoginAgendarVisitaComponent)
    }
  }

  confirmarVisita(): void {
    const minutos = formatNumber(this.time.minute, this.locale, "2.0-0")
    const horas = formatNumber(this.time.hour, this.locale, "2.0-0")
    const visita: Visita = {
      dataVisita: formatDate(this.data, 'dd/MM/yyyy', this.locale),
      horarioVisita: `${horas}:${minutos}`,
    }
    this.visitaService.getVisitasByImovelId(this.imovel?.idImovel!).subscribe({
      next: (visitas) => {
        for (const v of visitas) {
          if (visita.dataVisita == v.dataVisita && visita.horarioVisita == v.horarioVisita){
            return this.dialog.open(HorarioIndisponivelComponent, {disableClose:true})
          }
        }
        return this.cadastrarVisita(visita)
      },
      error: () => {
        return this.cadastrarVisita(visita)
      }
    })
  }

  cadastrarVisita(visita: Visita) {
    this.visitaService.postVisita(visita, this.consumidor?.idUser!, this.imovel?.idImovel!).subscribe(
      () => {
        this.enviado = true
        this.card = true
        this.agenda = false
        this.dialog.open(SolicitacaoVisitaComponent, {disableClose:true})
      }
    )
  }

  desabilitarBtnVisita() {
    if (this.consumidor?.idUser == this.imovel?.userVendedor?.idUser) {
      this.desabilitar = true
    }
  }

}
