import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartVisitasComponent } from './bar-chart-visitas.component';

describe('BarChartVisitasComponent', () => {
  let component: BarChartVisitasComponent;
  let fixture: ComponentFixture<BarChartVisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartVisitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
