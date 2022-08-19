import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumidoresServiceService {
  private url: string = 'http://localhost:8080/imobil/usuarios/registrados/2';


constructor(private http: HttpClient) { }

getConsumidoresRegistrados(): Observable<[]> {
  return this.http.get<[]>(this.url);
}

}
