import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Endereco } from 'src/app/enderecos/models/endereco';
import { Caracteristica } from '../../caracteristicas/models/caracteristica';
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
  caracteristica?: Caracteristica

  naoEncontrado: boolean = false

  constructor(
    private imovelService: ImoveisService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

}
