import { Component,  OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Fecha } from 'src/app/models/fecha';
import { Lista } from 'src/app/models/lista';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FechaService } from 'src/app/services/fecha.service';

@Component({
  selector: 'app-pago-cancha',
  templateUrl: './pago-cancha.component.html',
  styleUrls: ['./pago-cancha.component.css'],
})
export class PagoCanchaComponent implements OnInit {
  myForm:any = {};

  isSubmitted = false;
  listarUsuarios:Usuario[]= [];
  listarFechas:Fecha[]=[];
  listarDatos:Lista[]=[];
  type: any;
  selected! : any[];
  selectedOptions=[];
  selectedOption:any;
 totales:number = 0;
 monto!:number;
    constructor(

      private _authService:AuthService,
                private _fechaService:FechaService,
                private toastr: ToastrService,
                private fb:FormBuilder,
                private formBuilder: FormBuilder
               ){
                this.myForm = formBuilder.group({
                  totalIngresos: new FormControl("", {validators: Validators.required, updateOn: 'blur'})
              }, {updateOn: 'change'});
               }

    ngOnInit(): void {
      this.obtenerUsuarios();
      this.obtenerFechas();
      this.obtenerDatos();

    }

    obtenerUsuarios(){
      this._authService.getUsuarios ().subscribe(data =>{
        this.listarUsuarios = data;
        console.log(this.listarUsuarios)
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

   onNgModelChange(listaDato:Lista, fechas:Fecha, usuario:Usuario){
    console.log(listaDato);
    console.log(fechas);
    console.log(usuario);
    this.totales =  (this.totales +  listaDato.monto)
    console.log(this.totales)




  }



}
