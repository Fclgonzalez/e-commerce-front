import { VendedorService } from './vendedor.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-bar-chart-vendedor',
  templateUrl: './bar-chart-vendedor.component.html',
  styleUrls: ['./bar-chart-vendedor.component.css']
})
export class BarChartVendedorComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: BaseChartDirective["labels"] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  public barChartData: ChartDataset[] = [
    { data: [], label: 'Vendedores Registrados' },

  ];
  constructor(private vendedores: VendedorService) { }

  ngOnInit(): void {

    this.vendedores.getVendedoresRegistrados().pipe().subscribe(data => {

      let array = data;


      this.barChartData = [
        { data: array, label: 'Vendedores Registrados' },
      ]
    })
  }

}
