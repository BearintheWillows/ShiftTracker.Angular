import {Component, Input} from '@angular/core';
import {IShift} from "../../../interfaces/iShift";

@Component({
  selector: 'app-shift-table-row',
  templateUrl: './shift-table-row.component.html',
  styleUrls: ['./shift-table-row.component.css']
})
export class ShiftTableRowComponent {

  @Input() shift?: IShift;
}
