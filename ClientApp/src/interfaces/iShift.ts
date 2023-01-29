import {IRun} from "./iRun";
import {IBreak} from "./iBreak";

export interface IShift{
  id: number;
  date: Date;
  runId: number;


  run: IRun;

  breaks?: IBreak[];
  startTime: Date;
  endTime: Date;
  driveTime: Date;
  breakDuration: Date;
  shiftDuration: Date;
  otherWorkTime: Date;
  workTime: Date;
}
