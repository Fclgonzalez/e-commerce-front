import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, mergeMap, Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl: string = 'http://localhost:8080/imobil/usuarios'
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

 /*  atualizarUsuario(user: User): Observable<User> {

    return this.http.put<User>(`${this.baseUrl}/${user.idUser}`, user)
    .pipe(
      tap((usuario) => {
        this.atualizarUsuarioSub$.next(true)
      })
    )
  }  */

 /*  atualizarUsuario(user: User): Observable<User> {

    return this.http.put<User>(`${this.baseUrl}/${user.idUser}`, user)
    .pipe(mergeMap(
      (a) => {
        user = a
        return this.http.put<User>(`${this.baseUrl}/${user.idUser}`, user).pipe(tap(() => this.atualizarUsuarioSub$.next(true)))
      }
    ))
      
  } */

}
