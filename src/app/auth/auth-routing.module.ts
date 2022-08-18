import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroVendedorComponent } from './pages/cadastro-vendedor/cadastro-vendedor.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { EmailComponent } from './pages/email/email.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'cadastro-vendedor',
    component: CadastroVendedorComponent,
  },
  {
    path: 'email',
    component: EmailComponent,
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
