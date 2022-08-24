import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEnderecoComponent } from './form-endereco/form-endereco.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    FormEnderecoComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class EnderecosModule { }
