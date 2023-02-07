namespace ShiftTracker.Angular.DTOs;

using Models;
using Newtonsoft.Json;

public class ShiftDto
{
	public int?     Id    { get; set; } = 0;
	public DateTime? Date  { get; set; } = DateTime.Now;
	public int?      RunId { get; set; } = -1;

	public RunDto? Run { get; set; } 

	// Navigation properties
	public List<BreakDto>? Breaks { get; set; } = new List<BreakDto>();

	public string? StartTime     { get; set; }
	public string? EndTime       { get; set; }
	public string? BreakDuration { get; set; }
	public string? DriveTime     { get; set; } 
	public string? ShiftDuration { get; set; }
	public string? OtherWorkTime { get; set; } 
	public string? WorkTime      { get; set; } 


	public static ShiftDto? CreateDto(Shift shift)
	{
		var shiftDto = new ShiftDto
			{
			Id = shift.Id,
			Date = shift.Date,
			RunId = shift.RunId,
			Run = new RunDto { Id = shift.Run.Id, Number = shift.Run.Number, StartTime = shift.Run.StartTime},
			StartTime = shift.StartTime.ToString(@"hh\:mm"),
			EndTime = shift.EndTime.ToString(@"hh\:mm"),
			DriveTime = shift.DriveTime.ToString(@"hh\:mm"),
			ShiftDuration = shift.ShiftDuration.ToString(@"hh\:mm"),
			BreakDuration = shift.BreakDuration.ToString(@"hh\:mm"),
			OtherWorkTime = shift.OtherWorkTime.ToString(@"hh\:mm"),
			WorkTime = shift.WorkTime.ToString(@"hh\:mm"),
			};
		return shiftDto;
	}
}