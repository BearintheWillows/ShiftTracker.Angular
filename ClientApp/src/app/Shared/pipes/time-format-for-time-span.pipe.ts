import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormatForTimeSpan'
})
export class TimeFormatForTimeSpanPipe implements PipeTransform {

  transform(value: string): string {
    return const timeSpanCompatibleFormat = value.match(/\d{2}:\d{2}:\d{2}/)?.[0];
  }

}
