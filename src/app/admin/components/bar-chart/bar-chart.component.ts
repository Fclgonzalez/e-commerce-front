import { ConsumidoresServiceService } from './consumidores-service.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {





  barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: BaseChartDirective["labels"] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  public barChartData: ChartDataset[] = [
    { data:[]    , label: 'Consumidores'},

  ];


  constructor(private consumidores: ConsumidoresServiceService) { }

  ngOnInit(): void {
    this.consumidores.getConsumidoresRegistrados().pipe().subscribe(data => {

      let array = data;

      this.barChartData = [
        { data: array, label: 'Consumidores Registrados' },
      ]
    })




}
}
