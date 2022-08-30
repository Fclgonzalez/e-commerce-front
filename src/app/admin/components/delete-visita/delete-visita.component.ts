import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VisitaService } from 'src/app/visitas/services/visita.service';

@Component({
  selector: 'app-delete-visita',
  templateUrl: './delete-visita.component.html',
  styleUrls: ['./delete-visita.component.css']
})
export class DeleteVisitaComponent implements OnInit {

  idVisita!: number
  loading = false

  constructor(
    private visitaService: VisitaService,
    private dialogRef: MatDialogRef<DeleteVisitaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.idVisita = this.data
  }

  deleteVisita() {
    this.loading = true
    this.visitaService.deleteVisita(this.idVisita).subscribe(
      () => {
        this.loading = false
        this.snackbar.open('Visita deletada com sucesso.', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close(true)
      }
    )
  }

}
