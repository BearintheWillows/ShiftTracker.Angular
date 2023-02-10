import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormatForUi'
})
export class TimeFormatForUiPipe implements PipeTransform {

  transform(value: string): string {
    let formattedTime = value.match(/\d{2}:\d{2}/)?.[0];
     return formattedTime ? formattedTime : value;
  }
}

@Pipe({
  name: 'timeFormatForTimeSpan'
})
export class TimeFormatForTimeSpanPipe implements PipeTransform {

  transform(value: string): string {
    let formattedTime = value.match(/\d{2}:\d{2}/)?.[0] + ":00";

    return formattedTime ? formattedTime : value;
 }

}

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
