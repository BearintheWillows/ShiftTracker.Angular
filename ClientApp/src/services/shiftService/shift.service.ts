import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {BehaviorSubject, map, Observable, ReplaySubject, Subject, tap} from "rxjs";
import {IShift} from "../../interfaces/iShift";

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private includeRun: string = "false";
  private includeTimeData: string = "false";
  private includeBreaks: string = "false";

  private readonly _baseUrl = `https://localhost:7004/api/shift`;
  private readonly _baseUrlWithFilter = `https://localhost:7004/api/shift`;

  constructor(
    private http: HttpClient
  ) {


  }

  getShifts(includeRun: boolean, includeTimeData: boolean, includeBreaks: boolean): Observable<IShift[]> {
    this.setFilterOptions(includeRun, includeTimeData, includeBreaks);
    return this.http.get<IShift[]>(this._baseUrl);
  }

  getShiftById(id: number): Observable<IShift> {
    return this.http.get<IShift>(`${this._baseUrl}/${id}`);
  }


  postDeleteShift(id: number): Observable<IShift> {
    return this.http.delete<IShift>(`${this._baseUrl}/${id}`);
  }

  postShift(shift: IShift): Observable<IShift> {
    return this.http.post<IShift>(`${this._baseUrl}/create` , shift);
  }




  setFilterOptions(includeRun?: boolean, includeTimeData?: boolean, includeBreaks?: boolean): void {
    if(includeRun) {
      //turn bool to string

      this.includeRun = JSON.parse(String(includeRun));
    }
    if(includeTimeData) {
      this.includeTimeData = JSON.parse(String(includeTimeData))
    }
    if(includeBreaks) {
      this.includeBreaks = JSON.parse(String(includeBreaks));
    }
  }

  updateShift(shift: IShift) {
    console.log(shift)
    return this.http.put<IShift>(`${this._baseUrl}/${shift.id}`, shift);
  }

  checkIfDateIsUsed(date: Date): Observable<boolean> {
    return this.http.get<boolean>(`${this._baseUrl}/checkdateinuse?date=${date}`).pipe(
      tap((resp: boolean) => {
        console.log(resp)
      })
    );
  }
}
