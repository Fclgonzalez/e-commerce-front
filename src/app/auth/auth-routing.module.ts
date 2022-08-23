import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserNaoLogadoGuard } from '../guards/user-nao-logado.guard';

import { CadastroVendedorComponent } from './pages/cadastro-vendedor/cadastro-vendedor.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { EmailComponent } from './pages/email/email.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [
      UserNaoLogadoGuard
    ]
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [
      UserNaoLogadoGuard
    ]
  },
  {
    path: 'cadastro-vendedor',
    component: CadastroVendedorComponent,
    canActivate: [
      UserNaoLogadoGuard
    ]
  },
  {
    path: 'email',
    component: EmailComponent,
    canActivate: [
      UserNaoLogadoGuard
    ]
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
