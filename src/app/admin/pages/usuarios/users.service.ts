import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url: string = 'http://localhost:8080/imobil/usuarios';
constructor(private http:HttpClient) { }





public getAllUsers():Observable<Usuario> {
  return this.http.get<Usuario>(`${this.url}`);
}
}
