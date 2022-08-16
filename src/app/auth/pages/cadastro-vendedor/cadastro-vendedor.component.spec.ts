import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVendedorComponent } from './cadastro-vendedor.component';

describe('CadastroVendedorComponent', () => {
  let component: CadastroVendedorComponent;
  let fixture: ComponentFixture<CadastroVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroVendedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
