import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CoreModule} from "../Core/core.module";
import {ShiftsModule} from "../Feature/shifts/shifts.module";
import {RouterOutlet} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    CoreModule,
    RouterOutlet,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
