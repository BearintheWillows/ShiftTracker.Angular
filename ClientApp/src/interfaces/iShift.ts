export interface IShift{
  id: number;
  date: Date;
<<<<<<< HEAD
  runNumber: number;
=======
  runId: number;
>>>>>>> main

  //TODO: Add IRun
  // run?: IRun;

  //TODO: Add IBreak
  // breaks?: IBreak[];
  startTime?: Date;
  endTime?: Date;
  driveTime?: Date;
  breakDuration?: Date;
  shiftDuration?: Date;
  otherWorkTime?: Date;
  workTime?: Date;
}
