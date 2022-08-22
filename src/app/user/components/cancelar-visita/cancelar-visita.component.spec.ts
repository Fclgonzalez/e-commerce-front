import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarVisitaComponent } from './cancelar-visita.component';

describe('CancelarVisitaComponent', () => {
  let component: CancelarVisitaComponent;
  let fixture: ComponentFixture<CancelarVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelarVisitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelarVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
