import { NgModule } from '@angular/core';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'users', component: ListarUsuariosComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
