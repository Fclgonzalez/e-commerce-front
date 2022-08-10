import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoComponent } from './components/agendamento/agendamento.component';
import { MaterialModule } from '../material/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AgendamentoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AgendamentoComponent
  ]
})
export class VisitasModule { }
