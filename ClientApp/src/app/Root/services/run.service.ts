import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IRun} from "../../Feature/runs/models/iRun";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RunService {
  private readonly _baseUrl = `https://localhost:7004/api/run`;

  private _allRunsSource = new BehaviorSubject<IRun[]>([]);
  allRuns$ = this._allRunsSource.asObservable();

  constructor(private http: HttpClient) {}

  async getAllRuns() : Promise<IRun[]> {
    return new Promise(async (resolve) => {
      (await this.http.get<IRun[]>(`${this._baseUrl}`)).subscribe((runs: IRun[]) => {
        this._allRunsSource.next(runs);
        resolve(runs);
      });
    })}

  getRunIdFromRunNumber(runNumber: number): Observable<number>{
    console.log(`${this._baseUrl}/runNumber/${runNumber}`);
    return this.http.get<number>(`${this._baseUrl}/runNumber/${runNumber}`);
  }

  getById(id: number): Observable<IRun> {
    return this.http.get<IRun>(`${this._baseUrl}/${id}`);
  }

  getRunByIdWithRunVariantsAndDeliveryPoints(id: number): Observable<IRun> {
    return this.http.get<IRun>(`${this._baseUrl}/${id}`);
  }

  createRun(run: IRun): Observable<IRun> {
    return this.http.post<IRun>(`${this._baseUrl}`, run);
  }

}
