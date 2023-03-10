import {NgModule, Optional, SkipSelf} from '@angular/core';

import {NavComponent} from "./components/nav/nav.component";
import {SharedModule} from "../Shared/shared.module";
import { FooterComponent } from './components/footer/footer.component';
import { PrivacyComponent } from './components/privacy/privacy.component';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    PrivacyComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    NavComponent,
    FooterComponent,
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
