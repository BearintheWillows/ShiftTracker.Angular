import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../Root/services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IAuthResponseDto} from "../../_interfaces/response/IAuthResponseDto";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {
  }

  private returnUrl: string = '';
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  errorMessage: string = '';
  showError: boolean = false;

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  validateControl(controlName: string) {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched;
  }

  hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  loginUser(loginFormValue: any) {
    const login = {...loginFormValue};

    const userForAuthentication = {
      email   : login.email,
      password: login.password
    };

    this.authService.loginUser("accounts/login", userForAuthentication)
      .subscribe({
        next : (res: IAuthResponseDto) => {

          localStorage.setItem('token', res.token);
          this.authService.sendAuthStateChangeNotification(res.isSuccessful);
          this.router.navigate([this.returnUrl || '/']);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.message;
          this.showError = true;
        }


      })
  }
}
