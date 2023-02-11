import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ShiftsComponent} from "../shifts/shifts.component";
import {ShiftsHomePageComponent} from "../shifts/pages/shifts-home-page/shifts-home-page.component";
import {ShiftsCreatePageComponent} from "../shifts/pages/shifts-create-page/shifts-create-page.component";
import {ShiftsEditPageComponent} from "../shifts/pages/shifts-edit-page/shifts-edit-page.component";
import {ShiftsDetailPageComponent} from "../shifts/pages/shifts-detail-page/shifts-detail-page.component";
import {RunsComponent} from "./runs.component";

const RunsRoutes: Routes = [
  { path: 'runs',
    component: RunsComponent,
    children: [

    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(RunsRoutes)
  ]
})
export class RunsRoutingModule { }
