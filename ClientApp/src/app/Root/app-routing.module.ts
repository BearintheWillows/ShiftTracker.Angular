import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ShiftsRoutingModule} from "../Feature/shifts/shifts.routing.module";

const routes: Routes = [
  { path: '', redirectTo: '/shifts', pathMatch: 'full' },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {enableTracing: false}),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }