import {FormGroup, ValidationErrors} from "@angular/forms";

export class TimeValidators {

  public static IsShiftStartBeforeShiftEnd(): (control: FormGroup) => ValidationErrors | null {
    return (control: FormGroup): ValidationErrors | null => {
      const startTime = control.get('startTime')?.value;
      const endTime = control.get('endTime')?.value;

      if (startTime && endTime) {
        const startMinutes = TimeValidators.timeToMinutes(startTime);
        const endMinutes = TimeValidators.timeToMinutes(endTime);

        return startMinutes > endMinutes ? {isTimeValid: true} : null;
      }
      return null;
    }
  }

  public static IsWorkTimeEqualToShiftLength(): (control: FormGroup) => ValidationErrors | null {
    return (control: FormGroup): ValidationErrors | null => {
      const startTime = control.get('startTime')?.value;
      const endTime = control.get('endTime')?.value;
      const driveTime = control.get('driveTime')?.value;
      const workTime = control.get('workTime')?.value;
      const otherWorkTime = control.get('otherWorkTime')?.value;

      if (startTime && endTime && driveTime && workTime && otherWorkTime) {
        const startMinutes = TimeValidators.timeToMinutes(startTime);
        const endMinutes = TimeValidators.timeToMinutes(endTime);
        const driveMinutes = TimeValidators.timeToMinutes(driveTime);
        const workMinutes = TimeValidators.timeToMinutes(workTime);
        const otherWorkMinutes = TimeValidators.timeToMinutes(otherWorkTime);

        const shiftLength = endMinutes - startMinutes;
        const workLength = driveMinutes + workMinutes + otherWorkMinutes;

        return shiftLength !== workLength ? {isTimeValid: true} : null;
      }
      return null;
    }
  }


  private static timeToMinutes(minutes: string): number {
    const parts = minutes?.split(':');
    console.log(parts)
    if(parts) {
      return +parts[0] * 60 + +parts[1];
    }
    return 0;
  }

  private static minutesToTime(minutes: number): Date {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return new Date(0, 0, 0, hours, mins);
  }
}
