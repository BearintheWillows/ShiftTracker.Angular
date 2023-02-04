import {Component, OnInit} from '@angular/core';
import {ShiftService} from "../../../services/shiftService/shift.service";
import {ActivatedRoute} from "@angular/router";
import {IShift} from "../../../interfaces/iShift";

@Component({
  selector: 'app-shift-detail',
  templateUrl: './shift-detail.component.html',
  styleUrls: ['./shift-detail.component.scss']
})
export class ShiftDetailComponent implements OnInit{

    shift: IShift = {} as IShift;
    dateString: string = '';
  private newDate: Date = new Date()

    constructor(
      private shiftService: ShiftService,
      private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.getShiftById(params['id']);
      });


    }

    getShiftById(id: number): void {
      this.shiftService.getShiftById(id).subscribe(
        shift => {
          this.shift = shift
          this.newDate = new Date(this.shift.date);
          this.dateString = this.newDate.toLocaleDateString('en-EN', {day: 'numeric', month: 'long', year: 'numeric'});

    }
      );
    }

    formatTime(time: Date): string {
      let newTime = new Date("1970-01-01T" + time + "Z");
      return newTime.toLocaleTimeString('en-EN', {hour: '2-digit', minute: '2-digit'});
  }

  formatTimeToHours(time: Date): string {
    let newTime = new Date("1970-01-01T" + time);
    let hours = newTime.getHours();
    let minutes = newTime.getMinutes();

    return hours + " hrs and " + minutes + " mins";
  }
}

