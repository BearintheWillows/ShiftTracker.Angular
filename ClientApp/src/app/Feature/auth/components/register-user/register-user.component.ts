import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../Root/services/authentication.service";
import {IUserForRegistrationDto} from "../../_interfaces/user/IUserForRegistrationDto";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    firstName      : [''],
    lastName       : [''],
    username       : ['', Validators.required],
    email          : ['', [Validators.required, Validators.email]],
    password       : ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private accountService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

  }

  public validateControl(controlName: string) {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched;
  }

  public hasError(controlName: string, errorName: string) {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  public registerUser(registerFormValue: any) {
    const formValues = {...registerFormValue};

    const user: IUserForRegistrationDto = {
      firstName      : formValues.firstName,
      lastName       : formValues.lastName,
      email          : formValues.email,
      userName       : formValues.username,
      password       : formValues.password,
      confirmPassword: formValues.confirmPassword
    };

    this.accountService.register("accounts/register", user)
      .subscribe({
        next : () => console.log("User registered"),
        error: (err: HttpErrorResponse) => console.log(err.error.errors)
      });

  }
}
