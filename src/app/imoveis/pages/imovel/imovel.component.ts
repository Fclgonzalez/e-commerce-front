import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Endereco } from 'src/app/enderecos/models/endereco';
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

  naoEncontrado: boolean = false

  constructor(
    private imovelService: ImoveisService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        let id = parseInt(params.get('idImovel') ?? '0')
        this.buscaImovel(id)
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
}
