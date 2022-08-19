import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAgendarVisitaComponent } from './login-agendar-visita.component';

describe('LoginAgendarVisitaComponent', () => {
  let component: LoginAgendarVisitaComponent;
  let fixture: ComponentFixture<LoginAgendarVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAgendarVisitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAgendarVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
