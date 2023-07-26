import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { RegisterComponent } from './components/auth/register/register.component';


const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {path: 'listar', component:ListarProductosComponent},
  {path: 'crear-producto', component:CrearProductoComponent},
  {path: 'editar-producto/:id', component:CrearProductoComponent},
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
  {path: 'editar-usuario/:id', component:RegisterComponent},
//  { path: 'usuario', loadChildren: () => import('./usuario-routing.module').then(m => m.UsuarioRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

