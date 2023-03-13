import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RunsComponent} from "../runs/runs.component";
import {RunsHomePageComponent} from "../runs/pages/runs-home-page/runs-home-page.component";
import {AuthenticationComponent} from "./authentication.component";
import {RegisterUserComponent} from "./components/register-user/register-user.component";
import {LoginUserComponent} from "./components/login-user/login-user.component";
import {UnAuthGuard} from "../../Shared/guards/un-auth-guard.service";

const AuthRoutes: Routes = [
  { path: 'auth',
    component: AuthenticationComponent,
    children: [
      { path: 'register', component: RegisterUserComponent},
      { path: 'login', component: LoginUserComponent}
    ],
    canActivate: [UnAuthGuard]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(AuthRoutes)
  ]
})
export class AuthenticationRoutingModule { }
