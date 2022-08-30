import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, mergeMap, Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl: string = 'https://api-nossolar.herokuapp.com/imobil/usuarios'
  atualizarUsuarioSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(
    private http: HttpClient
      ) { }

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl)
  }

  getUsuarioById(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${idUser}`)
  }

  getUsuarioByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/username/${username}`)
  }



  getUsuarioByRoleId(idRole: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/role/${idRole}`)
  }

  patchUsuario(username: string, user: User): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${username}`, user)
  }

  patchDesabilitarUsuario(username: string, user: User): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${username}/disable`, user)
  }

  patchAdminDesabilitarUsuario(username: string, user: User): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${username}/admin`, user)
  }

  deleteUsuario(idUser: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${idUser}`)
  }

 

}
