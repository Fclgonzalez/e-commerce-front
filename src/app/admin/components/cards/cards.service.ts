import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  //url


constructor(private http: HttpClient) { }

getTotalConsumidores(): Observable<number> {

  return this.http.get<number>('https://api-nossolar.herokuapp.com/imobil/usuarios/total/2');
}

getTotalVendedores(): Observable<number> {

    return this.http.get<number>('https://api-nossolar.herokuapp.com/imobil/usuarios/total/3');

}

getTotalVisitas(): Observable<number> {

      return this.http.get<number>('https://api-nossolar.herokuapp.com/imobil/visitas/total');
}

getTotalImoveis(): Observable<number> {

      return this.http.get<number>('https://api-nossolar.herokuapp.com/imobil/imoveis/total');
}

}
