namespace ShiftTracker.Angular.Models;

public class Break
{
	public int      Id        { get; set; }
	public TimeSpan StartTime { get; set; }
	public TimeSpan EndTime   { get; set; }
	public TimeSpan Duration  { get; set; }

	// Navigation properties
	public int   ShiftId { get; set; }
	public Shift Shift   { get; set; }

	public void ComputeDuration() => Duration = EndTime - StartTime;
}