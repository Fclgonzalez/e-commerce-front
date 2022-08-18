import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from '../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentesCompartilhadosModule } from '../componentes-compartilhados/componentes-compartilhados.module';


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MaterialModule,
   ComponentesCompartilhadosModule
  ]
})
export class UserModule { }
