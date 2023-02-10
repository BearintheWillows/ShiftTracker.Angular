import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ShiftsCreatePageComponent} from "./pages/shifts-create-page/shifts-create-page.component";
import {ShiftsComponent} from "./shifts.component";
import {ShiftsHomePageComponent} from "./pages/shifts-home-page/shifts-home-page.component";
import {ShiftsEditPageComponent} from "./pages/shifts-edit-page/shifts-edit-page.component";
import {ShiftsDetailPageComponent} from "./pages/shifts-detail-page/shifts-detail-page.component";

const ShiftsRoutes: Routes = [
  { path: 'shifts',
    component: ShiftsComponent,
    children: [
      {
        path: '', component: ShiftsHomePageComponent
      },
      {

        path: 'create', component: ShiftsCreatePageComponent
      },
      {
        path: 'edit/:id', component: ShiftsEditPageComponent
      },
      {
        path: 'detail/:id', component: ShiftsDetailPageComponent
      },
        ]
      },
    ]
@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(ShiftsRoutes)
  ],
  exports: [RouterModule]
})
export class ShiftsRoutingModule { }
