import {AbstractControl, ValidatorFn} from "@angular/forms";

export class AuthValidators {

  public static validateConfirmPassword(passwordControl: AbstractControl): ValidatorFn {
    return (confirmPasswordControl: AbstractControl): {[key: string]: any} | null => {

      if(!passwordControl || !confirmPasswordControl) return null;
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
      return password === confirmPassword ? null : {passwordsNotMatch: true};
    };
  }


}
