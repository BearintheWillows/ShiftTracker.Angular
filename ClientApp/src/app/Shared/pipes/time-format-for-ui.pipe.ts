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
