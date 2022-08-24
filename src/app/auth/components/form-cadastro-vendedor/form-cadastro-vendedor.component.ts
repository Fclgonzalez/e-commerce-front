import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Endereco } from 'src/app/enderecos/models/endereco';
import { EnderecosService } from 'src/app/enderecos/services/enderecos.service';
import { Caracteristica } from 'src/app/imoveis/caracteristicas/models/caracteristica';
import { CaracteristicasService } from 'src/app/imoveis/caracteristicas/services/caracteristicas.service';
import { Imovel } from 'src/app/imoveis/models/imovel';
import { ImoveisService } from 'src/app/imoveis/service/imoveis.service';
import { User } from 'src/app/user/models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form-cadastro-vendedor',
  templateUrl: './form-cadastro-vendedor.component.html',
  styleUrls: ['./form-cadastro-vendedor.component.css'],
})
export class FormCadastroVendedorComponent implements OnInit {
  salvandoInformacoes: boolean = false;
  caracteristica: Caracteristica[] = [];
  foto!: FileList
  fotoPreview: string = '';

  tipoImovelEnum: Array<any> = [
    {
      nome: 'Andar Corporativo',
      tipo: 'ANDAR_CORPORATIVO',
    },
    {
      nome: 'Apartamento',
      tipo: 'APARTAMENTO',
    },
    {
      nome: 'Armazém',
      tipo: 'ARMAZEM',
    },
    {
      nome: 'Casa',
      tipo: 'CASA',
    },
    {
      nome: 'Casa Comercial',
      tipo: 'CASA_COMERCIAL',
    },
    {
      nome: 'Casa de Vila',
      tipo: 'CASA_DE_VILA',
    },
    {
      nome: 'Chácara',
      tipo: 'CHACARA',
    },
    {
      nome: 'Cobertura',
      tipo: 'COBERTURA',
    },
    {
      nome: 'Condomínio',
      tipo: 'CONDOMINIO',
    },
    {
      nome: 'Depósito',
      tipo: 'DEPOSITO',
    },
    {
      nome: 'Fazenda',
      tipo: 'FAZENDA',
    },
    {
      nome: 'Flat',
      tipo: 'FLAT',
    },
    {
      nome: 'Galpão',
      tipo: 'GALPAO',
    },
    {
      nome: 'Garagem',
      tipo: 'GARAGEM',
    },
    {
      nome: 'Hotel',
      tipo: 'HOTEL',
    },
    {
      nome: 'Laje Corporativa',
      tipo: 'LAJE_CORPORATIVA',
    },
    {
      nome: 'Loja',
      tipo: 'LOJA',
    },
    {
      nome: 'Lote',
      tipo: 'LOTE',
    },
    {
      nome: 'Motel',
      tipo: 'MOTEL',
    },
    {
      nome: 'Prédio Inteiro',
      tipo: 'PREDIO_INTEIRO',
    },
    {
      nome: 'Ponto Comercial',
      tipo: 'PONTO_COMERCIAL',
    },
    {
      nome: 'Pousada',
      tipo: 'POUSADA',
    },
    {
      nome: 'Sala',
      tipo: 'SALA',
    },
    {
      nome: 'Salão',
      tipo: 'SALAO',
    },
    {
      nome: 'Sítio',
      tipo: 'SITIO',
    },
    {
      nome: 'Terreno',
      tipo: 'TERRENO',
    },
  ];
  finalidadeImovelEnum: Array<any> = [
    {
      nome: 'Comercial',
      tipo: 'COMERCIAL',
    },
    {
      nome: 'Corporativa',
      tipo: 'CORPORATIVA',
    },
    {
      nome: 'Industrial',
      tipo: 'INDUSTRIAL',
    },
    {
      nome: 'Residencial',
      tipo: 'RESIDENCIAL',
    },
    {
      nome: 'Rural',
      tipo: 'RURAL',
    },
    {
      nome: 'Temporada',
      tipo: 'TEMPORADA',
    },
  ];

  cadastroVendedorForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    identificacao: ['', [Validators.required]],
  });

  cadastroImovelForm: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    contratoAluguel: [false, Validators.required],
    contratoVenda: [false, Validators.required],
    valorAluguel: [0],
    valorVenda: [0],
    tipoImovel: ['', Validators.required],
    finalidadeImovel: ['', Validators.required],
    quartos: [0, Validators.required],
    banheiros: [0, Validators.required],
    suite: [0, Validators.required],
    vagas: [0, Validators.required],
    area: [0, Validators.required],
    descricao: [''],
    foto: ['']
  });

  cadastroCaracteristica: FormGroup = this.fb.group({
    caracteristicas: [''],
  });

  cadastroEnderecoForm: FormGroup = this.fb.group({
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
    private imovelService: ImoveisService,
    private enderecoService: EnderecosService,
    private caracteristicaService: CaracteristicasService,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.caracteristicaService.atualizarCaracteristica$.subscribe(
      (atualizar) => {
        if (atualizar) {
          this.recuperarCaracteristicas();
        }
      }
    );
  }
  recuperarCaracteristicas() {
    this.caracteristicaService
      .getCaracteristicas()
      .subscribe((caracteristicasLista) => {
        this.caracteristica = caracteristicasLista.sort(function (a, b) {
          return a.caracteristica < b.caracteristica
            ? -1
            : a.caracteristica > b.caracteristica
            ? 1
            : 0;
        });
      });
  }


  salvar() {
    //Regras do formulário
    this.cadastroEnderecoForm.value.uf =
      this.cadastroEnderecoForm.value.uf.toUpperCase();


      if (this.cadastroImovelForm.value.contratoVenda == false) {
        this.cadastroImovelForm.value.valorVenda = 0;
      }

      if (this.cadastroImovelForm.value.contratoAluguel == false) {
        this.cadastroImovelForm.value.valorAluguel = 0;
      }

      if (
        this.cadastroImovelForm.value.contratoAluguel == true &&
        (this.cadastroImovelForm.value.valorAluguel == null ||
          this.cadastroImovelForm.value.valorAluguel == undefined ||
          this.cadastroImovelForm.value.valorAluguel <= 0)
      ) {
        return this.snackbar.open(
          'O valor não pode ser nulo ou negativo',
          'Ok',
          {
            duration: 3000,
          })
      }
      if (
        this.cadastroImovelForm.value.contratoVenda == true &&
        (this.cadastroImovelForm.value.valorVenda == null ||
          this.cadastroImovelForm.value.valorVenda == undefined ||
          this.cadastroImovelForm.value.valorVenda <= 0)
      ) {
         return this.snackbar.open(
          'O valor não pode ser nulo ou negativo',
          'Ok',
          {
            duration: 3000,
          })
      }

      if (
        this.cadastroImovelForm.value.contratoAluguel == false &&
        this.cadastroImovelForm.value.contratoVenda == false
      ) {
        return alert(
          'O checkbox do aluguel ou da venda do imóvel deve estar ativo'
        );
      }

    this.salvandoInformacoes = true;



    //Serviços
    const login: User = this.cadastroVendedorForm.value;



    this.authService.cadastrarVendedor(login).subscribe(
      (dadosUser) => {
        let idUser: number = dadosUser;
        let im: Imovel = this.cadastroImovelForm.value;

        forkJoin(Array.from(this.foto).map((app) => (this.imovelService.salvarFoto(app)))).subscribe({
          next: (links) => {
            console.log(links);

        this.imovelService.cadastrarImovel(im, idUser, links).subscribe(
          (dadosImovel) => {
            const carac: Caracteristica = this.cadastroCaracteristica.value;
            for (let a of this.cadastroCaracteristica.value.caracteristicas) {
              this.caracteristicaService
                .postAddCaracteristicaImovel(a.id, dadosImovel.idImovel!)
                .subscribe(
                  () => {},
                  (errorCarac) => {
                    this.salvandoInformacoes = false;
                    this.snackbar.open(
                      'Não foi possível realizar o cadastro da característica',
                      'Ok',
                      {
                        duration: 3000,
                      }
                    );

                    console.log(errorCarac);
                  }
                );
            }

            const en: Endereco = this.cadastroEnderecoForm.value;
            this.enderecoService
              .cadastrarEnderecoImovel(en, dadosImovel.idImovel)
              .subscribe(
                (dadosEndereco) => {
                  this.snackbar.open('Cadastrado com sucesso', 'Ok', {
                    duration: 3000,
                  });
                  this.router.navigateByUrl('/auth/email');
                },
                (errorEnderero) => {
                  this.salvandoInformacoes = false;
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
          },
          (errorImovel) => {
            this.salvandoInformacoes = false;
            this.snackbar.open(
              'Não foi possível realizar o cadastro do imóvel',
              'Ok',
              {
                duration: 3000,
              }
            );

            console.log(errorImovel);
          }
        );
          }})
      },
      (errorUser) => {
        this.salvandoInformacoes = false;
        this.snackbar.open(
          'Não foi possível realizar o cadastro do vendedor',
          'Ok',
          {
            duration: 3000,
          }
        );

        console.log(errorUser);
      }
    );
  }

  consultaCep(cep: string, form: any) {
    this.imovelService.buscarCep(cep).subscribe((dados) => {
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


  recuperarFoto(event: any): void {
    this.foto = event.target.files;
    this.carregarPreview();
  }

  carregarPreview(): void {
    const reader = new FileReader();

    reader.readAsDataURL(this.foto[0]);

    reader.onload = () => {
      this.fotoPreview = reader.result as string;
    };
  }

  // teste

/*   salvarFoto() {
    // fotoTeste
  } */

  //fotoTeste
  indiceSelecionado = 0;
  slide = [
    { src: 'https://picsum.photos/400' },
    { src: 'https://picsum.photos/401' },
    { src: 'https://picsum.photos/402' },
    { src: 'https://picsum.photos/403' },
    { src: 'https://picsum.photos/404' },
  ];
  indicador = true;
  controle = true;

  selecionarImagem(index: number) {
    //fotoTeste
    this.indiceSelecionado = index;
  }
}
