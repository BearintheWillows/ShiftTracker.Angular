import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUserForRegistrationDto} from "../../Feature/auth/_interfaces/user/IUserForRegistrationDto";
import {IRegistrationResponseDto} from "../../Feature/auth/_interfaces/response/IRegistrationResponseDto";
import {EnvironmentUrlService} from "./environment-url.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              private envUrl: EnvironmentUrlService) { }

  public registerUser(route: string, user: IUserForRegistrationDto) {
    return this.http.post<IRegistrationResponseDto>(this.createCompleteRoute(route, this.envUrl.urlAddress), user);
  }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  public register(route: string, user: IUserForRegistrationDto) {
    return this.http.post<IRegistrationResponseDto>(this.createCompleteRoute(route, this.envUrl.urlAddress), user);
  }
}
