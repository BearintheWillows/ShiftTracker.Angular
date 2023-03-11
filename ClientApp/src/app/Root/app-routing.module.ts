import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ShiftsRoutingModule} from "../Feature/shifts/shifts.routing.module";
import {PrivacyComponent} from "../Core/components/privacy/privacy.component";
import {ForbiddenComponent} from "../Core/components/forbidden/forbidden.component";
import {AuthGuard} from "../Shared/guards/auth.guard";
import {AdminGuard} from "../Shared/guards/admin.guard";
import {HomeComponent} from "../Core/components/home/home.component";

const routes: Routes = [
  { path: 'privacy', component: PrivacyComponent,
  canActivate: [AuthGuard, AdminGuard]},
  { path: 'forbidden', component: ForbiddenComponent},
  { path: '', redirectTo: '', pathMatch: 'full', component: HomeComponent },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {enableTracing: false}),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
