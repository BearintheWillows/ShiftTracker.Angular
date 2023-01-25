import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IShift} from "../../interfaces/iShift";

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private includeRun: string = "false";
  private includeTimeData: string = "false";
  private includeBreaks: string = "false";

  private readonly _baseUrl = `https://localhost:7004/api/shift?includeRun=true&includeTimeData=true&includeBreaks=${this.includeBreaks}`;
  constructor(
    private http: HttpClient
  ) { }

  getShifts(includeRun: boolean, includeTimeData: boolean, includeBreaks: boolean): Observable<IShift[]> {
    this.setFilterOptions(includeRun, includeTimeData, includeBreaks);
    return this.http.get<IShift[]>(this._baseUrl);
  }

  setFilterOptions(includeRun?: boolean, includeTimeData?: boolean, includeBreaks?: boolean): void {
    if(includeRun) {
      //turn bool to string

      this.includeRun = JSON.parse(String(includeRun));
    };
    if(includeTimeData) {
      this.includeTimeData = JSON.parse(String(includeTimeData))
    }
    if(includeBreaks) {
      this.includeBreaks = JSON.parse(String(includeBreaks));
    }
  }
}
