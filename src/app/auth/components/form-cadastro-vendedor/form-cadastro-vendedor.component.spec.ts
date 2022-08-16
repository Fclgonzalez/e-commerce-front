import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroVendedorComponent } from './form-cadastro-vendedor.component';

describe('FormCadastroVendedorComponent', () => {
  let component: FormCadastroVendedorComponent;
  let fixture: ComponentFixture<FormCadastroVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCadastroVendedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCadastroVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
