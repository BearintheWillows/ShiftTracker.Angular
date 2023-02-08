import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormatForDateTime'
})
export class TimeFormatForDateTimePipe implements PipeTransform {

  transform(value: string): string {
    //transform time string to a c# datettime valid format
    const date = new Date("1970-01-01T" + value + "Z");
    return date.toISOString();
  }

}
