namespace ShiftTracker.Angular.DTOs;

using Models;

public class RunDto
{
	public int      Id        { get; set; }
	public int      Number    { get; set; }
	public TimeSpan StartTime { get; set; }

	public IEnumerable<DailyRoutePlanDto>? DailyRoutes { get; set; }

	public static IEnumerable<RunDto> CreateDtoList(List<Run> run, bool includeDrp)
	{
		var runDto = run.Select( r => new RunDto
				{
				Id = r.Id,
				Number = r.Number,
				StartTime = r.StartTime,
				DailyRoutes = includeDrp
					? r.RoutePlans.Select( dr => new DailyRoutePlanDto
							{
							Id = dr.Id,
							DayOfWeek = ( int ) dr.DayOfWeek,
							Shop = new ShopDto
								{
								Id = dr.Shop.Id,
								Name = dr.Shop.Name,
								Number = dr.Shop.Number,
								Street = dr.Shop.Street,
								Street2 = dr.Shop.Street2,
								City = dr.Shop.City,
								Postcode = dr.Shop.Postcode,
								PhoneNumber = dr.Shop.PhoneNumber,
								},
							}
					).ToList()
					: null,
				}
		);


		return runDto;
	}

	public static RunDto CreateRunDto(Run run, bool includeDRP) => new RunDto
		{
		Id = run.Id,
		Number = run.Number,
		StartTime = run.StartTime,
		DailyRoutes = includeDRP
			? run.RoutePlans.Select( dr => new DailyRoutePlanDto
					{
					Id = dr.Id,
					DayOfWeek = ( int ) dr.DayOfWeek,
					Shop = new ShopDto
						{
						Id = dr.Shop.Id,
						Name = dr.Shop.Name,
						Number = dr.Shop.Number,
						Street = dr.Shop.Street,
						Street2 = dr.Shop.Street2,
						City = dr.Shop.City,
						Postcode = dr.Shop.Postcode,
						PhoneNumber = dr.Shop.PhoneNumber,
						},
					}
			).ToList()
			: null,
		};
}