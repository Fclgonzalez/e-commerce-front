import { Endereco } from './../../interface/endereco';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../interface/usuario';
import {newUser} from '../../interface/newUser';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url: string = 'http://localhost:8080/imobil/usuarios';
  private urlEnd: string = 'http://localhost:8080/imobil/enderecos';
  private urlAdmin: string = 'http://localhost:8080/imobil';

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}`);
  }

  public postEndereco(idUser: number, endereco: Endereco) {
    return this.http.post(
      `${this.urlEnd}/usuario/${idUser}`,
      endereco
    );
  }

  public updateEndereco(endereco: Endereco) {
    return this.http.put(
      `${this.urlEnd}/${endereco.idEndereco}`,
      endereco
    );
  }

  public updateUser(usuario: Usuario) {
    return this.http.put(`${this.url}`, usuario);
  }

  public saveEndereco(userid: number, endereco: any) {
    if (endereco.idEndereco != null) {
      return this.updateEndereco(endereco);
    } else {
      return this.postEndereco(userid, endereco);
    }
  }

  public patchUser(usuario: Usuario) {
    return this.http.patch(`${this.url}/${usuario.username}`, usuario);
  }

  public deleteUser(id: number) {
    return this.http.delete(`${this.url}/${id}`);

  }

  public disableEnableUser(username: string) {
    return this.http.patch(`${this.url}/${username}/admin`, null);
  }

  public newUser(usuario: newUser) {
    return this.http.post(`${this.urlAdmin}/registro/admin`, usuario);
  }
  public promoteUser(id:number){
    return this.http.patch(`${this.url}/${id}/promote`, null);
  }
}
