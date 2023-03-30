import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../servicios/productos.service';
import swal from 'sweetalert';
import { Router, Routes } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public searchTerm !:string;

  constructor(private producto: ProductosService, private router: Router) {
    this.producto.cartSubject.subscribe((data) => {
      this.cartItem = data;
    })
   }

  ngOnInit(): void {
    this.cartItemFunc();
  } 
  
 cartItem:number = 0;
 cartItemFunc() {
  if(localStorage.getItem('localCart') != null) {
    var cartCount = JSON.parse(localStorage.getItem('localCart')!);
    this.cartItem = cartCount.length;
  }
 }

 showModal() {
  if(this.cartItem === 0) {
    swal({
    title: 'error',
    text: '"CARRITO VACIO"',
    icon: "error",
   });
  this.router.navigate(['productos']);
  }else {
    this.router.navigate(['cart']);
  }
}

search(event:any) {
  this.searchTerm = (event.target as HTMLInputElement).value;
  console.log(this.searchTerm)
  this.producto.search.next(this.searchTerm);
  this.router.navigate(['productos']);
}
}



