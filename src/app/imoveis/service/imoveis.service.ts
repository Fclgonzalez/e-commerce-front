import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Imovel } from '../models/imovel';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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

  cadastrarImovel(imovel: Imovel, idVendedor?: number): Observable<Imovel> {
    return this.http.post<Imovel>(`${this.url}/${idVendedor}`, imovel).pipe(
      tap(() => {
        this.atualizarImovel$.next(true);
      })
    );
  }

  editarImovel(imovel: Imovel): Observable<Imovel> {
    return this.http.put<Imovel>(`${this.url}/${imovel.idImovel}`, imovel).pipe(
      tap(() => {
        this.atualizarImovel$.next(true);
      })
    );
  }

  buscar(cep: string) {
    return this.http.get(`${this.urlCep}/${cep}/json`);
  }

  private async uploadImagem(foto: File): Promise<string> {

    const nomeDoArquivo = Date.now()

    const dados = await this.storage.upload(`${nomeDoArquivo}`, foto)

    const downloadURL = await dados.ref.getDownloadURL()

    return downloadURL
 }
}
