import { NgModule } from '@angular/core';
import {ShiftsComponent} from "./shifts/shifts.component";
import {RouterModule, Routes} from "@angular/router";
import {RunsComponent} from "./runs/runs.component";
import {ShopsComponent} from "./shops/shops.component";
import {ShiftEditFormComponent} from "./shifts/shift-edit-form/shift-edit-form.component";
import {ShiftDetailComponent} from "./shifts/shift-detail/shift-detail.component";
import {ShiftCreateFormComponent} from "./shifts/shift-create-form/shift-create-form.component";

const routes: Routes = [
  { path: 'shifts', component: ShiftsComponent },
  { path: 'shifts/:id/edit', component: ShiftEditFormComponent},
  { path: 'shifts/:id/detail', component: ShiftDetailComponent},
  { path: 'shifts/create', component: ShiftCreateFormComponent},
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
