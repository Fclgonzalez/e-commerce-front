import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoVisitaComponent } from './solicitacao-visita.component';

describe('SolicitacaoVisitaComponent', () => {
  let component: SolicitacaoVisitaComponent;
  let fixture: ComponentFixture<SolicitacaoVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacaoVisitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaoVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
