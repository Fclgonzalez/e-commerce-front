import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartVendedorComponent } from './bar-chart-vendedor.component';

describe('BarChartVendedorComponent', () => {
  let component: BarChartVendedorComponent;
  let fixture: ComponentFixture<BarChartVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartVendedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
