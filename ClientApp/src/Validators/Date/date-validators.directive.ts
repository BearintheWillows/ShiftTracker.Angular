import {AbstractControl, ValidatorFn} from "@angular/forms";
import {ShiftService} from "../../services/shiftService/shift.service";


export function NotInFutureValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const date = new Date(control.value);
    const today = new Date();
    const isFuture = date > today;
    return isFuture ? {notInFuture: {value: control.value}} : null;
  };
}

export function DateAlreadyUsedValidator(shiftService: ShiftService): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return new Promise((resolve) => {
      const date = control.value;
      shiftService.checkIfDateIsUsed(date).subscribe((resp: boolean) => {
        resolve(resp ? {dateAlreadyUsed: {value: control.value}} : null);
      });
    });
  }
}


