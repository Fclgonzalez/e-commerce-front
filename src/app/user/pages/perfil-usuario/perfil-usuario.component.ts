import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Endereco } from 'src/app/enderecos/models/endereco';
import { EnderecosService } from 'src/app/enderecos/services/enderecos.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit {
  dados: boolean = true;
  dadosEndereco: boolean = false;
  user!: User;
  parteVendedor: boolean = false;
  endereco!: Endereco;
  salvandoEndereco: boolean = false;
  salvandoUsuario: boolean = false;
  desabilitarUsuario: boolean = false;
  desabilitarEndereco: boolean = false;
  idUser?: number = 0;
  idEndereco?: number = 0;

  formUser: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.email]],
    telefone: [''],
    celular: ['', [Validators.required]],
  });

  formEndereco: FormGroup = this.fb.group({
    logradouro: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    complemento: [''],
    cep: ['', [Validators.required, Validators.minLength(8)]],
    bairro: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    uf: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private title: Title,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private enderecoService: EnderecosService,
    private route: ActivatedRoute
  ) { }

 

  ngOnInit(): void {
    this.userService.atualizarUsuarioSub$.subscribe((atualizar) => {
      if (atualizar) {
        this.recuperarUsuario();
      }
      this.verificarConsumidorVendedorAdmin()
    });

    this.enderecoService.atualizarEndereco$.subscribe((atualizar) => {
      if (atualizar) {
        this.recuperarEnderecoUsuario();
      }
    });

    this.idUsuario()

    
    

  }
  idUsuario() {
    const email = this.authService.decodeToken().sub;
    return this.userService
      .getUsuarioByUsername(email)
      .subscribe((response) => {
        this.idUser = response.idUser;

      });

  }

  recuperarUsuario() {
    if (this.authService.logado()) {
      const email = this.authService.decodeToken().sub;
      this.userService.getUsuarioByUsername(email).subscribe((user) => {
        this.user = user;
        this.formUser.setValue({
          nome: this.user.nome,
          username: this.user.username,
          celular: this.user.celular,
          telefone: this.user.telefone,
        });
        this.valorMudouUser();
      });
    }
  }

  recuperarEnderecoUsuario() {
    if (this.authService.logado()) {
      const id = this.authService.decodeToken().sub;
      this.userService.getUsuarioByUsername(id).subscribe((user) => {
        this.endereco = user.endereco

        if (user.endereco != null) {
          this.formEndereco.setValue({
            logradouro: this.endereco.logradouro,
            numero: this.endereco.numero,
            complemento: this.endereco.complemento,
            bairro: this.endereco.bairro,
            cep: this.endereco.cep,
            cidade: this.endereco.cidade,
            uf: this.endereco.uf,
          });
        }
         this.valorMudouEnderecoUsuario(); 

      });
    }

  }

  valorMudouUser() {
    this.desabilitarUsuario = true;
    this.formUser.valueChanges.subscribe((valores) => {
      this.desabilitarUsuario =
        this.formUser.invalid ||
        !(
          valores.nome != this.user.nome ||
          valores.username != this.user.username ||
          valores.celular != this.user.celular ||
          valores.telefone != this.user.telefone
        );
    });
  }

  valorMudouEnderecoUsuario() {
    this.desabilitarEndereco = true;
    this.formEndereco.valueChanges.subscribe((valores) => {
      var retorno!: boolean 

      if(this.endereco!=null || this.endereco!=undefined){
      retorno =  (valores.logradouro != this.endereco.logradouro|| 
          valores.numero != this.endereco.numero ||
          valores.complemento != this.endereco.complemento ||
          valores.cep != this.endereco.cep|| 
          valores.bairro != this.endereco.bairro ||
          valores.cidade != this.endereco.cidade ||
          valores.uf != this.endereco.uf)
      }

      this.desabilitarEndereco =
        this.formEndereco.invalid 
        !( retorno );
    });
  }

  atualizarUser(): void {
    this.salvandoUsuario = true;
    const u: User = { ...this.formUser.value };
    u.idUser = this.user.idUser;
    u.identificacao = this.user.identificacao;
    this.userService.patchUsuario(u.username, u).subscribe((usuario) => {
      this.snackbar.open('Alterações Salvas com Sucesso!', 'Ok', {
        duration: 3000,
      });
      this.dialog.closeAll();
    });
  }

  atualizarEndereco(): void {
    this.salvandoEndereco = true;
    const e: Endereco = { ...this.formEndereco.value };

    if (this.endereco == null || this.endereco == undefined) {
      this.salvarEndereco()
    }

    else {
      e.idEndereco = this.endereco.idEndereco;
      this.enderecoService.atualizarEndereco(e).subscribe((endereco) => {
        this.snackbar.open('Alterações Salvas com Sucesso!', 'Ok', {
          duration: 3000,
        });
        this.dialog.closeAll();
      });
    }
  }

  salvarEndereco() {
    const en: Endereco = this.formEndereco.value;
    this.enderecoService
      .cadastrarEnderecoUsuario(en, this.idUser)

      .subscribe(
        (dadosEndereco) => {
          this.snackbar.open('Cadastrado com sucesso', 'Ok', {
            duration: 3000,
          });

        },
        (errorEnderero) => {

          this.snackbar.open(
            'Não foi possível realizar o cadastro do endereço',
            'Ok',
            {
              duration: 3000,
            }
          );
          console.log(errorEnderero);
        }
      );
  }


  verificarConsumidorVendedorAdmin() {
    const role = this.authService.decodeToken().roles;

    if (role.includes('ADMIN') || role.includes('VENDEDOR')) {
      this.parteVendedor = true;

    }
  }
}
