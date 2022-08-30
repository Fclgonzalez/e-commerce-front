import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  from,
  map,
  merge,
  mergeMap,
  Observable,
  of,
  tap,
} from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Imovel } from '../models/imovel';
import { ImovelComponent } from '../pages/imovel/imovel.component';

@Injectable({
  providedIn: 'root',
})
export class ImoveisService {
  private readonly url: string =
    'https://api-nossolar.herokuapp.com/imobil/imoveis';
  private readonly urlCep: string = 'https://viacep.com.br/ws';
  public atualizarImovel$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private http: HttpClient, private storage: AngularFireStorage) {}

  postFiltrar(imovel: Imovel): Observable<Imovel[]> {
    return this.http.post<Imovel[]>(`${this.url}Filtrar`, imovel);
  }

  getImoveis(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(this.url);
  }

  getImoveisById(id: number): Observable<Imovel> {
    return this.http.get<Imovel>(`${this.url}/${id}`);
  }

  getImoveisByIdVendedor(idVendedor: number): Observable<Imovel> {
    return this.http.get<Imovel>(
      `${this.url}Vendedor?idVendedor=${idVendedor}`
    );
  }

  getImoveisAtivosVendedor(idVendedor: number): Observable<Imovel> {
    return this.http.get<Imovel>(`${this.url}/ativo/${idVendedor}`);
  }

  getImoveisInativosVendedor(idVendedor: number): Observable<Imovel> {
    return this.http.get<Imovel>(`${this.url}/inativo/${idVendedor}`);
  }

  getImoveisContratoAluguel(contratoAluguel: boolean): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(
      `${this.url}ContratoAluguel?contratoAluguel=${contratoAluguel}`
    );
  }

  getImoveisContratoVenda(contratoVenda: boolean): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(
      `${this.url}ContratoVenda?contratoVenda=${contratoVenda}`
    );
  }

  cadastrarImovel(imovel: Imovel, idVendedor: number): Observable<Imovel> {
    return this.http.post<Imovel>(`${this.url}/${idVendedor}`, imovel).pipe(
      tap(() => {
        this.atualizarImovel$.next(true);
      })
    );
  }

  cadastrarImovelInicial(
    imovel: Imovel,
    idVendedor: number,
    linkFoto: any
  ): Observable<Imovel> {
    imovel.foto = linkFoto;
    return this.http
      .post<Imovel>(`${this.url}/inicial/${idVendedor}`, imovel)
      .pipe(
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

  inativarImovel(imovel: Imovel): Observable<Imovel> {
    return this.http.put<Imovel>(
      `${this.url}Inativar/${imovel.idImovel}?inativo=${true}`,
      imovel
    );
  }

  ativarImovel(imovel: Imovel): Observable<Imovel> {
    return this.http.put<Imovel>(
      `${this.url}Inativar/${imovel.idImovel}?inativo=${false}`,
      imovel
    );
  }

  deletarImovel(idImovel: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${idImovel}`);
  }

  buscarCep(cep: string) {
    return this.http.get(`${this.urlCep}/${cep}/json`);
  }
  

  salvarFoto(foto: File): Observable<any> {
    return this.uploadImagem(foto);
  }

 

  private uploadImagem(foto: File): Observable<string> {
    const nomeDoArquivo = Date.now() + Math.floor(Math.random() * 1000);
    const dados = from(this.storage.upload(`${nomeDoArquivo}`, foto));

    console.log(foto);

    return dados.pipe(
      mergeMap((result) => {
        return result.ref.getDownloadURL();
      })
    );
  }
}
