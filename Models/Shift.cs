namespace ShiftTracker.Angular.Models;

using Helpers;
using Newtonsoft.Json;

public class Shift
{
	public int      Id   { get; set; }
	public DateTime Date { get; set; }

	[JsonConverter( typeof(TimeSpanConverter) )]
	public TimeSpan StartTime     { get; set; }
	[JsonConverter( typeof(TimeSpanConverter) )]
	public TimeSpan EndTime       { get; set; }
	[JsonConverter( typeof(TimeSpanConverter) )]
	public TimeSpan BreakDuration { get; set; }
	[JsonConverter( typeof(TimeSpanConverter) )]
	public TimeSpan DriveTime     { get; set; }
	[JsonConverter( typeof(TimeSpanConverter) )]
	public TimeSpan ShiftDuration { get; set; }
	[JsonConverter( typeof(TimeSpanConverter) )]

	public TimeSpan OtherWorkTime { get; set; }
	[JsonConverter( typeof(TimeSpanConverter) )]
	public TimeSpan WorkTime      { get; set; }
	
	public int RunId { get; set; }
	public Run  Run   { get; set; }
	
	// Navigation properties
	public ICollection<Break> Breaks { get; set; }
	
}