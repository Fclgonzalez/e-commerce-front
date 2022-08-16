import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-bar-chart-visitas',
  templateUrl: './bar-chart-visitas.component.html',
  styleUrls: ['./bar-chart-visitas.component.css']
})
export class BarChartVisitasComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: BaseChartDirective["labels"] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  public barChartData: ChartDataset[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 35, 56, 40, 100, 55], label: 'Visitas Registrados' },

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
