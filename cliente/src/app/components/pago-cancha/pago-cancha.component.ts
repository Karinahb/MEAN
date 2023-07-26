import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Fecha } from 'src/app/models/fecha';
import { Lista } from 'src/app/models/lista';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FechaService } from 'src/app/services/fecha.service';

@Component({
  selector: 'app-pago-cancha',
  templateUrl: './pago-cancha.component.html',
  styleUrls: ['./pago-cancha.component.css']
})
export class PagoCanchaComponent implements OnInit {
  isSubmitted = false;
  listarUsuarios:Usuario[]= [];
  listarFechas:Fecha[]=[];
  listarDatos:Lista[]=[];
  filas = [];
  type: any;
    constructor(private _authService:AuthService,
                private _fechaService:FechaService,
                private toastr: ToastrService,
                public fb: FormBuilder){}

                registrationForm = this.fb.group({
                  datoName: ['', [Validators.required]],
                });

    ngOnInit(): void {
      this.obtenerUsuarios();
      this.obtenerFechas();
      this.obtenerDatos()
    }




    obtenerUsuarios(){
      this._authService.getUsuarios ().subscribe(data =>{
        this.listarUsuarios = data;
      }, error =>{
        console.log(error);
      })
    }

    obtenerFechas(){
      this._fechaService.getFechas().subscribe(data =>{
        this.listarFechas = data;
      }, error =>{
        console.log(error);
      })
    }

    obtenerDatos(){
      this._fechaService.getDatos().subscribe(data =>{
        this.listarDatos = data;
      }, error =>{
        console.log(error);
      })
    }

    OnChange(e:any) {
      this.type= e.target.value;
      console.log(this.type)
   }

}
