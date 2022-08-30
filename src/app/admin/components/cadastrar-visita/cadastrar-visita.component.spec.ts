import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarVisitaComponent } from './cadastrar-visita.component';

describe('CadastrarVisitaComponent', () => {
  let component: CadastrarVisitaComponent;
  let fixture: ComponentFixture<CadastrarVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarVisitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
