import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImovelService } from 'src/app/admin/components/bar-chart-imoveis/imovel.service';
import { Caracteristica } from '../../caracteristicas/models/caracteristica';
import { CaracteristicasService } from '../../caracteristicas/services/caracteristicas.service';
import { Imovel } from '../../models/imovel';
import { ImoveisService } from '../../service/imoveis.service';

@Component({
  selector: 'app-imovel-vendedor',
  templateUrl: './imovel-vendedor.component.html',
  styleUrls: ['./imovel-vendedor.component.css'],
})
export class ImovelVendedorComponent implements OnInit {
  idImovelData!: number;
  imovel!: Imovel;
  caracteristica: Caracteristica[] = [];
  caracteristicaImovel: any;
  salvandoInformacoes: boolean = false;
  desabilitar: boolean = true;

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

  ImovelForm: FormGroup = this.fb.group({
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
  });

  caracteristicaForm: FormGroup = this.fb.group({
    caracteristicas: ['', Validators.required],
  });

  constructor(
    private imovelService: ImoveisService,
    private caracteristicaService: CaracteristicasService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<ImovelVendedorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit(): void {
    this.idImovelData = this.data;

    this.recuperarImovel(this.idImovelData);

    this.recuperarCaracteristicas();
    this.recuperarCaracteristicasImovel(this.idImovelData);
  }

  recuperarImovel(idImovel: number) {
    this.imovelService.getImoveisById(idImovel).subscribe((dadosImovel) => {
      this.imovel = dadosImovel;

      this.ImovelForm.setValue({
        titulo: this.imovel.titulo,
        contratoAluguel: this.imovel.contratoAluguel,
        contratoVenda: this.imovel.contratoVenda,
        valorAluguel: this.imovel.valorAluguel,
        valorVenda: this.imovel.valorVenda,
        tipoImovel: this.imovel.tipoImovel,
        finalidadeImovel: this.imovel.finalidadeImovel,
        quartos: this.imovel.quartos,
        banheiros: this.imovel.banheiros,
        suite: this.imovel.suite,
        vagas: this.imovel.vagas,
        area: this.imovel.area,
        descricao: this.imovel.descricao,
      });
      this.verificaAtualizacaoValor();
    });
  }

  verificaAtualizacaoValor() {
    this.ImovelForm.valueChanges.subscribe((valor) => {
      this.desabilitar =
        this.ImovelForm.invalid ||
        !(
          valor.titulo != this.imovel.titulo ||
          valor.contratoAluguel != this.imovel.contratoAluguel ||
          valor.contratoVenda != this.imovel.contratoVenda ||
          valor.valorAluguel != this.imovel.valorAluguel ||
          valor.valorVenda != this.imovel.valorVenda ||
          valor.tipoImovel != this.imovel.tipoImovel ||
          valor.finalidadeImovel != this.imovel.finalidadeImovel ||
          valor.quartos != this.imovel.quartos ||
          valor.banheiros != this.imovel.banheiros ||
          valor.suite != this.imovel.suite ||
          valor.vagas != this.imovel.vagas ||
          valor.area != this.imovel.area ||
          valor.descricao != this.imovel.descricao
        );
    });

    this.caracteristicaForm.valueChanges.subscribe((valor) => {
      this.desabilitar =
        this.ImovelForm.invalid ||
        !(valor.caracteristicas != this.mapearCaracteristicasImovel());
    });
  }

  editarImovel() {
    //regras do formulário

    if (this.ImovelForm.value.contratoVenda == false) {
      this.ImovelForm.value.valorVenda = 0;
    }

    if (this.ImovelForm.value.contratoAluguel == false) {
      this.ImovelForm.value.valorAluguel = 0;
    }

    if (
      this.ImovelForm.value.contratoAluguel == true &&
      (this.ImovelForm.value.valorAluguel == null ||
        this.ImovelForm.value.valorAluguel == undefined ||
        this.ImovelForm.value.valorAluguel <= 0)
    ) {
      return this.snackbar.open('O valor não pode ser nulo ou negativo', 'Ok', {
        duration: 3000,
      });
    }
    if (
      this.ImovelForm.value.contratoVenda == true &&
      (this.ImovelForm.value.valorVenda == null ||
        this.ImovelForm.value.valorVenda == undefined ||
        this.ImovelForm.value.valorVenda <= 0)
    ) {
      return this.snackbar.open('O valor não pode ser nulo ou negativo', 'Ok', {
        duration: 3000,
      });
    }

    if (
      this.ImovelForm.value.quartos < 0 ||
      this.ImovelForm.value.banheiros < 0 ||
      this.ImovelForm.value.suite < 0 ||
      this.ImovelForm.value.vagas < 0 ||
      this.ImovelForm.value.area < 0
    ) {
      return this.snackbar.open('O valor não pode ser negativo', 'Ok', {
        duration: 3000,
      });
    }

    if (
      this.ImovelForm.value.contratoAluguel == false &&
      this.ImovelForm.value.contratoVenda == false
    ) {
      return alert(
        'O checkbox do aluguel ou da venda do imóvel deve estar ativo'
      );
    }
    this.salvandoInformacoes = true;

    let imovel: Imovel = {
      ...this.ImovelForm.value,
    };

    imovel.idImovel = this.idImovelData;

    this.imovelService.editarImovel(imovel).subscribe(
      (dadosImovel) => {
        this.snackbar.open('Imóvel atualizado com sucesso', 'Ok', {
          duration: 3000,
        });

        this.caracteristicaService
          .deleteCaracteristicaImovel(this.idImovelData)
          .subscribe(
            () => {
              for (let a of this.caracteristicaForm.value.caracteristicas) {
                this.caracteristicaService
                  .postAddCaracteristicaImovel(a, this.idImovelData)
                  .subscribe(
                    (sucess) => {},
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
            },
            (error) => {
              console.log('Não foi possível deletar as características');

              console.log(error);
            }
          );

          this.dialogRef.close(true);
      },
      (error) => {
        console.log(error);
        this.salvandoInformacoes = false;
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

  recuperarCaracteristicasImovel(idImovel: number) {
    this.caracteristicaService
      .getCaracteristicaByIdImovel(idImovel)
      .subscribe((caracteristicasImovel) => {
        this.caracteristicaImovel = caracteristicasImovel;
        this.caracteristicaForm.setValue({
          caracteristicas: this.mapearCaracteristicasImovel(),
        });
      });
  }

  mapearCaracteristicasImovel() {
    return this.caracteristicaImovel.map((c: Caracteristica) => {
      return c.id;
    });
  }

  editarCaracteristicas() {
    this.caracteristicaService
      .deleteCaracteristicaImovel(this.idImovelData)
      .subscribe(
        () => {
          for (let a of this.caracteristicaForm.value.caracteristicas) {
            this.caracteristicaService
              .postAddCaracteristicaImovel(a, this.idImovelData)
              .subscribe(
                (sucess) => {},
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
        },
        (error) => {
          console.log('Não foi possível deletar as características');

          console.log(error);
        }
      );
  }
}
