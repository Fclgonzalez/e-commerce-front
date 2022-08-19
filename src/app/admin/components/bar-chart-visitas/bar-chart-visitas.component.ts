import { VisitaService } from './visita.service';
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
    { data: [], label: 'Visitas Registrados' },

  ];
  constructor(private visitas:VisitaService) { }

  ngOnInit(): void {


    this.visitas.getVisitasRegistradas().pipe().subscribe(data => {

      let array = data;

      this.barChartData = [
        { data: array, label: 'Visitas Registrados' },
      ]
    })




    };

  }


