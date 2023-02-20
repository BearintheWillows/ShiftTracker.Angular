namespace ShiftTracker.Angular.Models;

using DTOs;

public class Run
{
	public int Id     { get; set; } = 0;
	public int Number { get; set; }
	
	public string   Location  { get; set; }

	public ICollection<Shift> Shifts      { get; set; }
	public List<RunVariant>   DayVariants { get; set; }

	public Run(int number, string location)
	{
		Number = number;
		Location = location;
		DayVariants = new List<RunVariant>();
	}
	
}