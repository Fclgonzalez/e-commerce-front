import { VisitaService } from './../../components/bar-chart-visitas/visita.service';
import { VendedorService } from './../../components/bar-chart-vendedor/vendedor.service';
import { Component, OnInit } from '@angular/core';
import { ConsumidoresServiceService } from '../../components/bar-chart/consumidores-service.service';
import { ImovelService } from '../../components/bar-chart-imoveis/imovel.service';
import { Chart } from 'chart.js';
import { ChartType } from '../../interface/enum/chart-type.enum';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public arrConsu: any[] = [];
  public arrVende: any[] = [];
  public arrImove: any[] = [];
  public arrVisit: any[] = [];


  constructor(
    private consumidores: ConsumidoresServiceService,
    private vendedores: VendedorService,
    private imoveis: ImovelService,
    private visitas: VisitaService,
    private title: Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle("E-commerce Imobiliaria: Dashboard Admin")
    this.getConsumidores();
    this.getVendedores();
    this.getImoveis();
    this.getVisitas();

  }

  public getConsumidores(): void {
    this.consumidores.getConsumidoresRegistrados().subscribe(data => {
      this.arrConsu = data;
      this.initializeConsu();
    })
  }

  public getVendedores(): void {
    this.vendedores.getVendedoresRegistrados().subscribe(data => {
      this.arrVende = data;
      this.initializeVende();
    })
  }

  public getImoveis(): void {
    this.imoveis.getImoveis().subscribe(data => {
      this.arrImove = data;
      this.initializeImove();
    })
  }

  public getVisitas(): void {
    this.visitas.getVisitasRegistradas().subscribe(data => {
      this.arrVisit = data;
      this.initializeVisita();
    })
  }

  private initializeConsu() {
    const ctx = document.getElementById('barChartConsu') as HTMLCanvasElement;

    return new Chart(ctx, {
      type: ChartType.BAR,
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
          {
            label: 'Consumidores Registrados',
            data: this.arrConsu,
            backgroundColor: [
              'rgb(1, 33, 105)',
            ],
            borderWidth: 0,
          },
        ],
      },  options: {
        plugins: {
            title: {
                display: true,
                text: [`Consumidores Registrados`],
                color: 'black'
            },
            legend: {
              display: false
           }
        }
    }
    });
  }




  private initializeVende() {
    const ctx = document.getElementById('barChartVend') as HTMLCanvasElement;

    return new Chart(ctx, {
      type: ChartType.BAR,
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
          {
            label: 'Vendedores Registrados',
            data: this.arrVende,
            backgroundColor: [
              'rgb(1, 33, 105)',

            ],

            borderWidth: 0,
          },
        ],
      }, options: {
        plugins: {
            title: {
                display: true,
                text: [`Vendedores Registrados`],
                color: 'black'
            },
            legend: {
              display: false
           }
        }
    }
    });
  }

  private initializeImove() {
    const ctx = document.getElementById('barChartImo') as HTMLCanvasElement;

    return new Chart(ctx, {
      type: ChartType.BAR,
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
          {
            label: 'Imoveis Registrados',
            data: this.arrImove,
            backgroundColor: [
              'rgb(1, 33, 105)',
              ],
            borderWidth: 0,
          },
        ],
      },options: {
        plugins: {
            title: {
                display: true,
                text: [`Imoveis Registrados`],
                color: 'black'
            },
            legend: {
              display: false
           }
        }
    }
    });
  }




  private initializeVisita() {
    const ctx = document.getElementById('barChartVis') as HTMLCanvasElement;

    return new Chart(ctx, {
      type: ChartType.BAR,
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
          {
            label: 'Visitas Agendadas',
            data: this.arrVisit,
            backgroundColor: [
              'rgb(1, 33, 105)',

            ],
            borderWidth: 0,
          },
        ],
      }, options: {
        plugins: {
            title: {
                display: true,
                text: [`Visitas Agendadas`],
                color: 'black'

            },
            legend: {
              display: false
           }
        }
    },
    });
  }
}
