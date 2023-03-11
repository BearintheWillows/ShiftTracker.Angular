import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'ShiftTracker';

  isLoggedIn$: Observable<boolean> = new Observable<boolean>();

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    if(this.authService.isUserAuthenticated()) {
      this.authService.sendAuthStateChangeNotification(true);
      this.isLoggedIn$ = this.authService.authChange$
    }
  }
}
