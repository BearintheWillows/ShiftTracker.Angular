import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CoreModule} from "../Core/core.module";
import {ShiftsModule} from "../Feature/shifts/shifts.module";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ModalModule} from "ngx-bootstrap/modal";
import {SharedModule} from "../Shared/shared.module";
import {RunsModule} from "../Feature/runs/runs.module";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {AuthenticationModule} from "../Feature/auth/authentication.module";
import {ErrorHandlerInterceptor} from "./services/error-handler.interceptor";
import {JwtModule} from "@auth0/angular-jwt";
import {AuthGuard} from "../Shared/guards/auth.guard";
import {AdminGuard} from "../Shared/guards/admin.guard";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    SharedModule,
    CoreModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AuthenticationModule,
    ShiftsModule,
    RunsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: ['localhost:7004'],
        disallowedRoutes: [],
      }
    }),
    AppRoutingModule,
  ],
  providers: [
    CollapseModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
