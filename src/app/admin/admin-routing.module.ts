import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PendenteComponent } from './pages/pendente/pendente.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent
  },{
    path:'pendente',
    component: PendenteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
