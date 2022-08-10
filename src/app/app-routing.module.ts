import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'principal',
    loadChildren:()=>import('./principal/principal.module').then((m)=>m.PrincipalModule)
  },
  {
    path:'imobil',
    loadChildren:()=>import('./imoveis/imoveis.module').then((m)=>m.ImoveisModule)
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'principal/pagina-inicial'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
