import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailComponent } from './pages/email/email.component';
import { CadastroVendedorComponent } from './pages/cadastro-vendedor/cadastro-vendedor.component';
import { FormCadastroVendedorComponent } from './components/form-cadastro-vendedor/form-cadastro-vendedor.component';
import { FormCadastroImovelComponent } from '../imoveis/components/form-cadastro-imovel/form-cadastro-imovel.component';
import { ImoveisModule } from '../imoveis/imoveis.module';
import { ComponentesCompartilhadosModule } from '../componentes-compartilhados/componentes-compartilhados.module';
import { ConfirmarLogoutComponent } from './components/confirmar-logout/confirmar-logout.component';
import { PerfilUsuarioComponent } from '../user/pages/perfil-usuario/perfil-usuario.component';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    EmailComponent,
    CadastroVendedorComponent,
    FormCadastroVendedorComponent,
    ConfirmarLogoutComponent
  
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentesCompartilhadosModule,
    NgxCaptchaModule
  ],
})
export class AuthModule {}
