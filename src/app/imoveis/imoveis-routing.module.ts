import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroImovelComponent } from './pages/cadastro-imovel/cadastro-imovel.component';
import { ImovelComponent } from './pages/imovel/imovel.component';
import { PrincipalComponent } from './pages/principal/principal.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [
      {
        path: 'imovel',
        component: ImovelComponent,
      },
      {
        path: 'cadastro-imovel',
        component: CadastroImovelComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImoveisRoutingModule {}
