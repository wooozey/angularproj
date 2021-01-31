import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router, private authService: AuthenticationService) { }
  visibleButtons: boolean = false;
  isAdmin = false;
  ngOnInit(): void {
   
    this.auth.user.subscribe(user => {
      if (user != null) {
        this.visibleButtons = true;
      } else {
        this.visibleButtons = false;
        this.isAdmin = false;
      }
    })
    this.authService.isAdmin.subscribe(isAdmin => {
      this.isAdmin = isAdmin
    })
    
  }

  onLogoClicked(): void {
    if (this.visibleButtons) {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['login']);
    }

  }
  onLogout(): void {
    this.authService.logoutUser();
  }
  onAddGame(): void {
    this.router.navigate(['addgame']);
  }
}
