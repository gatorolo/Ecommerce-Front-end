import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../servicios/productos.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  router: any;

  constructor(private producto: ProductosService, router: Router) { }

  ngOnInit(): void {
    this.cartDetails();
    this.totalCart();
  }

  getCartDetails:any = [];
  cartDetails() {
    if(localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!) ;
      console.log(this.getCartDetails)
      
    }
  }

  total:number = 0;
  totalCart() {
    if(localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
      this.total = this.getCartDetails.reduce((acc:any ,val:any) => acc + (val.precio * val.cantidad), 0);
    }
  }

  removeall() {
    localStorage.removeItem('localCart');
    this.getCartDetails = [];
    this.total = 0;
    this.cartNumber = 0;
    this.producto.cartSubject.next(this.cartNumber);
  }

   singleDelete(getcartDetail:number) {
     if(localStorage.getItem('localCart')) {
       this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
       for(let i=0; i < this.getCartDetails.length; i++) {
         if (this.getCartDetails[i].id === getcartDetail) {
          this.getCartDetails.splice(i, 1);
          localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
          this.totalCart();
          this.cartNumberFunc();
         }
       }
     }
  }
  

  cartNumber: number = 0;
  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('localCart')!);
    this.cartNumber = cartValue.length;
    this.producto.cartSubject.next(this.cartNumber);
  }

  
}
