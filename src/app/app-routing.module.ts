import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './auth/pages/cadastro/cadastro.component';
import { EmailComponent } from './auth/pages/email/email.component';

const routes: Routes = [
  {
    path: 'principal',
    loadChildren: () =>
      import('./principal/principal.module').then((m) => m.PrincipalModule),
  },
  {
    path: 'imobil',
    loadChildren: () =>
      import('./imoveis/imoveis.module').then((m) => m.ImoveisModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'principal/pagina-inicial',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration:'enabled'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
