import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../Root/services/authentication.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public isUserLoggedIn$: Observable<boolean> = new Observable<boolean>();

  constructor(private router: Router,
              private authService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.isUserLoggedIn$ = this.authService.authChange$;
  }

  public logout(): void {
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }

}
