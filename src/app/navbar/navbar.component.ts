import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../servicios/productos.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenService } from '../servicios/token.servive';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public searchTerm !:string;
  isLogged = false;

  constructor(private tokenService: TokenService ,private producto: ProductosService, private router: Router) {
    this.producto.cartSubject.subscribe((data) => {
      this.cartItem = data;
    })
   }

  ngOnInit(): void {
    this.cartItemFunc();
    if(this.tokenService.getToken()) {
      this.isLogged = true;
    }else {
      this.isLogged = false;
    }
  } 
  
  onLogOut():void {
    this.tokenService.logOut();
    window.location.reload();
    this.router.navigate([''])
  }

  login() {
    this.router.navigate(['home'])
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
    swal.fire({
    title: 'Nada para Comprar',
    text: 'CARRITO VACIO',
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



