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
		
		DayVariants = GenerateVariants();

	}

	public List<RunVariant> GenerateVariants()
	{
		var variants = new List<RunVariant>();
		for ( int i = 0; i < 7; i++ )
		{
			variants.Add( new RunVariant() { DayOfWeek = (DayOfWeek) i } );
		}

		return variants;
	}
}