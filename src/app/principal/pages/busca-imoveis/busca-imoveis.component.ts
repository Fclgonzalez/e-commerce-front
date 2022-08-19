import { Component, Injectable, NgModule, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';


interface quarto {
  value: number;
  viewValue: number;
}

interface banheiro{
  value: number;
  viewValue: number;
}

interface vaga{
  value: number;
  viewValue: number;
}

@Component({
  selector: 'app-busca-imoveis',
  templateUrl: './busca-imoveis.component.html',
  styleUrls: ['./busca-imoveis.component.css']
})

export class BuscaImoveisComponent implements OnInit {

  longText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam fuga vero saepe? Quaerat impedit, tempore, nihil, reiciendis blanditiis vero natus aperiam laboriosam culpa officia provident. Similique, corrupti. Aliquid, quo odio.`;
  shortText =`Rua dos Alfeneiros, nº4`

  quartos: quarto[] = [
    {value: 1, viewValue: 1},
    {value: 2, viewValue: 2},
    {value: 3, viewValue: 3},
    {value: 4, viewValue: 4},
    {value: 5, viewValue: 5},
    {value: 6, viewValue: 6},
    {value: 7, viewValue: 7},
    {value: 8, viewValue: 8},
    {value: 9, viewValue: 9},
    {value: 10, viewValue: 10},
  ];

  banheiros: banheiro[] = [
    {value: 1, viewValue:1},
    {value: 2, viewValue:2},
    {value: 3, viewValue:3},
    {value: 4, viewValue:4},
    {value: 5, viewValue:5},
    {value: 6, viewValue:6},
    {value: 7, viewValue:7},
    {value: 8, viewValue:8},
    {value: 9, viewValue:9},
    {value: 10, viewValue:10},
  ]

  vagas: vaga[] = [
    {value: 1, viewValue:1},
    {value: 2, viewValue:2},
    {value: 3, viewValue:3},
    {value: 4, viewValue:4},
    {value: 5, viewValue:5},
    {value: 6, viewValue:6},
    {value: 7, viewValue:7},
    {value: 8, viewValue:8},
    {value: 9, viewValue:9},
    {value: 10, viewValue:10},
  ]

  caracteristicas = new FormControl('');
  condominioList: string[] = ['Academia','Área verde','Brinquedoteca','Churrasqueira','Elevador','Lavanderia','Piscina','Playground','Portaria 24h','Quadra esportiva','Salão de festas','Salão de jogos','Sauna']
  comodidadesList: string[] = ['Apartamento cobertura','Ar condicionado','Banheira','Box','Churrasqueira','Chuveiro a gás','Closet','Novos ou reformados','Piscina privativa','Somente uma casa no terreno','Tanque','Televisão','Utensílios de cozinha','Ventilador de teto']
  mobiliasList: string[] = ['Armários na cozinha','Armários no quarto','Armários nos banheiros','Cama de casal','Cama de solteiro','Mesas e cadeiras de jantar','Sofá']
  bemEstarList: string[] = ['Janelas grandes','Rua silenciosa','Sol da manhã','Sol da tarde','Vista livre']
  eletrodomesticosList: string[] = ['Fogão','Fogão cooktop','Geladeira','Máquina de lavar','Microondas']
  comodosList: string[] = ['Área de serviço','Cozinha americana','Home-office','Jardim','Quintal','Varanda']
  acessibilidadeList: string[] = ['Banheiro adaptado','Corrimão','Piso tátil','Quartos e corredores com portas amplas','Rampas de acesso','Vaga de garagem acessível']

  constructor() { }

  ngOnInit(): void {
  }
}