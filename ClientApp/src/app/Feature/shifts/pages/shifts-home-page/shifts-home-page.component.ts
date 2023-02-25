import {Component, NgZone, OnInit, Output} from '@angular/core';
import {ShiftService} from "../../../../Root/services/shift.service";
import {IShift} from "../../models/iShift";
import {Observable} from "rxjs";

@Component({
  selector: 'app-shifts-home-page',
  templateUrl: './shifts-home-page.component.html',
  styleUrls: ['./shifts-home-page.component.scss']
})


export class ShiftsHomePageComponent {

  constructor() {}

}
