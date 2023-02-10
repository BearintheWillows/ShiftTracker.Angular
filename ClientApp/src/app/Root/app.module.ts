import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CoreModule} from "../Core/core.module";
import {ShiftsModule} from "../Feature/shifts/shifts.module";
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {ModalModule} from "ngx-bootstrap/modal";
import {NavComponent} from "../Core/components/nav/nav.component";
import {ShiftsRoutingModule} from "../Feature/shifts/shifts.routing.module";
import {SharedModule} from "../Shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    CoreModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ShiftsModule,
    AppRoutingModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }