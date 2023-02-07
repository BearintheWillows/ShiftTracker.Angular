import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {IShift} from "../../Feature/shifts/models/iShift";

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  private readonly _baseUrl = `https://localhost:7004/api/shift`;
  constructor(
    private http: HttpClient
  ) {


  }

  getShifts(): Observable<IShift[]> {
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
