import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ImoveisModule } from '../imoveis/imoveis.module';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [NavbarComponent, FooterComponent],
})
export class ComponentesCompartilhadosModule {}
