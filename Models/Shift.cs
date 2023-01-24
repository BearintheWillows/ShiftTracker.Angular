namespace ShiftTracker.Angular.Models;

public class Shift
{
	public int      Id   { get; set; }
	public DateTime Date { get; set; }

	public TimeSpan StartTime     { get; set; }
	public TimeSpan EndTime       { get; set; }
	public TimeSpan BreakDuration { get; set; }
	public TimeSpan DriveTime     { get; set; }
	public TimeSpan ShiftDuration { get; set; }

	public TimeSpan OtherWorkTime { get; set; }
	public TimeSpan WorkTime      { get; set; }
	
	// Navigation properties
	public ICollection<Break> Breaks { get; set; }
	
}