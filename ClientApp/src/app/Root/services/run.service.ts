import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IRun} from "../../Feature/runs/models/iRun";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RunService {
  private readonly _baseUrl = `https://localhost:7004/api/run`;

  constructor(private http: HttpClient) {
  }

  async getAll(): Promise<Observable<IRun[]>> {
    return this.http.get<IRun[]>(this._baseUrl);
  }

  getRunIdFromRunNumber(runNumber: number): Observable<number>{
    console.log(`${this._baseUrl}/runNumber/${runNumber}`);
    return this.http.get<number>(`${this._baseUrl}/runNumber/${runNumber}`);
  }
}
