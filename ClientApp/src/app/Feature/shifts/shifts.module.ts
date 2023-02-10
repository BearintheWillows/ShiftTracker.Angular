import { NgModule } from '@angular/core';
import {ShiftsCreatePageComponent} from "./pages/shifts-create-page/shifts-create-page.component";
import {ShiftsListTableComponent} from "./components/shifts-list-table/shifts-list-table.component";
import {ShiftsComponent} from "./shifts.component";
import {ShiftsEditFormComponent} from "./components/shifts-edit-form/shifts-edit-form.component";
import {ShiftsDetailCardComponent} from "./components/shifts-detail-card/shifts-detail-card.component";
import { ShiftsHomePageComponent } from './pages/shifts-home-page/shifts-home-page.component';
import {SharedModule} from "../../Shared/shared.module";
import {ConfirmModalComponent} from "../../Shared/components/modals/confirmModal/confirm-modal.component";
import {RouterLink} from "@angular/router";
import {ShiftsRoutingModule} from "./shifts.routing.module";

@NgModule({
  declarations: [
    ShiftsDetailCardComponent,
    ShiftsEditFormComponent,
    ShiftsComponent,
    ShiftsCreatePageComponent,
    ShiftsListTableComponent,
    ShiftsHomePageComponent,

  ],
  imports: [
    SharedModule,
    ShiftsRoutingModule
  ],
  providers:[
  ],
  exports: [



  ]
})
export class ShiftsModule {

}
