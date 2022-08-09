import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { ComponentesCompartilhadosModule } from '../componentes-compartilhados/componentes-compartilhados.module';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { PrincipalComponent } from './pages/principal/principal.component';


@NgModule({
  declarations: [
    PaginaInicialComponent,
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    ComponentesCompartilhadosModule
  ]
})
export class PrincipalModule { }
