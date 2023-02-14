import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numToDayOfWeekString'
})
export class DayOfWeekConversionPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      default:
        return 'Unknown';
    }
  }
}

@Pipe({
  name: 'dayOfWeekStringToNum'
})
export class StrToDayOfWeekConversionPipe implements PipeTransform {

  transform(value: string): number {
    switch (value.toLowerCase()) {
      case 'sunday':
        return 0;
      case 'monday':
        return 1;
      case 'tuesday':
        return 2;
      case 'wednesday':
        return 3;
      case 'thursday':
        return 4;
      case 'friday':
        return 5;
      case 'saturday':
        return 6;
      default:
        return -1;
    }
  }

}


