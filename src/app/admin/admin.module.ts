import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NaviComponent } from './components/navi/navi.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PendenteComponent } from './pages/pendente/pendente.component';
import { CardsComponent } from './components/cards/cards.component';
import { ImovelTableComponent } from './components/imovel-table/imovel-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ImovelDialogComponent } from './components/imovel-dialog/imovel-dialog.component';
import { ActuatorComponent } from './pages/actuator/actuator.component';
import { NgxPaginationModule } from  'ngx-pagination';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    NaviComponent,
    DashboardComponent,
    PendenteComponent,
    CardsComponent,
    ImovelTableComponent,
    ImovelDialogComponent,
    ActuatorComponent,
    UsuariosComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MaterialModule,
    NgChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
