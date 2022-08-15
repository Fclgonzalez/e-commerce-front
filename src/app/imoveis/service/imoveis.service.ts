import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Imovel } from '../models/imovel';

@Injectable({
  providedIn: 'root'
})
export class ImoveisService {

  private readonly url:string = "http://localhost:8080/imobil/imoveis"
  public atualizarImovel$:BehaviorSubject<boolean> = new BehaviorSubject(true)


  constructor(
    private http: HttpClient
    ) { }


  getImoveis():Observable<Imovel[]> {
   return this.http.get<Imovel[]>(this.url)
  }

  getImoveisById(id:number):Observable<Imovel> {
    return this.http.get<Imovel>(`${this.url}/${id}`)
  }

  cadastrarImovel(imovel:Imovel, idVendedor?: number):Observable<Imovel> {
    return this.http.post<Imovel>(`${this.url}/${idVendedor}`, imovel)
    .pipe(tap(() => {
      this.atualizarImovel$.next(true)
    }))
  }

  editarImovel(imovel: Imovel):Observable<Imovel> {
    return this.http.put<Imovel>(`${this.url}/${imovel.idImovel}`, imovel)
    .pipe(
      tap(() => {
      this.atualizarImovel$.next(true)
    }))
  }
}
