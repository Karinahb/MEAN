import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListarUsuariosComponent } from '../listar-usuarios/listar-usuarios.component';
import { PagoCanchaComponent } from '../pago-cancha/pago-cancha.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: ListarUsuariosComponent },
  { path: 'pichanga', component: PagoCanchaComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
