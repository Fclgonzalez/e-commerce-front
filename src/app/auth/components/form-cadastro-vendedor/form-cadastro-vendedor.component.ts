import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ImoveisService } from 'src/app/imoveis/service/imoveis.service';
import { User } from 'src/app/user/models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form-cadastro-vendedor',
  templateUrl: './form-cadastro-vendedor.component.html',
  styleUrls: ['./form-cadastro-vendedor.component.css'],
})
export class FormCadastroVendedorComponent implements OnInit {
  cadastroFormVendedor: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    identificacao: ['', [Validators.required]],
  });

  // chamar o model
  // ex: imovel:Imovel[]=[]
  // ex: caracteristica:caracteristicas[]=[]
  tipoImovelEnum: Array<string> = ['aro', 'bro', 'cro', 'dro', 'ero'];
  finalidadeImovelEnum: Array<string> = [
    'aman',
    'eman',
    'iman',
    'oman',
    'uman',
  ];
  caracteristicasLista: Array<string> = [
    'lista',
    'liste',
    'listi',
    'listo',
    'listu',
  ];

  cadastroImovel: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    alugar: [false, Validators.required],
    vender: [false, Validators.required],
    valorAluguel: [0],
    valorVenda: [0],
    tipoImovel: ['', Validators.required],
    finalidadeImovel: ['', Validators.required],
    quarto: [0, Validators.required],
    banheiro: [0, Validators.required],
    suite: [0, Validators.required],
    vaga: [0, Validators.required],
    area: [0, Validators.required],
    caracteristicas: [null],
    descricao: [''],
  });

  cadastroEndereco: FormGroup = this.fb.group({
    logradouro: ['', Validators.required],
    numero: [null, Validators.required],
    complemento: [''],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
    uf: ['', [Validators.required, Validators.minLength(2)]],
    cep: [null, [Validators.required, Validators.minLength(8)]],
  });

  dadosConsultaEndereco(dados: any, dadosForm: FormGroup) {
    var cepInput = document.getElementById('cep') as HTMLInputElement;
    dadosForm.setValue({
      cep: cepInput.value,
      logradouro: dados.logradouro,
      numero: null,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      uf: dados.uf,
    });
  }

  constructor(
    private fb: FormBuilder,
    private imoveisService: ImoveisService,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  cadastrarVendedor() {
   /*  const login: User = this.cadastroFormVendedor.value;
    this.authService.cadastrarVendedor(login).subscribe(() => {
      this.snackbar.open('Cadastrado com sucesso', 'Ok', {
        duration: 3000,
      });
      this.router.navigateByUrl('/auth/email');
    }); */
  }

  cadastrarImovel() {
    // regra: transformar o uf em upperCase
    const upper = this.cadastroEndereco.value.uf.toUpperCase();
    console.log(upper);

    console.log(this.cadastroImovel.value.titulo);

    // regra -- se o botao checkbox estiver desabilitado, zerar o valor

    // pelo menos um checkbox tem que estar true
  }

  cadastrarEndereco() {
    console.log(this.cadastroEndereco.value.logradouro);
  }

  async consultaCep(cep: string, form: any) {
    await this.imoveisService.buscar(cep).subscribe((dados) => {
      this.dadosConsultaEndereco(dados, form);
    });
  }

  passwordRegistro() {
    var senha = document.getElementById('senha') as HTMLInputElement;

    if (senha.type == 'password') {
      senha.type = 'text';
    } else {
      senha.type = 'password';
    }
  }
}
