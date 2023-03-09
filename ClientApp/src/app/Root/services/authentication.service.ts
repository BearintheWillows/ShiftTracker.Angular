import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUserForRegistrationDto} from "../../Feature/auth/_interfaces/user/IUserForRegistrationDto";
import {IRegistrationResponseDto} from "../../Feature/auth/_interfaces/response/IRegistrationResponseDto";
import {EnvironmentUrlService} from "./environment-url.service";
import {IUserForAuthenticationDto} from "../../Feature/auth/_interfaces/user/IUserForAuthenticationDto";
import {IAuthResponseDto} from "../../Feature/auth/_interfaces/response/IAuthResponseDto";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              private envUrl: EnvironmentUrlService) { }

  private authChangeSub = new Subject<boolean>();
  public authChange$ = this.authChangeSub.asObservable();

  public registerUser(route: string, user: IUserForRegistrationDto) {
    return this.http.post<IRegistrationResponseDto>(this.createCompleteRoute(route, this.envUrl.urlAddress), user);
  }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  public loginUser(route: string, user: IUserForAuthenticationDto) {
    return this.http.post<IAuthResponseDto>(this.createCompleteRoute(route, this.envUrl.urlAddress), user);
  }

  public logoutUser() {
    localStorage.removeItem('token');
    this.sendAuthStateChangeNotification(false);
  }

  public sendAuthStateChangeNotification(isLoggedIn: boolean) {
    this.authChangeSub.next(isLoggedIn);
  }

}
