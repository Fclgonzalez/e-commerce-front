import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImovelVendedorComponent } from './imovel-vendedor.component';

describe('ImovelVendedorComponent', () => {
  let component: ImovelVendedorComponent;
  let fixture: ComponentFixture<ImovelVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImovelVendedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImovelVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
