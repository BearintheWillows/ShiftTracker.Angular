import {AbstractControl, FormGroup, ValidatorFn} from "@angular/forms";

export function ShiftTimesEqualShiftLength(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    let startTime: number = timeToMinutes(control.get('startTime')?.value);
    let endTime: number = timeToMinutes(control.get('endTime')?.value);
    let driveTime: number = timeToMinutes(control.get('driveTime')?.value);
    let workTime: number = timeToMinutes(control.get('workTime')?.value);
    let otherWorkTime: number = timeToMinutes(control.get('otherWorkTime')?.value);

    let shiftLength: number = endTime - startTime;
    let totalWorkTime: number = driveTime + workTime + otherWorkTime;

    let isShiftLengthEqualToTotalWorkTime = shiftLength === totalWorkTime;

    if(isShiftLengthEqualToTotalWorkTime) {
      return null;
    } else {
      return {shiftTimesEqualShiftLength: {value: control.value}};
    }
  }
}


function timeToMinutes(minutes: string): number{
{
  const parts = minutes.split(':');
  return +parts[0] * 60 + +parts[1];
}

function minutesToTime(minutes: number): Date {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return new Date(0, 0, 0, hours, mins);
}}
