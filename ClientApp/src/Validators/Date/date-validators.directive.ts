import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from "@angular/forms";
import {ShiftService} from "../../services/shiftService/shift.service";
import {map} from "rxjs";

export class DateValidators {
  static IsDateInFuture(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = new Date(control.value);
      const today = new Date()
      const isFuture = date > today;
      return isFuture ? {notInFuture: {value: control.value}} : null;
    };
  }
  static IsDateAlreadyUsed(shiftService: ShiftService): AsyncValidatorFn
    {
      return (control: AbstractControl) => {
          return shiftService.checkIfDateIsUsed(control.value)
            .pipe(map(res => res ? { dateAlreadyUsed: true } : null));
      };
    }

}
