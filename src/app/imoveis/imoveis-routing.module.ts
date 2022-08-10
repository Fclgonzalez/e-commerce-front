import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImovelComponent } from './pages/imovel/imovel.component';
import { PrincipalComponent } from './pages/principal/principal.component';

const routes: Routes = [
  {
    path:'',
    component: PrincipalComponent,
    children: [
      {
        path:'imovel',
        component:ImovelComponent
      }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImoveisRoutingModule { }
