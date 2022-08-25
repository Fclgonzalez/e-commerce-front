import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalRoutingModule } from './principal-routing.module';
import { ComponentesCompartilhadosModule } from '../componentes-compartilhados/componentes-compartilhados.module';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { MaterialModule } from '../material/material.module';
import { TermosDeUsoComponent } from './pages/termos-de-uso/termos-de-uso.component';
import { SaibaMaisComponent } from './pages/saiba-mais/saiba-mais.component';
import { PerguntasFrequentesComponent } from './pages/perguntas-frequentes/perguntas-frequentes.component';
import { BuscaImoveisComponent } from './pages/busca-imoveis/busca-imoveis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaginaInicialComponent,
    PrincipalComponent,
    PerguntasFrequentesComponent,
    SaibaMaisComponent,
    TermosDeUsoComponent,
    BuscaImoveisComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PrincipalRoutingModule,
    ComponentesCompartilhadosModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PrincipalModule { }
