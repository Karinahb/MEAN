import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  listarUsuarios:Usuario[]= [];

    constructor(private _authService:AuthService,
                private toastr: ToastrService){}

    ngOnInit(): void {
      this.obtenerUsuarios();
    }

    obtenerUsuarios(){
      this._authService.getUsuarios().subscribe(data =>{
        this.listarUsuarios = data;
      }, error =>{
        console.log(error);
      })
    }

    eliminarUsuario(id:any){
      this._authService.deleteUsuario(id).subscribe(data =>{
          this.toastr.error('El usuario fue eliminado exitosamente','Usuario Eliminado');
          this.obtenerUsuarios();
      }, error =>{
          console.log(error);
      });

    }

  }
