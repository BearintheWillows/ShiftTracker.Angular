import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ShiftsComponent} from "../shifts/shifts.component";
import {ShiftsHomePageComponent} from "../shifts/pages/shifts-home-page/shifts-home-page.component";
import {ShiftsCreatePageComponent} from "../shifts/pages/shifts-create-page/shifts-create-page.component";
import {ShiftsEditPageComponent} from "../shifts/pages/shifts-edit-page/shifts-edit-page.component";
import {ShiftsDetailPageComponent} from "../shifts/pages/shifts-detail-page/shifts-detail-page.component";
import {RunsComponent} from "./runs.component";
import {RunsHomePageComponent} from "./pages/runs-home-page/runs-home-page.component";
import {AuthGuard} from "../../Shared/guards/auth.guard";
import {AdminGuard} from "../../Shared/guards/admin.guard";

const RunsRoutes: Routes = [
  { path: 'runs',
    component: RunsComponent,
    children: [
      { path: '', component: RunsHomePageComponent },
    ],
    canActivate: [AuthGuard, AdminGuard]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(RunsRoutes)
  ]
})
export class RunsRoutingModule { }
