import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShiftsComponent} from "./shifts/shifts.component";
import {RouterModule, Routes} from "@angular/router";
import {RunsComponent} from "./runs/runs.component";
import {ShopsComponent} from "./shops/shops.component";
import {ShiftDetailComponent} from "./shifts/shift-detail/shift-detail.component";

const routes: Routes = [
  { path: 'shifts', component: ShiftsComponent },
  { path: 'shifts/:id', component: ShiftDetailComponent},
  { path: 'runs', component: RunsComponent },
  { path: 'shops', component: ShopsComponent },
  { path: '', redirectTo: '/shifts', pathMatch: 'full' },
  ];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
