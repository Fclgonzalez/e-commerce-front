import { Role } from './../../interface/role';
import { filter } from 'rxjs';
import { Endereco } from 'src/app/enderecos/models/endereco';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../interface/usuario';
import { UsersService } from './users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { newUser } from '../../interface/newUser';
import * as e from 'express';

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
  public selectedAction: any;
  public user: boolean = false;
  public selectedPromotion: any;
  public loading = false;
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

  formNewUser: FormGroup = this.fb.group({
    nomeUser: ['', [ Validators.required ]],
    username: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required ]],
    identificacaoUser: ['', [ Validators.required ]],

  })


  constructor(private usuarioService: UsersService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getAllUsers();



  }

  public onSelectTrace(trace: any): void {


    this.selectedTrace = trace;
    document.getElementById('trace-modal')?.click();
    this.getFormUsuario();
    console.log(this.selectedTrace.roles);

  }

  public onSelectAction(trace: any){
    this.selectedAction = trace;
    document.getElementById('action-modal')?.click();


  }

  public onSelectNewUser(){
    document.getElementById('new-user-modal')?.click();
  }

  public onSelectPromote(trace: any){
    this.selectedPromotion = trace;



    document.getElementById('promote-modal')?.click();
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

}

  public saveEndereco(): void {
    const endereco: Endereco = {
      idEndereco: this.selectedTrace.endereco?.idEndereco,
      logradouro: this.formEndereco.value.logradouro,
      numero: this.formEndereco.value.numero,
      complemento: this.formEndereco.value.complemento,
      bairro: this.formEndereco.value.bairro,
      cep: this.formEndereco.value.cep,
      cidade: this.formEndereco.value.cidade,
      uf: this.formEndereco.value.uf
    }
    this.loading = true;
    this.usuarioService.saveEndereco(this.selectedTrace.idUser, endereco).subscribe((response: any) => {
      if(this.selectedTrace.endereco != null){

        this.snackbar.open('Endereço atualizado com sucesso!', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

      } else{
        this.snackbar.open('Endereço Criado com sucesso!', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
      document.getElementById('close-modal')?.click();
      this.getAllUsers();
      this.loading = false;
    }
    )



  }


  public saveUsuario(): void {
    const usuario: Usuario = {
      idUser: this.selectedTrace.idUser,
      username: this.formUsuario.value.email,
      nome: this.formUsuario.value.nome,
      identificacao: this.formUsuario.value.identificacao,
      celular: this.formUsuario.value.celular,
      telefone: this.formUsuario.value.telefone,
      endereco: this.selectedTrace.endereco,
      roles: this.selectedTrace.roles
    }
    this.loading = true;


    this.usuarioService.patchUser(usuario).subscribe((response: any) => {
      this.getAllUsers();
      this.snackbar.open('Usuário atualizado com sucesso!', 'Fechar', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      document.getElementById('close-modal')?.click();
      this.loading = false;
    }
    )
    }
    disableEnableUser(): void{
      this.loading = true;
      this.usuarioService.disableEnableUser(this.selectedAction.username).subscribe((response: any) => {

        this.getAllUsers();
        this.snackbar.open('Usuário atualizado com sucesso!', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        document.getElementById('close-modal2')?.click();
        this.loading = false;
      }
      )

    }

    deleteUser(): void{
      this.loading = true;
      this.usuarioService.deleteUser(this.selectedAction.idUser).subscribe((response: any) => {

        this.getAllUsers();
        this.snackbar.open('Usuário deletado com sucesso!', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        document.getElementById('close-modal2')?.click();
        this.loading = false;
      }
      )

    }

    public saveNewUser(): void {
      const usuario: newUser = {
        username: this.formNewUser.value.username,
        nome: this.formNewUser.value.nomeUser,
        identificacao: this.formNewUser.value.identificacaoUser,
        password: this.formNewUser.value.password,
      }

      this.loading = true;

      this.usuarioService.newUser(usuario).subscribe((response: any) => {

        this.getAllUsers();
        this.snackbar.open('Usuário criado com sucesso!', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        document.getElementById('close-modal3')?.click();
        this.loading = false;
      }
      )
      this.formNewUser.reset();
      }
      promoteUser(): void{
        this.loading = true;
        this.usuarioService.promoteUser(this.selectedPromotion.idUser).subscribe((response: any) => {

          this.getAllUsers();
          this.snackbar.open('Usuário promovido para admin!', 'Fechar', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });

          document.getElementById('close-modal4')?.click();
          this.loading = false;
        }
        )

      }
      isAdmin(trace: any): boolean{
        return trace = trace.roles.some((role: Role) => role.name == 'ADMIN');
      }

  }


