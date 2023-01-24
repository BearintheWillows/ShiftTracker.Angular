namespace ShiftTracker.Angular.Data;

using Microsoft.EntityFrameworkCore;
using Models;

public static class ModelBuilderExtentions
{
	public static void Seed(this ModelBuilder modelBuilder)
	{
		//Shifts

		modelBuilder.Entity<Break>()
		            .HasData( new
			                      {
			                      Id = -1,
			                      StartTime = new TimeSpan( 12, 30, 00 ),
			                      EndTime = new TimeSpan( 13, 00, 00 ),
			                      Duration = new TimeSpan( 00, 30, 00 ),
			                      ShiftId = -1,
			                      },
		                      new
			                      {
			                      Id = -2,
			                      StartTime = new TimeSpan( 15, 00, 00 ),
			                      EndTime = new TimeSpan( 14, 00, 00 ),
			                      Duration = new TimeSpan( 01, 00, 00 ),
			                      ShiftId = -1,
			                      },
		                      new
			                      {
			                      Id = -3,
			                      StartTime = new TimeSpan( 09, 00, 00 ),
			                      EndTime = new TimeSpan( 10, 00, 00 ),
			                      Duration = new TimeSpan( 01, 00, 00 ),
			                      ShiftId = -2,
			                      },
		                      new
			                      {
			                      Id = -4,
			                      StartTime = new TimeSpan( 13, 45, 00 ),
			                      EndTime = new TimeSpan( 14, 00, 00 ),
			                      Duration = new TimeSpan( 00, 15, 00 ),
			                      ShiftId = -2,
			                      }
		             );

		modelBuilder.Entity<Shift>()
		            .HasData( new
			                      {
			                      Id = -1,
			                      Date = new DateTime( 2023, 01, 03 ),
			                      StartTime = new TimeSpan( 08, 00, 00 ),
			                      EndTime = new TimeSpan( 16, 00, 00 ),
			                      BreakDuration = new TimeSpan( 01, 30, 00 ),
			                      DriveTime = new TimeSpan( 02, 55, 00 ),
			                      OtherWorkTime = new TimeSpan( 02, 05, 00 ),
			                      WorkTime = new TimeSpan( 1, 30, 00 ),
			                      ShiftDuration = new TimeSpan( 08, 00, 00 ),
			                      RunId = -1,
			                      },
		                      new
			                      {
			                      Id = -2,
			                      Date = new DateTime( 2023, 01, 02 ),
			                      StartTime = new TimeSpan( 10, 00, 00 ),
			                      EndTime = new TimeSpan( 16, 00, 00 ),
			                      BreakDuration = new TimeSpan( 0, 30, 00 ),
			                      DriveTime = new TimeSpan( 02, 00, 00 ),
			                      OtherWorkTime = new TimeSpan( 02, 00, 00 ),
			                      WorkTime = new TimeSpan( 1, 30, 00 ),
			                      ShiftDuration = new TimeSpan( 06, 00, 00 ),
			                      RunId = -2,
			                      }
		             );
	}
}