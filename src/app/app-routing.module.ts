import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'pagina-inicial',
    loadChildren:()=>import('./principal/principal.module').then((m)=>m.PrincipalModule)
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'pagina-inicial'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
