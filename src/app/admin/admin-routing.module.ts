import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLogadoGuard } from '../guards/admin-logado.guard';
import { UserLogadoGuard } from '../guards/user-logado.guard';
import { ActuatorComponent } from './pages/actuator/actuator.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ImoveisAdminComponent } from './pages/imoveis-admin/imoveis-admin.component';


import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { VisitasComponent } from './pages/visitas/visitas.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    canActivate: [
      UserLogadoGuard,
      AdminLogadoGuard
    ]
  },{
    path:'imoveis',
    component: ImoveisAdminComponent,
    canActivate: [
      UserLogadoGuard,
      AdminLogadoGuard
    ]
  },
  {
    path:'actuator',
     component: ActuatorComponent,
     canActivate: [
      UserLogadoGuard,
      AdminLogadoGuard
    ]
  },
  {
    path:'usuarios',
     component: UsuariosComponent,
     canActivate: [
      UserLogadoGuard,
      AdminLogadoGuard
    ]
  },
  {
    path:'visitas',
     component: VisitasComponent,
     canActivate: [
      UserLogadoGuard,
      AdminLogadoGuard
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
