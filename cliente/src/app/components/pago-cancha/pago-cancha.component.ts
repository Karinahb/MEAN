import { Component,  OnInit } from '@angular/core';
import {  FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Fecha } from 'src/app/models/fecha';
import { Lista } from 'src/app/models/lista';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FechaService } from 'src/app/services/fecha.service';
import * as _ from 'lodash';

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
 columnas!:number;
 filas!:number;
    constructor(

      private _authService:AuthService,
                private _fechaService:FechaService,
                private toastr: ToastrService,
                private fb:FormBuilder,
                private formBuilder: FormBuilder
               ){
                this.myForm = formBuilder.group({
                  totalIngresos: new FormControl("", {validators: Validators.required, updateOn: 'blur'}),
                  checkArray: this.fb.array([])
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
        this.filas = this.listarUsuarios.length;
        console.log("Filas:",this.filas)
      }, error =>{
        console.log(error);
      })
    }

    obtenerFechas(){
      this._fechaService.getFechas().subscribe(data =>{
        this.listarFechas = data;
        this.columnas = this.listarFechas.length;
        console.log("Columnas:", this.columnas)
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

   onNgModelChange(e:any){
    const checkArray: FormArray = this.myForm.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    }else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
