import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormatForUi'
})
export class TimeFormatForUiPipe implements PipeTransform {

  transform(value: string): string {
    const [hours, minutes, seconds] = value.split(':');

    return `${hours}:${minutes}`;
  }
}
