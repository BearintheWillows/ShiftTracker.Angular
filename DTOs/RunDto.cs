namespace ShiftTracker.Angular.DTOs;

using Models;

public class RunDto
{
	public int      Id        { get; set; }
	public int      Number    { get; set; }
	public string Location  { get; set; }

	public IEnumerable<RunVariantDto>? DailyRoutes { get; set; }

	public static IEnumerable<RunDto> CreateDtoList(List<Run> run, bool includeDrp)
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

	public static RunDto CreateRunDto(Run run)
	{
		var runDto = new RunDto
			{
			Id = run.Id,
			Number = run.Number,
			Location = run.Location,
			};
		return runDto;
	}
}