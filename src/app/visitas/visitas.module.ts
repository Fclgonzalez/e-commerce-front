import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoComponent } from './components/agendamento/agendamento.component';
import { MaterialModule } from '../material/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginAgendarVisitaComponent } from './components/login-agendar-visita/login-agendar-visita.component';
import { HorarioIndisponivelComponent } from './components/horario-indisponivel/horario-indisponivel.component';
import { SolicitacaoVisitaComponent } from './components/solicitacao-visita/solicitacao-visita.component';

@NgModule({
  declarations: [
    AgendamentoComponent,
    LoginAgendarVisitaComponent,
    HorarioIndisponivelComponent,
    SolicitacaoVisitaComponent
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
