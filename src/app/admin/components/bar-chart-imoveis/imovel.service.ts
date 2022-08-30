import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {


  private url: string = 'https://api-nossolar.herokuapp.com/imobil/imoveis/mes';
constructor(private http: HttpClient) {}

  getImoveis(): Observable<[]> {
    return this.http.get<[]>(this.url);
  }
}
