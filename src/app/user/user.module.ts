import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from '../material/material.module';
import { ComponentesCompartilhadosModule } from '../componentes-compartilhados/componentes-compartilhados.module';
import { TabelaVisitasComponent } from './components/tabela-visitas/tabela-visitas.component';
import { CancelarVisitaComponent } from './components/cancelar-visita/cancelar-visita.component';
import { EditarVisitaComponent } from './components/editar-visita/editar-visita.component';
import { ListarImoveisVendedorComponent } from './components/listar-imoveis-vendedor/listar-imoveis-vendedor.component';
import { ImoveisModule } from '../imoveis/imoveis.module';
import { EnderecosModule } from '../enderecos/enderecos.module';
import { VisitasModule } from '../visitas/visitas.module';
import { ConfirmarExclusaoImovelComponent } from './components/confirmar-exclusao-imovel/confirmar-exclusao-imovel.component';

@NgModule({
  declarations: [
    PerfilUsuarioComponent,
    ListarImoveisVendedorComponent,
    TabelaVisitasComponent,
    CancelarVisitaComponent,
    EditarVisitaComponent,
    ConfirmarExclusaoImovelComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MaterialModule,
    ComponentesCompartilhadosModule,
    EnderecosModule,
    ImoveisModule,
  ],
})
export class UserModule {}
