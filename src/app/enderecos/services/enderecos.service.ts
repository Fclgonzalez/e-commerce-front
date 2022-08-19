import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root',
})
export class EnderecosService {
  private readonly url: string = 'http://localhost:8080/imobil/enderecos';
  public atualizarEndereco$: BehaviorSubject<boolean> = new BehaviorSubject(
    true
  );

  constructor(private http: HttpClient) {}
  /*   getEnderecos() {
    return this.http.get<Enderecos[]>(this.baseurl);
  }

  getEnderecosID(id: number) {
    return this.http.get<Enderecos>(`${this.baseurl}/${id}`)
  } 

 */
  cadastrarEnderecoImovel(
    endereco: Endereco,
    idImovel?: number
  ): Observable<Endereco> {
    return this.http.post<Endereco>(`${this.url}/imovel/${idImovel}`, endereco).pipe(
      tap(() => {
        this.atualizarEndereco$.next(true);
      })
    );
  }

  /* postEnderecos(endereco: Enderecos) {
    return this.http.post<Enderecos>(`${this.baseurl}`, endereco).pipe(
      mergeMap((a: any) => {
        return this.http.post<Enderecos>(
          `${this.baseurl}/${a.idEndereco}`,
          endereco
        );
      })
    );
  } */

  /* putCliente(cliente: Clientes, endereco: EnderecoCliente) {
    return this.http.put<EnderecoCliente>(`${this.baseurl2}/${cliente.idCliente}`, endereco).pipe(mergeMap(
      (a) => {
        cliente.enderecoCliente = a
        return this.http.put<Clientes>(`${this.baseurl}/${cliente.idCliente}`, cliente).pipe(tap(() => this.atualizarClientesSub$.next(true)))
      }
    ))}  */
}
