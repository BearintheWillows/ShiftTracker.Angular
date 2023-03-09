import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../Root/services/authentication.service";
import {IUserForRegistrationDto} from "../../_interfaces/user/IUserForRegistrationDto";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthValidators} from "../../../../Shared/Validators/auth/auth-validators";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean = false;
  constructor(
    private fb: FormBuilder,
    private accountService: AuthenticationService,
    private router: Router
  ){
  this.registerForm = this.fb.group({
    firstName      : [''],
    lastName       : [''],
    username       : ['', [Validators.required]],
    email          : ['', [Validators.required, Validators.email]],
    password       : ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });
    this.confirmPassword?.setValidators(AuthValidators.validateConfirmPassword(<AbstractControl>this.password));

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

    this.accountService.registerUser("accounts/register", user)
      .subscribe({
        next : () => this.router.navigate(['/auth/login']),
        error: (err: HttpErrorResponse) =>{
          this.showError = true;
          console.log(err);
          this.errorMessage = err.message;
        }
      })
  }

  public get username() {
    return this.registerForm.get('username');
  }

  public get email() {
    return this.registerForm.get('email');
  }

  public get password() {
    return this.registerForm.get('password');
  }

  public get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  public get firstName() {
    return this.registerForm.get('firstName');
  }

  public get lastName() {
    return this.registerForm.get('lastName');
  }

}
