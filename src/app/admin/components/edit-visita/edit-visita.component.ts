import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Visita } from 'src/app/visitas/models/visita';
import { VisitaService } from 'src/app/visitas/services/visita.service';
import { DeleteVisitaComponent } from '../delete-visita/delete-visita.component';

@Component({
  selector: 'app-edit-visita',
  templateUrl: './edit-visita.component.html',
  styleUrls: ['./edit-visita.component.css']
})
export class EditVisitaComponent implements OnInit {

  loading:boolean = false
  desabilitarBtn:boolean = true
  visita!: Visita
  formVisita: FormGroup = this.fb.group({
    horarioVisita: ['', [ Validators.required ]],
    dataVisita: ['', [ Validators.required]],
    statusVisita: ['', [ Validators.required]],
    idImovel: ['', [ Validators.required ]],
    idConsumidor: ['', [ Validators.required ]],
  })

  constructor(
    private visitaService: VisitaService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DeleteVisitaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    
    this.recuperarVisita()
  }

  recuperarVisita() {
    this.formVisita.setValue({
      horarioVisita: this.data.horarioVisita,
      dataVisita: this.data.dataVisita,
      statusVisita: this.data.statusVisita,
      idImovel: this.data.imovel.idImovel,
      idConsumidor: this.data.userConsumidor.idUser
    })
    this.valorMudou()
  }

  atualizarVisita() {
    this.loading = true
    const idVisita = this.data.idVisita
    const visita: Visita = {
      horarioVisita: this.formVisita.value.horarioVisita,
      dataVisita: this.formVisita.value.dataVisita
    }
    this.visitaService.patchVisita(visita, idVisita).subscribe(
      () => {
        this.visitaService.patchStatusVisita(idVisita, this.formVisita.value.statusVisita)
        .subscribe(
          () => {
            this.loading = false
            this.snackbar.open('Visita atualizada com sucesso.', 'Ok', {
            duration: 3000
            })
            this.dialogRef.close(true)
          }
        )
      }
    )
  }

  valorMudou() {
    this.formVisita.valueChanges.subscribe((valores) => {
      this.desabilitarBtn =
        this.formVisita.invalid ||
        !(
          valores.horarioVisita != this.data.horarioVisita ||
          valores.dataVisita != this.data.dataVisita ||
          valores.statusVisita != this.data.statusVisita ||
          valores.idConsumidor != this.data.userConsumidor.idUser ||
          valores.idImovel != this.data.imovel.idImovel
        );
    });
  }



}
