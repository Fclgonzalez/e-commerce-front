import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaVisitasComponent } from './tabela-visitas.component';

describe('TabelaVisitasComponent', () => {
  let component: TabelaVisitasComponent;
  let fixture: ComponentFixture<TabelaVisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaVisitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
