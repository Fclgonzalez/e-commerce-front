import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TimeScale } from 'chart.js';
import { ImovelService } from 'src/app/admin/components/bar-chart-imoveis/imovel.service';
import { Imovel } from 'src/app/imoveis/models/imovel';
import { ImoveisService } from 'src/app/imoveis/service/imoveis.service';

interface finalidade {
  value: string;
  viewValue: string;
}

interface tipo {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css'],
})
export class PaginaInicialComponent implements OnInit {
  contrato!: string;

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
    { value: 'DEPOSITO', viewValue: 'Deposito' },
    { value: 'ARMAZEM', viewValue: 'Armazém' },
    { value: 'GARAGEM', viewValue: 'Garagem' },
  ];

  finalidades: finalidade[] = [
    { value: 'COMERCIAL', viewValue: 'Comercial' },
    { value: 'CORPORATIVO', viewValue: 'Corporativo' },
    { value: 'INDUSTRIAL', viewValue: 'Industrial' },
    { value: 'RESIDENCIAL', viewValue: 'Residencial' },
    { value: 'RURAL', viewValue: 'Rural' },
    { value: 'TEMPORADA', viewValue: 'Temporada' },
  ];

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
  });

  campoPesquisa = new FormControl();

  imovelCar1!: Imovel;
  imovelCar2!: Imovel;
  imovelCar3!: Imovel;
  imoveiscard1!: Imovel[];
  imoveiscard2!: Imovel[];
  carregado = false;

  constructor(
    private fb: FormBuilder,
    private imovelService: ImoveisService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('E-commerce Imobiliaria: Home')
    this.imoveisCarrossel();
    this.imoveisCard();
  }

  filtroImoveis() {
    /* console.log(this.formPesquisa.value)
    this.imovelService.postFiltrar(this.formPesquisa.value).subscribe(
      (response) => console.log(response)
    ) */

    this.router.navigateByUrl('/principal/busca-imoveis', {
      state: this.formPesquisa.value,
    });
  }
  imoveisCarrossel() {
    this.imovelService.getImoveisById(75).subscribe((imovel) => {
      this.imovelCar1 = imovel;
      this.imovelService.getImoveisById(77).subscribe((imovel) => {
        this.imovelCar2 = imovel;
        this.imovelService.getImoveisById(79).subscribe((imovel) => {
          this.imovelCar3 = imovel;
          this.carregado = true;
        });
      });
    });
  }
  imoveisCard() {
    this.imovelService.getImoveisContratoAluguel(true).subscribe((imoveis) => {
      this.imoveiscard1 = imoveis.slice(-3);
      console.log(this.imoveiscard1);
    });
    this.imovelService.getImoveisContratoVenda(true).subscribe((imoveis) => {
      this.imoveiscard2 = imoveis.slice(-3);
      console.log(this.imoveiscard2);
    });
  }
}
