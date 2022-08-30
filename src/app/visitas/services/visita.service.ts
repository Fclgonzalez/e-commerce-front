import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Visita } from '../models/visita';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  private readonly baseUrl: string = 'https://api-nossolar.herokuapp.com/imobil/visitas'

  constructor(
    private http: HttpClient
  ) { }

  getVisitas(): Observable<Visita[]> {
    return this.http.get<Visita[]>(this.baseUrl)
  }

  getVisitaById(idVisita: number): Observable<Visita> {
    return this.http.get<Visita>(`${this.baseUrl}/${idVisita}`)
  }

  getVisitasByImovelId(idImovel: number): Observable<Visita[]> {
    return this.http.get<Visita[]>(`${this.baseUrl}/imovel/${idImovel}`)
  }

  getVisitasByConsumidorId(idConsumidor: number): Observable<Visita[]> {
    return this.http.get<Visita[]>(`${this.baseUrl}/consumidor/${idConsumidor}`)
  }

  getVisitasByVendedorId(idVendedor: number): Observable<Visita[]> {
    return this.http.get<Visita[]>(`${this.baseUrl}/vendedor/${idVendedor}`)
  }

  getVisitaByStatus(status: string): Observable<Visita[]> {
    return this.http.get<Visita[]>(`${this.baseUrl}/status?status=${status}`)
  }

  getVisitaByStatusAndIdConsumidor(idConsumidor:number, status: string): Observable<Visita[]> {
    return this.http.get<Visita[]>(`${this.baseUrl}/status/consumidor/${idConsumidor}?status=${status}`)
  }

  getVisitaByStatusAndIdVendedor(idVendedor:number, status: string): Observable<Visita[]> {
    return this.http.get<Visita[]>(`${this.baseUrl}/status/vendedor/${idVendedor}?status=${status}`)
  }

  postVisita(visita: Visita, idConsumidor: number, idImovel: number): Observable<Visita> {
    return this.http.post<Visita>(`${this.baseUrl}/${idConsumidor}/${idImovel}`, visita)
  }

  patchVisita(visita: Visita, idVisita: number): Observable<Visita> {
    return this.http.patch<Visita>(`${this.baseUrl}/${idVisita}`, visita)
  }

  patchStatusVisita(idVisita: number, status: string): Observable<Visita> {
    return this.http.patch<Visita>(`${this.baseUrl}/status/${idVisita}?status=${status}`, '')
  }

  deleteVisita(idVisita: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${idVisita}`)
  }

}
