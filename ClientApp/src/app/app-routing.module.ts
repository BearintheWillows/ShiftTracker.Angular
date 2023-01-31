import { NgModule } from '@angular/core';
import {ShiftsComponent} from "./shifts/shifts.component";
import {RouterModule, Routes} from "@angular/router";
import {RunsComponent} from "./runs/runs.component";
import {ShopsComponent} from "./shops/shops.component";
import {ShiftEditReactiveComponent} from "./shifts/shift-edit-reactive/shift-edit-reactive.component";

const routes: Routes = [
  { path: 'shifts', component: ShiftsComponent },
  { path: 'shifts/:id/edit', component: ShiftEditReactiveComponent},
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
