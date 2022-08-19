import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, mergeMap, Observable, tap } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Imovel } from '../models/imovel';

@Injectable({
  providedIn: 'root',
})
export class ImoveisService {

  private readonly url: string = 'http://localhost:8080/imobil/imoveis';
  private readonly urlCep: string = 'https://viacep.com.br/ws';
  public atualizarImovel$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage
    ) {}

  getImoveis(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(this.url);
  }

  getImoveisById(id: number): Observable<Imovel> {
    return this.http.get<Imovel>(`${this.url}/${id}`);
  }

  cadastrarImovel(imovel: Imovel, idVendedor: number, foto: File): Observable<Imovel> {

    return this.uploadImagem(foto).pipe(mergeMap((linkFotoFirebase) => {
      imovel.foto = linkFotoFirebase
      return this.http.post<Imovel>(`${this.url}/${idVendedor}`, imovel)
    }))
  }

  editarImovel(imovel: Imovel, foto?: File): Observable<Imovel> {

    if (foto == undefined) {
      return this.http.put<Imovel>(`${this.url}/${imovel.idImovel}`, imovel)
      .pipe(
        tap(() => {
          this.atualizarImovel$.next(true);
        })
      )
    }

    return this.uploadImagem(foto).pipe(mergeMap((linkFotoFirebase) => {
        imovel.foto = linkFotoFirebase
        return this.http.put<Imovel>(`${this.url}/${imovel.idImovel}`, imovel)
      }),
      tap(() => {
        this.atualizarImovel$.next(true)
      })
    )
  }

  buscarCep(cep: string) {
    return this.http.get(`${this.urlCep}/${cep}/json`);
  }


  private uploadImagem(foto: File): Observable<string> {

  const nomeDoArquivo = Date.now()
  const dados = from(this.storage.upload(`${nomeDoArquivo}`, foto))

  return dados.pipe(mergeMap(
    (result) => { return result.ref.getDownloadURL() }))
  }
}
