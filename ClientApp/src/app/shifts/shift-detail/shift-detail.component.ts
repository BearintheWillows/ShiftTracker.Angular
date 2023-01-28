import {Component, Input, OnInit} from '@angular/core';
import {IShift} from "../../../interfaces/iShift";

@Component({
  selector: 'app-shift-detail',
  templateUrl: './shift-detail.component.html',
  styleUrls: ['./shift-detail.component.css']
})
export class ShiftDetailComponent implements OnInit {

  constructor() { }

  @Input() shift?: IShift;

  ngOnInit(): void {
  }

}
