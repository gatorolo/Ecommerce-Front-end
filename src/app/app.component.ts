import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from './modelos/login-usuario';
import { AuthService } from './servicios/authService';
import { TokenService } from './servicios/token.servive';
import {faInstagram, faFacebookF, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faInstagram = faInstagram;
  faFacebookF = faFacebookF;
  faWhatsapp = faWhatsapp;
  faTwitter = faTwitter;


  isLogged = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;

  constructor(private tokenService: TokenService, router: Router){}
 

  ngOninit():void{
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else {
      this.isLogged = false;
    }
  }
}
