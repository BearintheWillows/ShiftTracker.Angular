import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnChanges{
  title = 'ShiftTracker';

  isLoggedIn$: Observable<boolean> = new Observable<boolean>();
  isAdmin$: Observable<boolean> = new Observable<boolean>();

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {

    this.isLoggedIn$ = this.authService.isAuthenticated$;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isLoggedIn$']){
    console.log();
  }}

}
