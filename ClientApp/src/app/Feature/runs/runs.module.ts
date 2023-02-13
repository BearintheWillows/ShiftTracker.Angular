import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunsRoutingModule } from './runs.routing.module';
import { RunsComponent } from './runs.component';
import {RouterOutlet} from "@angular/router";
import {SharedModule} from "../../Shared/shared.module";
import { RunsHomePageComponent } from './pages/runs-home-page/runs-home-page.component';
import { RunSelectorComponent } from './components/run-selector/run-selector.component';
import {RunDetailsComponent} from "./components/run-details/run-details.component";


@NgModule({
  declarations: [
    RunsComponent,
    RunsHomePageComponent,
    RunSelectorComponent,
    RunDetailsComponent
  ],
  imports: [
    SharedModule,
    RunsRoutingModule,

  ]
})
export class RunsModule { }
