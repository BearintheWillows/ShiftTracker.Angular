import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShiftsCreateFormComponent} from "./components/shifts-create-form/shifts-create-form.component";
import {ShiftsCreatePageComponent} from "./pages/shifts-create-page/shifts-create-page.component";
import {ShiftsListTableComponent} from "./components/shifts-list-table/shifts-list-table.component";
import {ShiftsComponent} from "./shifts.component";
import {ShiftsEditFormComponent} from "./components/shifts-edit-form/shifts-edit-form.component";
import {ShiftsDetailCardComponent} from "./components/shifts-detail-card/shifts-detail-card.component";
import { ShiftsHomePageComponent } from './pages/shifts-home-page/shifts-home-page.component';
import {RouterOutlet} from "@angular/router";
import {ShiftService} from "../../Root/services/shift.service";
import {RunService} from "../../Root/services/run.service";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ShiftsCreateFormComponent,
    ShiftsDetailCardComponent,
    ShiftsEditFormComponent,
    ShiftsComponent,
    ShiftsCreatePageComponent,
    ShiftsListTableComponent,
    ShiftsHomePageComponent,

  ],
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
  ],
  providers:[
    ShiftService,
    RunService
  ]
})
export class ShiftsModule { }
