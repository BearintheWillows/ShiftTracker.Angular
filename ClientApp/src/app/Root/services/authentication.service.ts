import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUserForRegistrationDto} from "../../Feature/auth/_interfaces/user/IUserForRegistrationDto";
import {IRegistrationResponseDto} from "../../Feature/auth/_interfaces/response/IRegistrationResponseDto";
import {EnvironmentUrlService} from "./environment-url.service";
import {IUserForAuthenticationDto} from "../../Feature/auth/_interfaces/user/IUserForAuthenticationDto";
import {IAuthResponseDto} from "../../Feature/auth/_interfaces/response/IAuthResponseDto";
import {BehaviorSubject, Subject} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              private envUrl: EnvironmentUrlService,
              private jwtHelper: JwtHelperService,) { }

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticated.asObservable();


  public isUserAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if(token && !this.jwtHelper.isTokenExpired(token)) {
      console.log("User is authenticated");
      this.sendAuthStateChangeNotification(true);
      return true;
    } else {
      console.log("User is not authenticated");
      this.sendAuthStateChangeNotification(false);
      return false;
    }
  }

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem("token");
    if(token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      return role === 'Admin';
    } else {
      return false;
    }
  }

  public registerUser(route: string, user: IUserForRegistrationDto) {
    return this.http.post<IRegistrationResponseDto>(this.createCompleteRoute(route, this.envUrl.urlAddress), user);
  }

  public loginUser(route: string, user: IUserForAuthenticationDto) {

    return this.http.post<IAuthResponseDto>(this.createCompleteRoute(route, this.envUrl.urlAddress), user);
  }

  public logoutUser() {
    localStorage.removeItem('token');
    this.sendAuthStateChangeNotification(false);
  }

  public sendAuthStateChangeNotification(isLoggedIn: boolean) {
    this.isAuthenticated.next(isLoggedIn);
  }



  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }
}
