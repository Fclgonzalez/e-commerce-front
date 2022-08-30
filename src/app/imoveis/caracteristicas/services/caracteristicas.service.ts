import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Caracteristica } from '../models/caracteristica';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicasService {

  private readonly url: string = 'https://api-nossolar.herokuapp.com/imobil/caracts'
  public atualizarCaracteristica$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(
    private http: HttpClient
  ) { }

    getCaracteristicas(): Observable<Caracteristica[]> {
      return this.http.get<Caracteristica[]>(this.url)
    }

    getCaracteristicaByIdImovel(idImovel:number):Observable<Caracteristica>{
      return this.http.get<Caracteristica>(`${this.url}/imovel/${idImovel}`)
    }

    getCaracteristicaByIdImovelList(idImovel:number):Observable<Caracteristica[]>{
      return this.http.get<Caracteristica[]>(`${this.url}/imovel/${idImovel}`)
    }

    postNovaCaracteristica(caract: Caracteristica): Observable<Caracteristica> {
      return this.http.post<Caracteristica>(this.url, caract)
    }

    postAddCaracteristicaImovel(idCaract: number, idImovel: number ): Observable<any> {
      return this.http.post<any>(`${this.url}/${idImovel}/${idCaract}`, '')
    }

    deleteCaracteristica(id: number): Observable<any> {
      return this.http.delete<any>(`${this.url}/${id}`)
    }

    deleteCaracteristicaImovel(idImovel:number): Observable<any> {
      return this.http.delete<any>(`${this.url}/imovel/${idImovel}`)
    }









}
