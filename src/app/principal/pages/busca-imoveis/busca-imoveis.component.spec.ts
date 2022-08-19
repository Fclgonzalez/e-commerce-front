import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaImoveisComponent } from './busca-imoveis.component';

describe('BuscaImoveisComponent', () => {
  let component: BuscaImoveisComponent;
  let fixture: ComponentFixture<BuscaImoveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscaImoveisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaImoveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
