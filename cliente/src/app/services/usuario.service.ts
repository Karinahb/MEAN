import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = 'http://localhost:4000/api/users';

  constructor(private http: HttpClient) {  }

    getUsuarios(): Observable<any> {
      return this.http.get(this.url)
    }

    deleteUsuario(id:string): Observable<any> {
      return this.http.delete(this.url + id)
    }


    obtenerUsuario(id:string): Observable<any> {
      return this.http.get(this.url + id)
    }

    editarUsuario(id:string, usuario:Usuario): Observable<any> {
      return this.http.put(this.url + id, usuario)
    }


}
