export class Producto{
  _id?:number;
  nombre:string;
  categoria:string;
  ubicacion:string;
  stock:number;
  precio:number;

  constructor(nombre:string,categoria:string,ubicacion:string,stock:number,precio:number){
    this.nombre = nombre;
    this.categoria = categoria;
    this.ubicacion = ubicacion;
    this.stock = stock;
    this.precio = precio;
  }
}
