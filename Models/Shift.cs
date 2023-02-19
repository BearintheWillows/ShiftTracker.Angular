namespace ShiftTracker.Angular.Models;

using Helpers;
using Newtonsoft.Json;

public class Shift
{
	public int      Id   { get; set; }
	public DateTime Date { get; set; }

	
	public DateTime StartTime     { get; set; }
	
	public DateTime EndTime       { get; set; }

	public TimeSpan BreakDuration { get; set; }

	public TimeSpan DriveTime     { get; set; }

	public TimeSpan ShiftDuration { get; set; }


	public TimeSpan OtherWorkTime { get; set; }
	public TimeSpan WorkTime      { get; set; }
	
	public int             RunId { get; set; }
	public IQueryable<Run> Run   { get; set; }
	
	// Navigation properties
	public ICollection<Break> Breaks { get; set; }
	
}