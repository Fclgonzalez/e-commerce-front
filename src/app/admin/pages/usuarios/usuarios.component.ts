import { Endereco } from 'src/app/enderecos/models/endereco';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../interface/usuario';
import { UsersService } from './users.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public allUsers!: Usuario[];
  public pageSize = 10;
  public page = 1;
  public selectedTrace: any;
  public user: boolean = false;

  formUsuario: FormGroup = this.fb.group({
    nome: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    identificacao: ['', [ Validators.required ]],
    celular: ['', []],
    telefone: ['', []],
  })

  formEndereco: FormGroup = this.fb.group({
    logradouro: ['', []],
    numero: ['', []],
    complemento: ['', []],
    bairro: ['', []],
    cep: ['', []],
    cidade: ['', []],
    uf: ['', []]
  })

  constructor(
    private usuarioService: UsersService,
    private fb: FormBuilder,
    private title: Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle("E-commerce Imobiliaria: Perfil Usuário")
    this.getAllUsers();
  }

  public onSelectTrace(trace: any): void {
    console.log(trace);

    this.selectedTrace = trace;
    document.getElementById('trace-modal')?.click();
    this.getFormUsuario();
  }


  private getAllUsers(): void {
    this.usuarioService.getAllUsers().subscribe((response: any) => {

      this.allUsers = response;
      console.log(this.allUsers);
      this.user = true;
    });
  }
 public getFormUsuario(): any{

  this.formEndereco.reset();


  this.formUsuario.setValue({
    nome: this.selectedTrace.nome,
    email: this.selectedTrace.username,
    identificacao: this.selectedTrace.identificacao,
    celular: this.selectedTrace.celular,
    telefone: this.selectedTrace.telefone
  })
  if(this.selectedTrace.endereco != null){
  this.formEndereco.setValue({
    logradouro: this.selectedTrace.endereco.logradouro,
    numero: this.selectedTrace.endereco.numero,
    complemento: this.selectedTrace.endereco.complemento,
    bairro: this.selectedTrace.endereco.bairro,
    cep: this.selectedTrace.endereco.cep,
    cidade: this.selectedTrace.endereco.cidade,
    uf: this.selectedTrace.endereco.uf
  })}
  console.log(this.formUsuario.value);
}
}
