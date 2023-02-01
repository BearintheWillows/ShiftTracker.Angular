import {AbstractControl, AbstractControlOptions, Form, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {delay} from "rxjs";

export class TimeValidators {

    // static IsEndTimeAfterStartTime(): ValidatorFn {
    //   return (control: AbstractControl): ValidationErrors | null => {
    //
    //     let question;
    //     control.valueChanges.subscribe((c) => {
    //       let end: number = this.timeToMinutes(c.endTime);
    //       let start: number = this.timeToMinutes(c.startTime)
    //       question = end > start;
    //       console.log(end, start, question)
    //
    //
    //     });
    //
    //     return question ? {isEndTimeAfterStartTime: true}: null;
    //
    //   }
    // }

    // static IsStartTimeAfterEndTime(): ValidatorFn {
    //   return (control: AbstractControl): ValidationErrors | null => {
    //     let startTime: number = this.timeToMinutes(control.value);
    //     let endTime: number = this.timeToMinutes(control.parent?.get('endTime')?.value);
    //     let isStartTimeAfterEndTime = startTime < endTime;
    //     console.log(startTime, endTime, isStartTimeAfterEndTime)
    //
    //     return isStartTimeAfterEndTime ? null : {isStartTimeAfterEndTime: true};
    //   }
    // }


    static  IsShiftTimesEqualShiftLength(): ValidatorFn {
      return async (control: AbstractControl): Promise<ValidationErrors | null> => {
        let startTime: number = await this.timeToMinutes(control.get('startTime')?.value);
        let endTime: number = await this.timeToMinutes(control.get('endTime')?.value);
        let driveTime: number = await this.timeToMinutes(control.get('driveTime')?.value);
        let workTime: number = await this.timeToMinutes(control.get('workTime')?.value);
        let otherWorkTime: number =await this.timeToMinutes(control.get('otherWorkTime')?.value);
        let shiftLength: number = endTime - startTime;
        let shiftTimes: number = driveTime + workTime + otherWorkTime;
        let isShiftTimesEqualShiftLength = shiftLength == shiftTimes;

        return isShiftTimesEqualShiftLength ? null : {
          isShiftTimesEqualShiftLength: true,

        };
      }
    }

    static async timeToMinutes(minutes: string): Promise<number> {
      while (!minutes) {
        delay(1000);
      }
      const parts =  minutes?.split(':');

      if(parts) {
        return +parts[0] * 60 + +parts[1];
      }
      return 0;
    }

    static minutesToTime(minutes: number): Date {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return new Date(0, 0, 0, hours, mins);
    }
}
