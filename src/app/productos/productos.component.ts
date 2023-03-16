import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Productos } from '../models/productos';
import { ProductosService } from '../servicios/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

    public productos:Productos[]=[];

  constructor(private productoService: ProductosService ) { }

  ngOnInit(): void {
   this.getProductos();
  }

  public getProductos():void {
    this,this.productoService.getproductos().subscribe({
        next:(Response:Productos[]) => {
        this.productos=Response;
        },
        error:(error:HttpErrorResponse) => {
            alert(error.message);
        }
    })
  }

 

}
