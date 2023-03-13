import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnChanges{
  title = 'ShiftTracker';

<<<<<<< HEAD
  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  isAdmin$: Observable<boolean> = new Observable<boolean>();
=======
  isLoggedIn: "" | boolean = false;
>>>>>>> main

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
<<<<<<< HEAD

    this.isLoggedIn$ = this.authService.isAuthenticated$;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isLoggedIn$']){
    console.log();
  }}

=======
    this.isLoggedIn = this.authService.isUserAuthenticated();
  }

>>>>>>> main
}
