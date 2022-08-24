import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImoveisRoutingModule } from './imoveis-routing.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ImovelComponent } from './pages/imovel/imovel.component';
import { VisitasModule } from '../visitas/visitas.module';
import { CadastroImovelComponent } from './pages/cadastro-imovel/cadastro-imovel.component';
import { FormCadastroImovelComponent } from './components/form-cadastro-imovel/form-cadastro-imovel.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentesCompartilhadosModule } from '../componentes-compartilhados/componentes-compartilhados.module';
import { ImovelVendedorComponent } from './components/imovel-vendedor/imovel-vendedor.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    ImovelComponent,
    CadastroImovelComponent,
    FormCadastroImovelComponent,
    ImovelVendedorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ImoveisRoutingModule,
    VisitasModule,
    ComponentesCompartilhadosModule
  ],
  
})
export class ImoveisModule { }
