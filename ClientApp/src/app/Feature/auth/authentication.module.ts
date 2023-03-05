import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import {SharedModule} from "../../Shared/shared.module";
import {AuthenticationRoutingModule} from "./authentication.routing.module";



@NgModule({
  declarations: [
    AuthenticationComponent,
    RegisterUserComponent
  ],
  imports: [
    SharedModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
