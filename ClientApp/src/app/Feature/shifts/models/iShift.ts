import {IRun} from "../../../../interfaces/iRun";
import {IBreak} from "../../../../interfaces/iBreak";

export interface IShift{
  id: number;
  date: Date;
  runId: number;


  run: IRun;

  breaks?: IBreak[];
  startTime: string;
  endTime: string
  driveTime: string;
  breakDuration: string;
  shiftDuration: string;
  otherWorkTime: string;
  workTime: string;
}
