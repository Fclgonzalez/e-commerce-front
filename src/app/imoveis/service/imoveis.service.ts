import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, merge, mergeMap, Observable, of, tap } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Imovel } from '../models/imovel';
import { ImovelComponent } from '../pages/imovel/imovel.component';

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

  cadastrarImovel(imovel: Imovel, idVendedor: number, linkFoto: any): Observable<Imovel> {
    imovel.foto = linkFoto
      return this.http.post<Imovel>(`${this.url}/${idVendedor}`, imovel)
      .pipe(tap(() => {
        this.atualizarImovel$.next(true)
      }))
  }

  salvarFoto(foto: File): Observable<any> {
    return this.uploadImagem(foto)
  }

  editarImovel(imovel: Imovel, id: number): Observable<Imovel> {

        return this.http.put<Imovel>(`${this.url}/${imovel.idImovel}`, imovel)
        .pipe(tap(() => {
        this.atualizarImovel$.next(true)
      }))
  }

  buscarCep(cep: string) {
    return this.http.get(`${this.urlCep}/${cep}/json`);
  }


  private uploadImagem(foto: File): Observable<string> {

  const nomeDoArquivo = Date.now() + Math.floor(Math.random()*1000)
  const dados = from(this.storage.upload(`${nomeDoArquivo}`, foto))

  console.log(foto);

  return dados.pipe(mergeMap(
    (result) => { return result.ref.getDownloadURL() }))
  }
}
