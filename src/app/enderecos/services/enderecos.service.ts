import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root',
})
export class EnderecosService {
  private readonly url: string = 'https://api-nossolar.herokuapp.com/imobil/enderecos';
  public atualizarEndereco$: BehaviorSubject<boolean> = new BehaviorSubject(
    true
  );


  constructor(private http: HttpClient) {}
  getEnderecos() {
    return this.http.get<Endereco[]>(this.url);
  }

  getEnderecosById(idEndereco: number) {
    return this.http.get<Endereco>(`${this.url}/${idEndereco}`);
  }

  cadastrarEnderecoImovel(
    endereco: Endereco,
    idImovel?: number
  ): Observable<Endereco> {
    return this.http
      .post<Endereco>(`${this.url}/imovel/${idImovel}`, endereco)
      .pipe(
        tap(() => {
          this.atualizarEndereco$.next(true);
        })
      );
  }

  cadastrarEnderecoUsuario(
    endereco: Endereco,
    idUser?: number
  ): Observable<Endereco> {
    return this.http
      .post<Endereco>(`${this.url}/usuario/${idUser}`, endereco)
      .pipe(
        tap(() => {
          this.atualizarEndereco$.next(true);
        })
      );
  }

 


    atualizarEndereco(endereco: Endereco): Observable<Endereco> {

      return this.http.put<Endereco>(`${this.url}/${endereco.idEndereco}`, endereco)
      .pipe(
        tap((endereco) => {
          this.atualizarEndereco$.next(true)
        })
      )

    }


}
