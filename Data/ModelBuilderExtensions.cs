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
			                      StartTime = new DateTime(1970,01,01, 05,0,0 ),
			                      EndTime = new DateTime( 1970,01,01, 20, 0, 0 ),
			                      BreakDuration = new TimeSpan( 01, 30, 00 ),
			                      DriveTime = new TimeSpan( 02, 55, 00 ),
			                      OtherWorkTime = new TimeSpan( 02, 05, 00 ),
			                      WorkTime = new TimeSpan( 1, 30, 00 ),
			                      ShiftDuration = new TimeSpan( 08, 00, 00 ),
			                      RunId = -2,
			                      },
		                      new
			                      {
			                      Id = -2,
			                      Date = new DateTime( 2023, 01, 02 ),
			                      StartTime = new DateTime(1970,01,01, 03,30,0),
			                      EndTime = new DateTime( 1970,01,01,10, 30, 0 ),
			                      BreakDuration = new TimeSpan( 0, 30, 00 ),
			                      DriveTime = new TimeSpan( 02, 00, 00 ),
			                      OtherWorkTime = new TimeSpan( 02, 00, 00 ),
			                      WorkTime = new TimeSpan( 1, 30, 00 ),
			                      ShiftDuration = new TimeSpan( 06, 00, 00 ),
			                      RunId = -2,
			                      }
		             );

		modelBuilder.Entity<Run>().HasData( new { Id = -1, Number = 68, Location = "Norwich" },
		                                    new { Id = -2, Number = 19, Location = "Milton Keynes" }
		);

		modelBuilder.Entity<Shop>().HasData( new
			                                     {
			                                     Id = -1,
			                                     Name = "Tesco",
			                                     Number = 2006,
			                                     Street = "3 School Mews",
			                                     Street2 = "",
			                                     City = "Irthlingborough",
			                                     County = "Northants",
			                                     Postcode = "NN95JG",
			                                     PhoneNumber = 01536741000,
			                                     },
		                                     new
			                                     {
			                                     Id = -2,
			                                     Name = "Tesco",
			                                     Number = 2005,
			                                     Street = "38 Chesham Rise",
			                                     Street2 = "",
			                                     City = "Northampton",
			                                     County = "Northants",
			                                     Postcode = "NN38px",
			                                     PhoneNumber = 01604620000,
			                                     },
		                                     new
			                                     {
			                                     Id = -3,
			                                     Name = "Tesco",
			                                     Number = 2004,
			                                     Street = "10 Leighton Close",
			                                     Street2 = "",
			                                     City = "Stanwick",
			                                     County = "Northants",
			                                     Postcode = "NN96JG",
			                                     PhoneNumber = 01536741000,
			                                     },
		                                     new
			                                     {
			                                     Id = -4,
			                                     Name = "Aldi",
			                                     Number = 121,
			                                     Street = "34 Church Rise",
			                                     Street2 = "",
			                                     City = "Thetford",
			                                     County = "Suffolk",
			                                     Postcode = "IP242JG",
			                                     PhoneNumber = 01842741000,
			                                     },
		                                     new
			                                     {
			                                     Id = -5,
			                                     Name = "One Stop",
			                                     Number = 1223,
			                                     Street = "2 Gander Avenue",
			                                     Street2 = "",
			                                     City = "Brandon",
			                                     County = "Suffolk",
			                                     Postcode = "IP20JG",
			                                     PhoneNumber = 01842741000,
			                                     }
		);

		modelBuilder.Entity<DailyRoutePlan>().HasData( new
			                                               {
			                                               Id = -1,
			                                               SequenceNumber = 1,
			                                               DayOfWeek = DayOfWeek.Monday,
			                                               StartTime = new DateTime(1930, 01, 01, 03, 00, 00),
			                                               WindowOpenTime = new TimeSpan( 10, 15, 00 ),
			                                               WindowCloseTime = new TimeSpan( 11, 15, 00 ),
			                                               RunId = -1,
			                                               ShopId = -1,
			                                               },
		                                               new
			                                               {
			                                               Id = -2,
			                                               SequenceNumber = 2,
			                                               StartTime = new DateTime(1930, 01, 01, 03, 00, 00),
			                                               DayOfWeek = DayOfWeek.Monday,
			                                               WindowOpenTime = new TimeSpan( 12, 15, 00 ),
			                                               WindowCloseTime = new TimeSpan( 13, 15, 00 ),
			                                               RunId = -1,
			                                               ShopId = -2,
			                                               },
		                                               new
			                                               {
			                                               Id = -3,
			                                               SequenceNumber = 3,
			                                               StartTime = new DateTime(1930, 01, 01, 03, 00, 00),
			                                               DayOfWeek = DayOfWeek.Monday,
			                                               WindowOpenTime = new TimeSpan( 14, 15, 00 ),
			                                               WindowCloseTime = new TimeSpan( 14, 30, 00 ),
			                                               RunId = -1,
			                                               ShopId = -3,
			                                               },
		                                               new
			                                               {
			                                               Id = -4,
			                                               SequenceNumber = 2,
			                                               StartTime = new DateTime( 1930,01,01,03,00,00 ),
			                                               DayOfWeek = DayOfWeek.Monday,
			                                               WindowOpenTime = new TimeSpan( 10, 15, 00 ),
			                                               WindowCloseTime = new TimeSpan( 11, 15, 00 ),
			                                               RunId = -2,
			                                               ShopId = -4,
			                                               },
		                                               new
			                                               {
			                                               Id = -5,
			                                               SequenceNumber = 1,
			                                               StartTime = new DateTime( 1930,01,01,03,00,00 ),
			                                               DayOfWeek = DayOfWeek.Monday,
			                                               WindowOpenTime = new TimeSpan( 12, 15, 00 ),
			                                               WindowCloseTime = new TimeSpan( 13, 15, 00 ),
			                                               RunId = -2,
			                                               ShopId = -5,
			                                               }
		);
	}
}