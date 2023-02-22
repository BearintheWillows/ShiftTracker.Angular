import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunsRoutingModule } from './runs.routing.module';
import { RunsComponent } from './runs.component';
import {RouterOutlet} from "@angular/router";
import {SharedModule} from "../../Shared/shared.module";
import { RunsHomePageComponent } from './pages/runs-home-page/runs-home-page.component';
import { RunSelectorComponent } from './components/run-selector/run-selector.component';
import {RunDetailsComponent} from "./components/run-details/run-details.component";
import { DailyRouteNavComponent } from './components/daily-route-nav/daily-route-nav.component';
import { DailyRouteShopListComponent } from './components/daily-route-shop-list/daily-route-shop-list.component';
import { RunCreateModalComponent } from './components/run-create-modal/run-create-modal.component';
import { RunAddShopModalComponent } from './components/run-add-shop-modal/run-add-shop-modal.component';


@NgModule({
  declarations: [
    RunsComponent,
    RunsHomePageComponent,
    RunSelectorComponent,
    RunDetailsComponent,
    DailyRouteNavComponent,
    DailyRouteShopListComponent,
    RunCreateModalComponent,
    RunAddShopModalComponent,
  ],
  imports: [
    SharedModule,
    RunsRoutingModule,

  ]
})
export class RunsModule { }
