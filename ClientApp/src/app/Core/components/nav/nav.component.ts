import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../Root/services/authentication.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public isUserLoggedIn: boolean = false;

  constructor(private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.authChange$.subscribe((isLoggedIn: boolean) => {
      this.isUserLoggedIn = isLoggedIn;
    });
  }

  public logout(): void {
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }

}
