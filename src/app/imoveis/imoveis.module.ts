import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImoveisRoutingModule } from './imoveis-routing.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ImovelComponent } from './pages/imovel/imovel.component';
import { VisitasModule } from '../visitas/visitas.module';


@NgModule({
  declarations: [
    PrincipalComponent,
    ImovelComponent
  ],
  imports: [
    CommonModule,
    ImoveisRoutingModule,
    VisitasModule
  ]
})
export class ImoveisModule { }
