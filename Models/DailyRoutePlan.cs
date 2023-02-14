namespace ShiftTracker.Angular.Models;

public class DailyRoutePlan
{
	public int       Id              { get; set; }
	public DayOfWeek DayOfWeek       { get; set; }
	
	public DateTime  StartTime       { get; set; }
	public TimeSpan? WindowOpenTime  { get; set; }
	public TimeSpan  WindowCloseTime { get; set; }
	public int?      RunId           { get; set; }
	public Run       Run             { get; set; }
	public int       ShopId          { get; set; }
	public Shop?     Shop            { get; set; }
}