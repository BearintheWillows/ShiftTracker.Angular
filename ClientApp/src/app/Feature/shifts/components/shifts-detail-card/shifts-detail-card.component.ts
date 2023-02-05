import {Component, OnInit, TemplateRef} from '@angular/core';
import {ShiftService} from "../../../services/shiftService/shift.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IShift} from "../../../interfaces/iShift";
import {Location} from "@angular/common";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ConfirmModalComponent} from "../../Helpers/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-shifts-detail-card',
  templateUrl: './shifts-detail-card.component.html',
  styleUrls: ['./shifts-detail-card.component.scss']
})
export class ShiftsDetailCardComponent implements OnInit{

  shift: IShift = {} as IShift;
  dateString: string = '';
  private newDate: Date = new Date()
  modalRef?: BsModalRef;

  constructor(
    private shiftService: ShiftService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: BsModalService,
    private router: Router) { }

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

  deleteConfirm(): void {
    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        title: 'Delete Shift',
        message: `Are you sure you want to delete the shift for ${this.dateString}?`,
        template: 'delete',
      }
    });
    this.modalRef.content.onClose.subscribe((result: boolean) => {
      if (result === true) {
        this.deleteShift(this.shift);
        this.router.navigate(['/shifts']);
      } else {
        this.modalService.hide(1);
      }
    });
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

  goBack() {
    this.location.back();
  }

  deleteShift(shift: IShift) {
    this.shiftService.postDeleteShift(shift.id).subscribe(() => this.goBack());

  }
}
