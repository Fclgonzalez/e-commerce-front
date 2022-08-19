import { Component, OnInit } from '@angular/core';
import { CardsService } from './cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  public totalVendedores: number = 0;
  public totalConsumidores: number = 0;
  public totalVisitas: number = 0;
  public totalImoveis: number = 0;

  constructor(private total: CardsService) { }

  ngOnInit(): void {

    this.total.getTotalConsumidores().pipe().subscribe(
      (data) => {

          this.totalConsumidores += data.valueOf();

        }
    );

        this.total.getTotalVendedores().pipe().subscribe(
          (data) => {

                this.totalVendedores += data.valueOf();

              }
        );

        this.total.getTotalVisitas().pipe().subscribe(
          (data) => {

                  this.totalVisitas += data.valueOf();

                }
        );
        this.total.getTotalImoveis().pipe().subscribe(
          (data) => {

                    this.totalImoveis += data.valueOf();

                  }
        );
  }
}
