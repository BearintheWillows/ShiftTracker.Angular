import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ShiftsEditFormComponent} from "./components/edit-form-shift/shifts-edit-form.component";
import {ShiftsCreatePageComponent} from "./pages/shifts-create-page/shifts-create-page/shifts-create-page.component";
import {ShiftsComponent} from "./shifts.component";

const routes: Routes = [
  { path: 'shifts', component: ShiftsComponent },
  { path: 'shifts/:id/edit', component: ShiftsEditFormComponent},
  { path: 'shifts/:id/detail', component: Shifts},
  { path: 'shifts/create', component: ShiftsCreatePageComponent},s
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShiftsRoutingModule { }
