import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/user/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = 'https://api-nossolar.herokuapp.com'
  private helper = new JwtHelperService()

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

    login(user: User): Observable<{accessToken: string}> {
      return this.http.post<{accessToken: string}>(`${this.baseUrl}/login`, user)
      .pipe(
        tap((response) => {
          this.armazenarToken(response.accessToken)
        })
      )
    }

    logout(): void {
      this.removerToken()
      this.router.navigateByUrl('/principal/pagina-inicial')
    }

    cadastrarConsumidor(user: User): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/imobil/registro/consumidor`, user)
    }

    cadastrarVendedor(user: User): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/imobil/registro/vendedor`, user)
    }

    armazenarToken(token: string): void {
      localStorage.setItem('accessToken', token)
    }

    removerToken(): void {
      localStorage.removeItem('accessToken')
    }

    recuperarToken(): string | null {
      return localStorage.getItem('accessToken')
    }

    logado(): boolean {
      const token = this.recuperarToken()
      if (token == null) {
        return false
      }
      return !this.helper.isTokenExpired(token)
    }

    decodeToken() {
      const token = this.recuperarToken()
      const decode = this.helper.decodeToken(token!)
      return decode
    }

    verificaUsername(username:String):Observable<User>{
      return this.http.get<User>(`${this.baseUrl}/imobil/usuarios/username?username=${username}`)
    }

    verificaIdentificacao(identificacao:String):Observable<User>{
      return this.http.get<User>(`${this.baseUrl}/imobil/usuarios/identificacao?identificacao=${identificacao}`)
    }

}
