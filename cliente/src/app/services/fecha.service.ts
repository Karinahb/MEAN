import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  url = 'http://localhost:4000/api/fechas/';
  urlDato = 'http://localhost:4000/api/listadatos';

  constructor(private http:HttpClient) {}

  getFechas(): Observable<any> {
    return this.http.get(this.url)
  }


  getDatos(): Observable<any> {
    return this.http.get(this.urlDato)
  }


}
