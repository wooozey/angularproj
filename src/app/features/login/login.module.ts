import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AuthenticationService } from 'src/app/services/authentication.service';



@NgModule({
  declarations: [LoginFormComponent, RegisterComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  exports: [LoginFormComponent],
  providers: [
    AuthenticationService
  ],
})
export class LoginModule { }
