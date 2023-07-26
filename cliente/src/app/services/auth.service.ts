import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Usuario } from '../models/usuario';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:4000/api';
  authSubject = new BehaviorSubject(false);
  private token!:  any | null;
  constructor(private httpClient: HttpClient) { }

  register(usuario: Usuario): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`,
    usuario).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // guardar token
            console.log(res)
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }

  login(user: Usuario): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

  getUsuarios(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER +'/users')
  }

  deleteUsuario(id:string): Observable<any> {
    return this.httpClient.delete(this.AUTH_SERVER +'/users/'+ id)
  }

  obtenerUsuario(id:string): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER  +'/users/'+ id)
  }

  editarUsuario(id:string, usuario:Usuario): Observable<any> {
     return this.httpClient.put(this.AUTH_SERVER +'/users/'+ id, usuario)
  }

}
