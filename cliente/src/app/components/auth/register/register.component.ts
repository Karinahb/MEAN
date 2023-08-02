import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  usuarioForm: FormGroup;
  titulo = 'Crear Usuario';
  id:string;
  estaDeshabilitado:any;
  constructor(private fb:FormBuilder,
    private router:Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private aRouter:ActivatedRoute){
      this.usuarioForm=this.fb.group({
        name:['',Validators.required],
        email:['',Validators.required],
        password:['',Validators.required],
      })

    this.id = aRouter.snapshot.paramMap.get('id')!;
   }

   ngOnInit(): void {
    this.esEditar();
  }

/*
  onRegister(frmRegister:NgForm): void {
    this.authService.register(frmRegister.value).subscribe(res => {
     // this.router.navigateByUrl('listausuarios');
     this.router.navigate(['/auth/users']);
    });
  }
  */

  agregarUsuario(){
    const USUARIO:Usuario = {
      name: this.usuarioForm.get('name')?.value,
      email: this.usuarioForm.get('email')?.value,
      password: this.usuarioForm.get('password')?.value,
    }

    if(this.id !== null){
      // Editamos Usuario
      this.authService.editarUsuario(this.id,USUARIO).subscribe(data =>{
        this.toastr.info('El usuario fue actualizado con exito', 'Usuario Actualizado!');
        this.router.navigate(['/auth/users']);
      }, error =>{
        console.log(error);
        this.usuarioForm.reset();
      })
    }else{
      // Agregamos Usuario
        this.authService.register(USUARIO).subscribe(data =>{
        this.toastr.success('El usuario fue registrado con exito', 'Usuario Registrado!');
        this.router.navigate(['/auth/users']);
        }, error =>{
        console.log(error);
        this.usuarioForm.reset();
      })
    }

  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Usuario';
      this.usuarioForm.controls['email'].disable();
      this.authService.obtenerUsuario(this.id).subscribe(data =>{
        this.usuarioForm.setValue({
          name: data.name,
            email: data.email,
            password: data.password
        })

     })
    }

  }

}
