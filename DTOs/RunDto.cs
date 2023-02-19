namespace ShiftTracker.Angular.DTOs;

using Models;

public class RunDto
{
	public int      Id        { get; set; }
	public int      Number    { get; set; }
	public string Location  { get; set; }

	public IEnumerable<RunVariantDto>? DailyRoutes { get; set; }

	public static IEnumerable<RunDto> CreateDtoList(List<Run> run)
	{
		var runDto = run.Select( r => new RunDto
				{
				Id = r.Id,
				Number = r.Number,
				Location = r.Location,
				
				}
		);
		return runDto;
	}

	public RunDto (int Id, int Number, string Location, IEnumerable<RunVariantDto> DailyRoutes)
	{
		this.Id = Id;
		this.Number = Number;
		this.Location = Location;
		this.DailyRoutes = DailyRoutes;
	}

	private RunDto()
	{
	}
}