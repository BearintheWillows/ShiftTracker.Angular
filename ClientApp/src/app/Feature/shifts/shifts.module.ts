import { NgModule } from '@angular/core';
import {ShiftsCreatePageComponent} from "./pages/shifts-create-page/shifts-create-page.component";
import {ShiftsListTableComponent} from "./components/shifts-list-table/shifts-list-table.component";
import {ShiftsComponent} from "./shifts.component";
import {ShiftsDetailCardComponent} from "./components/shifts-detail-card/shifts-detail-card.component";
import { ShiftsHomePageComponent } from './pages/shifts-home-page/shifts-home-page.component';
import {SharedModule} from "../../Shared/shared.module";
import {ShiftsRoutingModule} from "./shifts.routing.module";
import { ShiftsEditPageComponent } from './pages/shifts-edit-page/shifts-edit-page.component';
import { ShiftsDetailPageComponent } from './pages/shifts-detail-page/shifts-detail-page.component';

@NgModule({
  declarations: [
    ShiftsDetailCardComponent,
    ShiftsComponent,
    ShiftsCreatePageComponent,
    ShiftsListTableComponent,
    ShiftsHomePageComponent,
    ShiftsEditPageComponent,
    ShiftsDetailPageComponent,

  ],
  imports: [
    SharedModule,
    ShiftsRoutingModule
  ],
  providers:[],
  exports: []
})
export class ShiftsModule {

}
