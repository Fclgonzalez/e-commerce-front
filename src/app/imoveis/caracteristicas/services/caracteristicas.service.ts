import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caracteristica } from '../models/caracteristica';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicasService {

  private readonly basUrl: string = 'http://localhost:8080/imobil/caracts'

  constructor(
    private http: HttpClient
  ) { }

    getCaracteristicas(): Observable<Caracteristica[]> {
      return this.http.get<Caracteristica[]>(this.basUrl)
    }

    postNovaCaracteristica(caract: Caracteristica): Observable<Caracteristica> {
      return this.http.post<Caracteristica>(this.basUrl, caract)
    }

    postAddCaracteristicaImovel(idCaract: number, idImovel: number ): Observable<any> {
      return this.http.post<any>(`${this.basUrl}/${idImovel}/${idCaract}`, '')
    }

    deleteCaracteristica(id: number): Observable<any> {
      return this.http.delete<any>(`${this.basUrl}/${id}`)
    }



    





}
