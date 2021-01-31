import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{

  private isAdmin = false;
  constructor(private authService: AuthenticationService, private router: Router) { 
    this.authService.isAdmin.subscribe(isAdmin=>{
      this.isAdmin = isAdmin;
    })
  }

  canActivate(): boolean {
    if(this.isAdmin){
      return this.isAdmin
    }else{
      this.router.navigate(['']);
      return this.isAdmin;
    }
   
  }
   
}
