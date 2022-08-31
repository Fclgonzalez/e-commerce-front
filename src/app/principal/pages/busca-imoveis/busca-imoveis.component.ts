import { Component, Injectable, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Caracteristica } from 'src/app/imoveis/caracteristicas/models/caracteristica';
import { CaracteristicasService } from 'src/app/imoveis/caracteristicas/services/caracteristicas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ImovelService } from 'src/app/admin/components/bar-chart-imoveis/imovel.service';
import { Imovel } from 'src/app/imoveis/models/imovel';
import { ImoveisService } from 'src/app/imoveis/service/imoveis.service';
import { Title } from '@angular/platform-browser';
import { Foto } from 'src/app/imoveis/fotos/models/foto';
import { FotoService } from 'src/app/imoveis/fotos/service/foto.service';

interface finalidade {
  value: string;
  viewValue: string;
}

interface tipo {
  value: string;
  viewValue: string;
}

interface quarto {
  value: number;
  viewValue: number;
}

interface banheiro {
  value: number;
  viewValue: number;
}

interface vaga {
  value: number;
  viewValue: number;
}
interface caracte {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-busca-imoveis',
  templateUrl: './busca-imoveis.component.html',
  styleUrls: ['./busca-imoveis.component.css'],
})
export class BuscaImoveisComponent implements OnInit {
  formPesquisa: FormGroup = this.fb.group({
    endereco: this.fb.group({
      cidade: [''],
      bairro: [''],
    }),
    valorAluguel: [0],
    valorVenda: [0],
    area: [0],
    quartos: [0],
    suite: [0],
    banheiros: [0],
    vagas: [0],
    finalidadeImovel: ['RESIDENCIAL'],
    tipoImovel: ['CASA'],
    caracteristicas: [[]],
  });

  caracteristica: Caracteristica[] = [];

  tipos: tipo[] = [
    { value: 'APARTAMENTO', viewValue: 'Apartamento' },
    { value: 'COMERCIAL', viewValue: 'Comercial' },
    { value: 'CASA', viewValue: 'Casa' },
    { value: 'ANDAR_CORPORATIVO', viewValue: 'Andar Corporativo' },
    { value: 'CASA_DE_VILA', viewValue: 'Casa de Vila' },
    { value: 'COBERTURA', viewValue: 'Cobertura' },
    { value: 'CONDOMINIO', viewValue: 'Condomínio' },
    { value: 'FLAT', viewValue: 'Flat' },
    { value: 'TERRENO', viewValue: 'Terreno' },
    { value: 'LOTE', viewValue: 'Lote' },
    { value: 'FAZENDA', viewValue: 'Fazenda' },
    { value: 'SITIO', viewValue: 'Sítio' },
    { value: 'CHACARA', viewValue: 'Chácara' },
    { value: 'LOJA', viewValue: 'Loja' },
    { value: 'SALAO', viewValue: 'Salão' },
    { value: 'PONTO_COMERCIAL', viewValue: 'Ponto Comercial' },
    { value: 'SALA', viewValue: 'Sala' },
    { value: 'CASA_COMERCIAL', viewValue: 'Casa Comercial' },
    { value: 'HOTEL', viewValue: 'Hotel' },
    { value: 'MOTEL', viewValue: 'Motel' },
    { value: 'LAJE_CORPORATIVA', viewValue: 'Laje Corporativa' },
    { value: 'PREDIO_INTEIRO', viewValue: 'Prédio Inteiro' },
    { value: 'GALPAO', viewValue: 'Galpão' },
    { value: 'DEPOSITO', viewValue: 'Depósito' },
    { value: 'ARMAZEM', viewValue: 'Armazém' },
    { value: 'GARAGEM', viewValue: 'Garagem' },
  ];

  finalidades: finalidade[] = [
    { value: 'COMERCIAL', viewValue: 'Comercial' },
    { value: 'CORPORATIVA', viewValue: 'Corporativa' },
    { value: 'INDUSTRIAL', viewValue: 'Industrial' },
    { value: 'RESIDENCIAL', viewValue: 'Residencial' },
    { value: 'RURAL', viewValue: 'Rural' },
    { value: 'TEMPORADA', viewValue: 'Temporada' },
  ];

  quartos: quarto[] = [
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4 },
    { value: 5, viewValue: 5 },
    { value: 6, viewValue: 6 },
    { value: 7, viewValue: 7 },
    { value: 8, viewValue: 8 },
    { value: 9, viewValue: 9 },
    { value: 10, viewValue: 10 },
  ];

  banheiros: banheiro[] = [
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4 },
    { value: 5, viewValue: 5 },
    { value: 6, viewValue: 6 },
    { value: 7, viewValue: 7 },
    { value: 8, viewValue: 8 },
    { value: 9, viewValue: 9 },
    { value: 10, viewValue: 10 },
  ];

  vagas: vaga[] = [
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4 },
    { value: 5, viewValue: 5 },
    { value: 6, viewValue: 6 },
    { value: 7, viewValue: 7 },
    { value: 8, viewValue: 8 },
    { value: 9, viewValue: 9 },
    { value: 10, viewValue: 10 },
  ];

  todosImoveis!: Imovel[];
  buscar?: string | null;
  form?: Imovel;
  salvandoInformacoes: boolean = false;
  buscaVazia: boolean = false;
  fotos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private caracteristicaService: CaracteristicasService,
    private imovelService: ImoveisService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private fotoService: FotoService
  ) {
    this.form = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    this.title.setTitle('E-commerce Imobiliaria: Busque seu imóvel');
    this.route.queryParamMap.subscribe((params) => {
      this.buscar = params.get('buscar');
      this.buscaTodosImoveis();
    });
    this.recuperarCaracteristicas();
    this.filtroPaginaInicial();
  }

  buscaTodosImoveis() {
    if (this.buscar == 'todos') {
      this.imovelService.getImoveis().subscribe((imoveis) => {
        this.todosImoveis = imoveis;
        for (const imov of this.todosImoveis) {
          this.fotoService.buscaFotosImovel(imov.idImovel!).subscribe(
            (fotos) => {
              console.log(fotos);
            
              /* var transformaObj =  Object.assign(...fotos.map(([key, val]) => ({[key]: imov.idImovel}))) */
              this.fotos.push(fotos)
            /*   console.log(transformaObj); */
              
            }
          )
        }
      });
    } else if (this.buscar == 'aluguel') {
      this.imovelService
        .getImoveisContratoAluguel(true)
        .subscribe((imoveis) => {
          this.todosImoveis = imoveis;
          for (const imov of this.todosImoveis) {
            this.fotoService.buscaFotosImovel(imov.idImovel!).subscribe(
              (fotos) => {
                console.log(fotos);
              
                /* var transformaObj =  Object.assign(...fotos.map(([key, val]) => ({[key]: imov.idImovel}))) */
                this.fotos.push(fotos)
              /*   console.log(transformaObj); */
                
              }
            )
          }
        });
    } else if (this.buscar == 'venda') {
      this.imovelService.getImoveisContratoVenda(true).subscribe((imoveis) => {
        this.todosImoveis = imoveis;
        for (const imov of this.todosImoveis) {
          this.fotoService.buscaFotosImovel(imov.idImovel!).subscribe(
            (fotos) => {
              console.log(fotos);
            
              /* var transformaObj =  Object.assign(...fotos.map(([key, val]) => ({[key]: imov.idImovel}))) */
              this.fotos.push(fotos)
            /*   console.log(transformaObj); */
              
            }
          )
        }
      });
    }
  }

  filtroImoveisVenda() {
    this.buscaVazia = false;
    this.salvandoInformacoes = true;
    const imovel: Imovel = this.formPesquisa.value;
    imovel.contratoVenda = true;
    this.imovelService.postFiltrar(imovel).subscribe((response) => {
      this.todosImoveis = response;
      this.salvandoInformacoes = false;
      if (response.length == 0) {
        this.buscaVazia = true;
      }else {
        for (const imov of this.todosImoveis) {
          this.fotoService.buscaFotosImovel(imov.idImovel!).subscribe(
            (fotos) => {
              console.log(fotos);
            
              /* var transformaObj =  Object.assign(...fotos.map(([key, val]) => ({[key]: imov.idImovel}))) */
              this.fotos.push(fotos)
            /*   console.log(transformaObj); */
              
            }
          )
        }
        console.log('-------------------------');
        console.log(this.fotos);
        console.log('-------------------------');
      }
    });
  }

  filtroImoveisAluguel() {
    this.buscaVazia = false;
    this.salvandoInformacoes = true;
    const imovel: Imovel = this.formPesquisa.value;
    imovel.contratoAluguel = true;
    this.imovelService.postFiltrar(imovel).subscribe((response) => {
      this.todosImoveis = response;
      this.salvandoInformacoes = false;
      if (response.length == 0) {
        this.buscaVazia = true;
      } else {
          for (const imov of this.todosImoveis) {
            this.fotoService.buscaFotosImovel(imov.idImovel!).subscribe(
              (fotos) => {
                console.log(fotos);
              
                /* var transformaObj =  Object.assign(...fotos.map(([key, val]) => ({[key]: imov.idImovel}))) */
                this.fotos.push(fotos)
              /*   console.log(transformaObj); */
                
              }
            )
          }
          console.log('-------------------------');
          console.log(this.fotos);
          console.log('-------------------------');
        }
    });
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

  filtroPaginaInicial() {
    if (this.form) {
      this.imovelService.postFiltrar(this.form).subscribe((imoveis) => {
        this.todosImoveis = imoveis;
        for (const imov of this.todosImoveis) {
          this.fotoService.buscaFotosImovel(imov.idImovel!).subscribe(
            (fotos) => {
              console.log(fotos);
            
              /* var transformaObj =  Object.assign(...fotos.map(([key, val]) => ({[key]: imov.idImovel}))) */
              this.fotos.push(fotos)
            /*   console.log(transformaObj); */
              
            }
          )
        }
      });
    }
  }
}
