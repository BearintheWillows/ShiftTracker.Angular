import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ShiftsRoutingModule} from "../Feature/shifts/shifts.routing.module";
import {PrivacyComponent} from "../Core/components/privacy/privacy.component";

const routes: Routes = [
  { path: 'privacy', component: PrivacyComponent },
{ path: '', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {enableTracing: false}),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
