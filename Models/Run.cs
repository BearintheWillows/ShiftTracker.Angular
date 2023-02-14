namespace ShiftTracker.Angular.Models;

public class Run
{
	public int     Id        { get; set; }
	public int     Number    { get; set; }
	
	public string   Location  { get; set; }

	public ICollection<Shift>           Shifts     { get; set; }
	public ICollection<DailyRoutePlan>? RoutePlans { get; set; }
}