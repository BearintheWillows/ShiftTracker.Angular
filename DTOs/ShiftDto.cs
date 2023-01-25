namespace ShiftTracker.Angular.DTOs;

using Models;

public class ShiftDto
{
	public int?     Id        { get; set; }
	public DateTime Date      { get; set; }
	public int?     RunId     { get; set; }
	public int?      RunNumber { get; set; }

	public RunDto? Run { get; set; }

	// Navigation properties
	public List<BreakDto>? Breaks { get; set; }

	public TimeSpan StartTime     { get; set; }
	public TimeSpan EndTime       { get; set; }
	public TimeSpan BreakDuration { get; set; }
	public TimeSpan DriveTime     { get; set; }
	public TimeSpan ShiftDuration { get; set; }
	public TimeSpan OtherWorkTime { get; set; }
	public TimeSpan WorkTime      { get; set; }

	/// <summary>
	///     Creates ShiftDto from Shift data
	/// </summary>
	/// <param name="shift"></param>
	/// <param name="opts"></param>
	/// <returns>ShiftDto</returns>
	public static ShiftDto? CreateDto(Shift shift, (bool includeBreaks, bool includeRun, bool includeTimeData) opts)
	{
		var shiftDto = new ShiftDto
			{
			Id = shift.Id,
			Date = shift.Date,
			Breaks = opts.includeBreaks
				? shift.Breaks.Select( b => new BreakDto
						{
						Id = b.Id, ShiftId = b.ShiftId, StartTime = b.StartTime, EndTime = b.EndTime,
						}
				).ToList()
				: null,
			Run = opts.includeRun ? new RunDto { Id = shift.Run.Id, Number = shift.Run.Number } : null,
			StartTime = opts.includeTimeData ? shift.StartTime : new TimeSpan( 00, 00, 00 ),
			EndTime = opts.includeTimeData ? shift.EndTime : new TimeSpan( 00, 00, 00 ),
			ShiftDuration = opts.includeTimeData ? shift.ShiftDuration : new TimeSpan( 00, 00, 00 ),
			BreakDuration = opts.includeTimeData ? shift.BreakDuration : new TimeSpan( 00, 00, 00 ),
			OtherWorkTime = opts.includeTimeData ? shift.OtherWorkTime : new TimeSpan( 00, 00, 00 ),
			WorkTime = opts.includeTimeData ? shift.WorkTime : new TimeSpan( 00, 00, 00 ),
			};
		return shiftDto;
	}
}