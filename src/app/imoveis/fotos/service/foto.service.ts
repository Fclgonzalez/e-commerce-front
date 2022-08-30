import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Foto } from '../models/foto';

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  private readonly url: string = 'https://api-nossolar.herokuapp.com/imobil/fotos'
  private atualizarFoto$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(
    private http: HttpClient
  ) { }

  buscaFotos(): Observable<Foto[]> {
    return this.http.get<Foto[]>(this.url)
  }

  buscaFotoById(id: number): Observable<Foto> {
    return this.http.get<Foto>(`${this.url}/${id}`)
  }

  buscaFotosImovel(idImovel: number): Observable<Foto[]> {
    return this.http.get<Foto[]>(`${this.url}Imovel?idVendedor=${idImovel}`
    )
  }

  salvarLinkFoto(foto: Foto, idImovel: number) {
    // console.log(foto.linkFoto);
    // console.log(idImovel);
    console.log(`${this.url}/${idImovel}?linkFoto=${foto.linkFoto}`);


    return this.http.post(`${this.url}/${idImovel}?linkFoto=${foto.linkFoto}`, null)
  }

  deletarFoto(foto: Foto): Observable<Foto> {
    return this.http.delete<Foto>(`${this.url}/${foto.id}`)
  }
}
