import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
productoForm: FormGroup;
titulo = 'Crear Producto';
id:string;
  constructor(private fb:FormBuilder,
              private router:Router,
              private toastr: ToastrService,
              private _productoService: ProductoService,
              private aRouter:ActivatedRoute){
    this.productoForm=this.fb.group({
      producto:['',Validators.required],
      categoria:['',Validators.required],
      ubicacion:['',Validators.required],
      stock:['',Validators.required],
      precio:['',Validators.required],
    })
    this.id = aRouter.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    const PRODUCTO:Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      stock:this.productoForm.get('stock')?.value,
      precio: this.productoForm.get('precio')?.value
    }

    if(this.id !== null){
      // Editamos Producto
      this._productoService.editarProducto(this.id,PRODUCTO).subscribe(data =>{
        this.toastr.info('El producto fue actualizado con exito', 'Producto Actualizado!');
        this.router.navigate(['/listar']);
      }, error =>{
        console.log(error);
        this.productoForm.reset();
      })
    }else{
      // Agregamos Producto
        this._productoService.saveProducto(PRODUCTO).subscribe(data =>{
        this.toastr.success('El producto fue registrado con exito', 'Producto Registrado!');
        this.router.navigate(['/listar']);
        }, error =>{
        console.log(error);
        this.productoForm.reset();
      })
    }

  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Producto';
      this._productoService.obtenerProducto(this.id).subscribe(data =>{
        this.productoForm.setValue({
            producto: data.nombre,
            categoria: data.categoria,
            ubicacion: data.ubicacion,
            stock: data.stock,
            precio: data.precio
        })
      })
    }

  }

}
