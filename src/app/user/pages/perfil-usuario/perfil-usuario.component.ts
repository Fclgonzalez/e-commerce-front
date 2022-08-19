import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Endereco } from 'src/app/enderecos/models/endereco';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  dados: boolean = true
  endereco: boolean = false
  salvandoEndereco: boolean = false

  formEndereco: FormGroup = this.fb.group({
    logradouro: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    complemento: [''],
    bairro: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    uf: ['', [Validators.required, Validators.minLength(2)]]
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  salvar(): void {
    this.salvandoEndereco = true
    const f: Endereco = this.formEndereco.value
    const endereco: Endereco = this.formEndereco.value

  }

}
