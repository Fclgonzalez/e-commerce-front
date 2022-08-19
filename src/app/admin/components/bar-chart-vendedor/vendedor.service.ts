import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

    private url: string = 'http://localhost:8080/imobil/usuarios/registrados/3';


  constructor(private http: HttpClient) { }

  getVendedoresRegistrados(): Observable<[]> {
    return this.http.get<[]>(this.url);
  }
}
