import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Visita } from 'src/app/visitas/models/visita';
import { VisitaService } from 'src/app/visitas/services/visita.service';
import { CadastrarVisitaComponent } from '../../components/cadastrar-visita/cadastrar-visita.component';
import { DeleteVisitaComponent } from '../../components/delete-visita/delete-visita.component';
import { EditVisitaComponent } from '../../components/edit-visita/edit-visita.component';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.css']
})
export class VisitasComponent implements OnInit {

  visitas!: Visita[]
  pageSize = 10
  page = 1
  loading = false
  visita!: Visita

  constructor(
    private visitaService: VisitaService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.recuperarVisitas()
  }

  recuperarVisitas() {
    this.visitaService.getVisitas().subscribe(
      (visitas) => {
        this.visitas = visitas
      }
    )
  }

  recuperarVisita(visita: Visita) {
    this.visitaService.getVisitaById(visita.idVisita!).subscribe(
      (visita) => {
        this.dialog.open(EditVisitaComponent, {
          data: visita,
          width: '500px',
          position: {top: '30px'}
        }).afterClosed().subscribe(
          (response) => {
            if (response) {
              this.recuperarVisitas()
            }
          }
        )
      }
    )
  }

  adicionarVisita() {
    this.dialog.open(CadastrarVisitaComponent, {
      width: '500px',
      position: {top: '30px'}
    }).afterClosed().subscribe(
      (response) => {
        if (response) {
          this.recuperarVisitas()
        }
      }
    )
  }

  deletarVisita(idVisita: number) {
        this.dialog.open(DeleteVisitaComponent, {
          data: idVisita,
          height: '250px',
          width: '500px',
          position: {top: '30px'}
        }).afterClosed().subscribe(
          (response) => {
            if (response) {
              this.recuperarVisitas()
            }
          }
        )
  }

}
