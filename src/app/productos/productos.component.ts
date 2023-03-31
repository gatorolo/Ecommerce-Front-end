import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from '../modelos/login-usuario';
import { Productos } from 'src/app/models/productos';
import { AuthService } from '../servicios/authService';
import { ProductosService } from '../servicios/productos.service';
import { TokenService } from '../servicios/token.servive';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  public productos: Productos[] = [];
  searchKey:string = "";

  public updateProducto: Productos | undefined;
  public deleteProducto: Productos | undefined;
  public addProducto: Productos | undefined;

  islogged = false;
  isloggingFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;
  

  constructor(private productoService: ProductosService, private tokenService: TokenService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getProductos();
    this.productoService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
    if(this.tokenService.getToken()) {
      this.islogged = true;
      this.isloggingFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
     this.authService
      .login(this.loginUsuario).subscribe( data => {
        this.islogged = true;
        this.isloggingFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate([''])
      }, error =>{
        this.islogged = false;
        this.isloggingFail = true;
        this.errMsj = error.error.mensaje;
      
      })
  }

  public getProductos(): void {
      this.productoService.getproducto().subscribe({
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
    this.productoService.cartSubject.next(this.cartNumber);
  }

  
  public onOpenModal(mode: string, product?: Productos): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      this.addProducto = product;
      button.setAttribute('data-target', '#addProductoModal');
    } else if (mode === 'delete') {
      this.deleteProducto = product;
      button.setAttribute('data-target', '#deleteProductoModal');
    } else if (mode === 'edit') {
      this.updateProducto = product;
      button.setAttribute('data-target', '#updateProductoModal');
    }

    container?.appendChild(button);
    button.click();
  }

public onAddProducto(addForm: NgForm): void {
  document.getElementById('add-producto-form')?.click();
  this.productoService.addProducto(addForm.value).subscribe({
    next: (response: Productos) => {
      console.log(response);
      this.getProductos();
      addForm.reset();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    },
  });
}

public onUpdateProducto(product: Productos){
  this.updateProducto = product;
  document.getElementById('add-producto-form')?.click();
  this.productoService.updateProducto(product).subscribe({
    next: (Response:Productos) =>{
      console.log(Response);
      this.getProductos();
      
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }

  })
}

public onDeleteProducto(id:number):void{
this.productoService.deleteProducto(id).subscribe({
    next: (response:void) =>{
      console.log(Response);
      this.getProductos();
      
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }

  })
}

}
