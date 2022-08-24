import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarImoveisVendedorComponent } from './listar-imoveis-vendedor.component';

describe('ListarImoveisVendedorComponent', () => {
  let component: ListarImoveisVendedorComponent;
  let fixture: ComponentFixture<ListarImoveisVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarImoveisVendedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarImoveisVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
