import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{
  title = 'ShiftTracker';

  isLoggedIn: "" | boolean = false;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserAuthenticated();
  }

}
