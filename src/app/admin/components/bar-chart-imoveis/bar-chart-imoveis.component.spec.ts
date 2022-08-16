import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartImoveisComponent } from './bar-chart-imoveis.component';

describe('BarChartImoveisComponent', () => {
  let component: BarChartImoveisComponent;
  let fixture: ComponentFixture<BarChartImoveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartImoveisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartImoveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
