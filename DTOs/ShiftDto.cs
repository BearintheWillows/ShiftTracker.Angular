namespace ShiftTracker.Angular.DTOs;

using Models;
using Newtonsoft.Json;
using Serilog;

public class ShiftDto
{
	public int     Id    { get; set; } 
	public DateTime Date  { get; set; } 
	public int      RunId { get; set; } 

	public RunDto? Run { get; set; } 

	// Navigation properties
	public List<BreakDto>? Breaks { get; set; }
	public DateTime StartTime     { get; set; }
	public DateTime EndTime       { get; set; }
	public TimeSpan BreakDuration { get; set; }
	public TimeSpan DriveTime     { get; set; } 
	public TimeSpan ShiftDuration { get; set; }
	public TimeSpan OtherWorkTime { get; set; } 
	public TimeSpan WorkTime      { get; set; } 


	public static ShiftDto? CreateDto(Shift shift)
	{
		var shiftDto = new ShiftDto
			{
			Id = shift.Id,
			Date = shift.Date ,
			RunId = shift.RunId,
			Run = RunDto.CreateRunDto( shift.Run, false, false ),
			StartTime = shift.StartTime,
			EndTime = shift.EndTime,
			DriveTime = shift.DriveTime,
			ShiftDuration =shift.ShiftDuration,
			BreakDuration = shift.BreakDuration,
			OtherWorkTime = shift.OtherWorkTime,
			WorkTime = shift.WorkTime,
			};
		
		Log.Information("ShiftDto-CreateDto ... Shift {@shiftDto} created and returned", shiftDto.Id);
		return shiftDto;
	}
}