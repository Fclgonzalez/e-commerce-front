import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioIndisponivelComponent } from './horario-indisponivel.component';

describe('HorarioIndisponivelComponent', () => {
  let component: HorarioIndisponivelComponent;
  let fixture: ComponentFixture<HorarioIndisponivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioIndisponivelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioIndisponivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
