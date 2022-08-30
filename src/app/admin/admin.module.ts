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
import { CardsComponent } from './components/cards/cards.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ActuatorComponent } from './pages/actuator/actuator.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VisitasComponent } from './pages/visitas/visitas.component';
import { DeleteVisitaComponent } from './components/delete-visita/delete-visita.component';
import { EditVisitaComponent } from './components/edit-visita/edit-visita.component';
import { CadastrarVisitaComponent } from './components/cadastrar-visita/cadastrar-visita.component';
import { DeleteImovelComponent } from './components/delete-imovel/delete-imovel.component';
import { ImoveisAdminComponent } from './pages/imoveis-admin/imoveis-admin.component';


@NgModule({
  declarations: [
    NaviComponent,
    DashboardComponent,
    CardsComponent,
    ActuatorComponent,
    UsuariosComponent,
    VisitasComponent,
    DeleteVisitaComponent,
    EditVisitaComponent,
    CadastrarVisitaComponent,
    DeleteImovelComponent,
    ImoveisAdminComponent,
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
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
