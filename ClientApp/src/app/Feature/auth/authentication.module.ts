import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import {SharedModule} from "../../Shared/shared.module";
import {AuthenticationRoutingModule} from "./authentication.routing.module";
import { LoginUserComponent } from './components/login-user/login-user.component';



@NgModule({
  declarations: [
    AuthenticationComponent,
    RegisterUserComponent,
    LoginUserComponent
  ],
  imports: [
    SharedModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
