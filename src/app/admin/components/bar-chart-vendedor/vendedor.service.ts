import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

    private url: string = 'https://api-nossolar.herokuapp.com/imobil/usuarios/registrados/3';


  constructor(private http: HttpClient) { }

  getVendedoresRegistrados(): Observable<[]> {
    return this.http.get<[]>(this.url);
  }
}
