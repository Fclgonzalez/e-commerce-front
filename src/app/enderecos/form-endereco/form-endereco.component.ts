import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Enderecos } from '../models/endereco';
import { EnderecosService } from '../services/enderecos.service';

@Component({
  selector: 'app-form-endereco',
  templateUrl: './form-endereco.component.html',
  styleUrls: ['./form-endereco.component.css']
})
export class FormEnderecoComponent implements OnInit {
  salvandoEndereco: boolean = false
  
  formEndereco: FormGroup = this.fb.group({
    logradouro: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    complemento: [''],
    bairro: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    uf: ['', [Validators.required]]
  })

  constructor(
    private fb:FormBuilder,
    private enderecoService: EnderecosService,
    private dialogRef: MatDialogRef<FormEnderecoComponent>,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
    
  ) { }

  ngOnInit(): void {}

    salvar(): void {
      this.salvandoEndereco = true
      const f: Enderecos = this.formEndereco.value
  }


}
