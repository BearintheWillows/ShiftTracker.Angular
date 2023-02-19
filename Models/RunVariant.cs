namespace ShiftTracker.Angular.Models;

public class RunVariant
{
	public int Id { get; set; }
	public DayOfWeek DayOfWeek { get; set; }
	public DateTime StartTime { get; set; }
	public RoutePlan RoutePlan { get; set; }
}