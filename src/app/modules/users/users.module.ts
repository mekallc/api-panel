import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoute } from '@module/users/users.routes';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';



@NgModule({
  declarations: [
    SignInComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    UsersRoute,
    CommonModule,
  ]
})
export class UsersModule { }
