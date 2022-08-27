import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Visita } from 'src/app/visitas/models/visita';
import { VisitaService } from 'src/app/visitas/services/visita.service';
import { UserService } from '../../services/user.service';
import { CancelarVisitaComponent } from '../cancelar-visita/cancelar-visita.component';
import { EditarVisitaComponent } from '../editar-visita/editar-visita.component';

@Component({
  selector: 'app-tabela-visitas',
  templateUrl: './tabela-visitas.component.html',
  styleUrls: ['./tabela-visitas.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TabelaVisitasComponent implements OnInit {

  visitasConsumidor!: Visita[]
  visitasVendedor!: Visita[]
  colunas: string[] = ['data', 'horario', 'imovel', 'status', 'cancelar']
  colunasExpandidas = [...this.colunas, 'expand']
  expandedElement!: Visita | null

  vendedor: boolean = false

  constructor(
    private visitaService: VisitaService,
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.recuperarVisitasConsumidor()
    this.recuperarVisitasVendedor()
    this.roleUSer()
  }

  recuperarVisitasConsumidor() {
    const email = this.authService.decodeToken().sub
    this.userService.getUsuarioByUsername(email).subscribe(
      (user) => {
        this.visitaService.getVisitasByConsumidorId(user.idUser!).subscribe(
          (visitas) => {
            this.visitasConsumidor = visitas
          }
        )
      }
    )
  }
  
  recuperarVisitasVendedor() {
    const email = this.authService.decodeToken().sub
    this.userService.getUsuarioByUsername(email).subscribe(
      (user) => {
        this.visitaService.getVisitasByVendedorId(user.idUser!).subscribe(
          (visitas) => {
            this.visitasVendedor = visitas
          }
        )
      }
    )
  }

  roleUSer(){
    const roles = this.authService.decodeToken().roles
    
    if (roles.includes("ADMIN") || roles.includes("VENDEDOR")) {
      this.vendedor = true
      
    }
  }

  cancelarVisita(idVisita: number) {
    this.dialog.open(CancelarVisitaComponent).afterClosed().subscribe(
      (deletar) => {
        if (deletar) {
          this.visitaService.patchStatusVisita(idVisita, 'CANCELADO').subscribe(
            () => {
              this.recuperarVisitasConsumidor()
            }
          )
        }
      }
    )
  }
  
  editarVisita(idVisita: number) {
    this.dialog.open(EditarVisitaComponent).afterClosed().subscribe(
      (response) => {
        console.log(response);
          this.visitaService.patchStatusVisita(idVisita, response).subscribe(
            () => {
              this.recuperarVisitasVendedor()
            }
          )
        }
    )
  }



}
