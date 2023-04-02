import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faFacebookF, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faInstagram,  faTwitter } from '@fortawesome/free-brands-svg-icons'
import { LoginUsuario } from '../modelos/login-usuario';
import { Social } from '../modelos/social';
import { AuthService } from '../servicios/authService';
import { SocialService } from '../servicios/social.service';
import { TokenService } from '../servicios/token.servive';



@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  faFacebookF = faFacebookF;
  faWhatsapp = faWhatsapp;
  faInstagram = faInstagram;
  faTwitter = faTwitter;


  public socials: Social[]=[];
  public social= this.socialService.getSocial();
  public editSocial : Social | undefined;
  public deleteSocial: Social | undefined;
   
 

  isLogged = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;
  

  constructor( private socialService: SocialService, private router:Router, private tokenService: TokenService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getSocial();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else {
      this.isLogged = false;
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
     this.authService
      .login(this.loginUsuario).subscribe( data => {
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['']);
        this.isLogged = true;
       
      }, error =>{
        this.isLogged= false;
        this.errMsj = error.error.mensaje;
      
      })
  }

  onLogOut():void {
    this.tokenService.logOut();
    window.location.reload();
  }

  login(){
    this.router.navigate(['/paginas/login']);
    this.isLogged = true;
  }

  public getSocial():void{
    this.socialService.getSocial().subscribe({
      next:(Response: Social[])=>{
        this.socials=Response;
      },
      error:(error: HttpErrorResponse) =>{
        alert(error.message);
     }
    })
  }
   //modal
  public onOpenModal(mode: string, social?: Social): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSocialModal');
    } else if (mode === 'delete') {
      this.deleteSocial = social;
      button.setAttribute('data-target', '#deleteSocialModal');
    } else if (mode === 'edit') {
      this.editSocial = social;
      button.setAttribute('data-target', '#editSocialModal');
    }

    container?.appendChild(button);
    button.click();
  }

public onAddSocial(addForm: NgForm): void {
  document.getElementById('add-social-form')?.click();
  this.socialService.addSocial(addForm.value).subscribe({
    next: (response: Social) => {
      console.log(response);
      this.getSocial();
      addForm.reset();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    },
  });
}

public onUpdateSocial(social: Social){
  this.editSocial=social;
  document.getElementById('add-social-form')?.click();
  this.socialService.updateSocial(social).subscribe({
    next: (Response:Social) =>{
      console.log(Response);
      this.getSocial();
      
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }

  })
}

public onDeleteSocial(idSoc:number):void{
this.socialService.deleteSocial(idSoc).subscribe({
    next: (response:void) =>{
      console.log(Response);
      this.getSocial();
      
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }

  })
}

  
}
