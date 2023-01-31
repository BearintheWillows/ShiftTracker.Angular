import {AbstractControl, ValidatorFn} from "@angular/forms";

export function NotInFutureValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const date = new Date(control.value);
    const today = new Date();
    const isFuture = date > today;
    return isFuture ? {notInFuture: {value: control.value}} : null;
  };
}
