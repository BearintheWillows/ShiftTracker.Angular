import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ShiftsEditFormComponent} from "./components/shifts-edit-form/shifts-edit-form.component";
import {ShiftsCreatePageComponent} from "./pages/shifts-create-page/shifts-create-page.component";
import {ShiftsComponent} from "./shifts.component";
import {ShiftsDetailCardComponent} from "./components/shifts-detail-card/shifts-detail-card.component";
import {ShiftsHomePageComponent} from "./pages/shifts-home-page/shifts-home-page.component";

const routes: Routes = [
  { path: 'shifts',
    component: ShiftsComponent,
    children: [
      {
        path: ':id', component: ShiftsHomePageComponent }
      ]

  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShiftsRoutingModule { }
