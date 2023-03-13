import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../Root/services/authentication.service";

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent {
  private returnUrl: string = '';

  constructor( private router: Router, private route: ActivatedRoute, private authService: AuthenticationService){
  }

  ngOnInit(): void {
    this.returnUrl= this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public navigateToLogin(): void {
    this.authService.logoutUser();
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.returnUrl}});
  }
}
