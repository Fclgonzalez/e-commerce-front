import { ImovelService } from './imovel.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-bar-chart-imoveis',
  templateUrl: './bar-chart-imoveis.component.html',
  styleUrls: ['./bar-chart-imoveis.component.css']
})
export class BarChartImoveisComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: BaseChartDirective["labels"] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  public barChartData: ChartDataset[] = [
    { data: [], label: 'Imoveis Registrados' },

  ];
  constructor(private imovelService: ImovelService) { }

  ngOnInit(): void {

    this.imovelService.getImoveis().pipe().subscribe(data => {

      let array = data;

      this.barChartData = [
        { data: array, label: 'Imoveis Registrados' },
      ]
    })

  }

}
