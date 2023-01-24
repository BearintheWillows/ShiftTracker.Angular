namespace ShiftTracker.Angular.DTOs;

public class DailyRoutePlanDto
{
	public int? Id        { get; set; }
	public int  DayOfWeek { get; set; }

	//Delivery Window Start/End Times
	public TimeSpan? WindowOpenTime  { get; set; }
	public TimeSpan  WindowCloseTime { get; set; }

	public int?    RunId { get; set; }
	public RunDto? Run   { get; set; }

	public int      ShopId { get; set; }
	public ShopDto? Shop   { get; set; }
}