import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunsRoutingModule } from './runs.routing.module';
import { RunsComponent } from './runs.component';
import {RouterOutlet} from "@angular/router";
import {SharedModule} from "../../Shared/shared.module";



@NgModule({
  declarations: [
    RunsComponent
  ],
  imports: [
    SharedModule,
    RunsRoutingModule,

  ]
})
export class RunsModule { }
