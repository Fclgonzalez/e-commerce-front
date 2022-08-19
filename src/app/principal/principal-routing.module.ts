import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscaImoveisComponent } from './pages/busca-imoveis/busca-imoveis.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { PerguntasFrequentesComponent } from './pages/perguntas-frequentes/perguntas-frequentes.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { SaibaMaisComponent } from './pages/saiba-mais/saiba-mais.component';
import { TermosDeUsoComponent } from './pages/termos-de-uso/termos-de-uso.component';

const routes: Routes = [
  {
  path:'',
  component: PrincipalComponent,
  children: [
    {
      path:'pagina-inicial',
      component: PaginaInicialComponent
    },
    {
      path:'perguntas-frequentes',
      component:PerguntasFrequentesComponent
    },
    {
      path:'saiba-mais',
      component:SaibaMaisComponent
    },
    {
      path:'termos-de-uso',
      component:TermosDeUsoComponent
    },
    {
      path:'busca-imoveis',
      component:BuscaImoveisComponent
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
