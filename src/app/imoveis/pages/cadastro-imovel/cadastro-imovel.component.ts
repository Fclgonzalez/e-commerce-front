import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormCadastroImovelComponent } from '../../components/form-cadastro-imovel/form-cadastro-imovel.component';

@Component({
  selector: 'app-cadastro-imovel',
  templateUrl: './cadastro-imovel.component.html',
  styleUrls: ['./cadastro-imovel.component.css'],
})
export class CadastroImovelComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private title: Title
    ) {}

  ngOnInit(): void {
    this.title.setTitle('E-commerce Imobiliaria: Cadastre seu imóvel')
  }
}
