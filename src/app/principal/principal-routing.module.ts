import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { PrincipalComponent } from './pages/principal/principal.component';

const routes: Routes = [
  {
  path:'',
  component: PrincipalComponent,
  children: [
    {
      path:'pagina-inicial',
      component: PaginaInicialComponent
    }
  ]
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'pagina-inicial'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
