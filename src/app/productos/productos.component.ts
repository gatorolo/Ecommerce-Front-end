import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Productos } from '../models/productos';
import { ProductosService } from '../servicios/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  public productos: Productos[] = [];
  searchKey:string = "";

  constructor(private producto: ProductosService) {}

  ngOnInit(): void {
    this.getProductos();
    this.producto.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }

  public getProductos(): void {
    this,
      this.producto.getproductos().subscribe({
        next: (Response: Productos[]) => {
          this.productos = Response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      });
  }

  aum(producto: any) {
    if (producto.cantidad != 9) {
      producto.cantidad += 1;
    }
  }

  dec(producto: any) {
    if (producto.cantidad != 1) {
      producto.cantidad -= 1;
    }
  }

  itemsCart: any = [];
  
  addCart(category: any) {
    let cartDataNull = localStorage.getItem('localCart');
    if (cartDataNull == null) {
      let storeDataGet: any = [];
      storeDataGet.push(category);
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    } else {
      var id = category.id;
      let index: number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart')!);
      for (let i = 0; i < this.itemsCart.length; i++) {
        if (parseInt(id) === parseInt(this.itemsCart[i].id)) {
          this.itemsCart[i].cantidad = category.cantidad;
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemsCart.push(category);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      } else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumberFunc();
  }

  cartNumber: number = 0;
  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('localCart')!);
    this.cartNumber = cartValue.length;
    this.producto.cartSubject.next(this.cartNumber);
  }
}
