import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Visita } from 'src/app/visitas/models/visita';
import { VisitaService } from 'src/app/visitas/services/visita.service';

@Component({
  selector: 'app-cadastrar-visita',
  templateUrl: './cadastrar-visita.component.html',
  styleUrls: ['./cadastrar-visita.component.css']
})
export class CadastrarVisitaComponent implements OnInit {

  loading:boolean = false
  formVisita: FormGroup = this.fb.group({
    horarioVisita: ['', [ Validators.required ]],
    dataVisita: ['', [ Validators.required]],
    idImovel: ['', [ Validators.required ]],
    idConsumidor: ['', [ Validators.required ]],
  })

  constructor(
    private visitaService: VisitaService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CadastrarVisitaComponent>,
    @Inject(LOCALE_ID) public locale: string,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  cadastrarVisita() {
    this.loading = true
    const visita: Visita = {
      horarioVisita: this.formVisita.value.horarioVisita,
      dataVisita: formatDate(this.formVisita.value.dataVisita, 'dd/MM/yyyy', this.locale)
    }
    this.visitaService.postVisita(visita, this.formVisita.value.idConsumidor, this.formVisita.value.idImovel)
    .subscribe(
      (response) => {
        this.loading = false
        console.log(response);
        this.snackbar.open('Visita cadastrada com sucesso.', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close(true)
      }
    )
  }

}
