import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Endereco } from 'src/app/enderecos/models/endereco';
import { Caracteristica } from '../../caracteristicas/models/caracteristica';
import { CaracteristicasService } from '../../caracteristicas/services/caracteristicas.service';
import { Imovel } from '../../models/imovel';
import { ImoveisService } from '../../service/imoveis.service';

@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.css']
})
export class ImovelComponent implements OnInit {

  imovel?: Imovel
  endereco?: Endereco
  caracteristica?: Array<Caracteristica>

  naoEncontrado: boolean = false

  constructor(
    private imovelService: ImoveisService,
    private caracteristicaService: CaracteristicasService,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('E-commerce Imobiliaria: Imóvel')
    this.route.paramMap.subscribe(
      (params) => {
        let id = parseInt(params.get('idImovel') ?? '0')
        this.buscaImovel(id)
        this.recuperarCaracteristicaImovel(id);
      }
    )
  }

  buscaImovel(id: number) {
    this.imovelService.getImoveisById(id).subscribe(async (dadosImovel) => {
      this.imovel = dadosImovel
    },
    (erro: HttpErrorResponse) => {
      this.naoEncontrado = erro.status == 404
    })
  }

  recuperarCaracteristicaImovel(idImovel: number) {
    this.caracteristicaService.getCaracteristicaByIdImovelList(idImovel)
      .subscribe((caracteristicasLista) => {
        this.caracteristica = caracteristicasLista
      })
  }
}
