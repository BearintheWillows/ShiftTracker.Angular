

import {IRun} from "../../runs/models/iRun";

export interface IShift{
  id: number;
  date: Date;
  runId: number;


  run: IRun;

  startTime: string;
  endTime: string
  driveTime: string;
  breakDuration: string;
  shiftDuration: string;
  otherWorkTime: string;
  workTime: string;
}
