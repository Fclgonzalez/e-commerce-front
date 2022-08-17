import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Imovel } from '../../models/imovel';
import { ImoveisService } from '../../service/imoveis.service';

@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.css']
})
export class ImovelComponent implements OnInit {

  formImovel: FormGroup =  this.fb.group({
    idImovel: ['', [ Validators.required ]],
    titulo: ['', [ Validators.required ]],
    dataCriacao: ['', [ Validators.required ]],
    contratoAluguel: ['', [ Validators.required ]],
    contratoVenda: ['', [ Validators.required ]],
    valorAluguel: ['', [ Validators.required ]],
    valorVenda: ['', [ Validators.required ]],
    area: ['', [ Validators.required ]],
    descricao: [''],
    quartos: ['', [ Validators.required ]],
    suite: [''],
    banheiros: ['', [ Validators.required ]],
    vagas: ['', [ Validators.required ]],
    finalidadeImovel: ['', [ Validators.required ]],
    tipoImovel: ['', [ Validators.required ]],
    caracteristicas: [''],
    endereco: [''],
    user: ['', [ Validators.required ]]
  })

  imovel!: Imovel

  constructor(
    private imovelService: ImoveisService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        let idImovel = parseInt(params.get('idImovel') ?? '0')
        this.recuperarImovel(idImovel)
      }
    )
  }

  recuperarImovel(id: number): void {
    this.imovelService.getImoveisById(id)
    .subscribe(
      imo => {
        this.imovel = imo
        this.formImovel.setValue({
          idImovel: this.imovel.idImovel,
          titulo: this.imovel.titulo,
          dataCriacao: this.imovel.dataCriacao,
          contratoAluguel: this.imovel.contratoAluguel,
          contratoVenda: this.imovel.contratoVenda,
          valorAluguel: this.imovel.valorAluguel,
          valorVenda: this.imovel.valorVenda,
          area: this.imovel.area,
          descricao: this.imovel.descricao,
          quartos: this.imovel.quartos,
          suite: this.imovel.suite,
          banheiros: this.imovel.banheiros,
          vagas: this.imovel.vagas,
          finalidadeImovel: this.imovel.finalidadeImovel,
          tipoImovel: this.imovel.tipoImovel,
          caracteristicas: this.imovel.caracteristicas,
          endereco: this.imovel.endereco,
          user: this.imovel.user
        })
      }
      // (erro: HttpErrorResponse) => {
      //   this.naoEncontrado = erro.status == 404
      // }
    )
  }
}



