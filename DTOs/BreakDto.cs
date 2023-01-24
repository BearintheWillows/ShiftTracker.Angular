namespace ShiftTracker.Angular.DTOs;

using Models;

public class BreakDto
{
	public int?     Id        { get; set; }
	public TimeSpan StartTime { get; set; }
	public TimeSpan EndTime   { get; set; }
	public TimeSpan Duration  { get; set; }

	// Navigation properties
	public int    ShiftId { get; set; }
	public Shift? Shift   { get; set; }
}