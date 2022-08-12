import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnderecosService {

  /*   private readonly baseurl: string = 'http://localhost:8080/servicos/endereco'

   constructor(private http: HttpClient) { }
  getEnderecos() {
    return this.http.get<Enderecos[]>(this.baseurl);
  }

  getEnderecosID(id: number) {
    return this.http.get<Enderecos>(`${this.baseurl}/${id}`)
  } 


  
   postEnderecos( endereco: Enderecos) {
    return this.http.post<Enderecos>(`${this.baseurl}`, endereco).pipe(mergeMap(
      (a:any) => {
        return this.http.post<Enderecos>(`${this.baseurl}/${a.idEndereco}`, endereco)
      }
    ))
  } */

  /*putCliente(cliente: Clientes, endereco: EnderecoCliente) {
    return this.http.put<EnderecoCliente>(`${this.baseurl2}/${cliente.idCliente}`, endereco).pipe(mergeMap(
      (a) => {
        cliente.enderecoCliente = a
        return this.http.put<Clientes>(`${this.baseurl}/${cliente.idCliente}`, cliente).pipe(tap(() => this.atualizarClientesSub$.next(true)))
      }
    ))} */

}
