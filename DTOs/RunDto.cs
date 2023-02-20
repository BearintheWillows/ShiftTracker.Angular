namespace ShiftTracker.Angular.DTOs;

using Models;
using Serilog;

public class RunDto
{
	public int      Id        { get; set; }
	public int      Number    { get; set; }
	public string Location  { get; set; }

	public IEnumerable<RunVariantDto>? DailyRoutes { get; set; }

	public static IEnumerable<RunDto> CreateRunDtoList(List<Run> run)
	{
		IEnumerable<RunDto> runDtoList = run.Select( r => new RunDto
				{
				Id = r.Id,
				Number = r.Number,
				Location = r.Location,
				DailyRoutes = r.DayVariants.Select( dv => new RunVariantDto
					{
					Id = dv.Id,
					DayOfWeek = (int)dv.DayOfWeek,
					RunId = dv.RunId,
					DeliveryPoints = dv.DeliveryPoints.Select( dp => new DeliveryPointDto
							{
							Id = dp.Id,
							DropNumber = dp.DropNumber,
							DayOfWeek = (int)dp.DayOfWeek,
							WindowOpenTime = dp.WindowOpenTime,
							WindowCloseTime = dp.WindowCloseTime,
							RunVariantId = dp.RunVariantId,
							ShopId = dp.ShopId,
							Shop = new ShopDto
									{
									Id = dp.Shop.Id,
									Name = dp.Shop.Name,
									Number = dp.Shop.Number,
									Street = dp.Shop.Street,
									Street2 = dp.Shop.Street2 ,
									City = dp.Shop.City,
									County = dp.Shop.County,
									Postcode = dp.Shop.Postcode,
									PhoneNumber = dp.Shop.PhoneNumber,
									},
							}
					).ToList(),
					
					}).ToList(),
				}
		).ToList();
		
		Log.Information($"Created a new RunDtoList with {@runDtoList} runs", runDtoList.Count());
		return runDtoList;
		
		
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

	public static RunDto CreateRunDto(Run runResultAsync)
	{
		RunDto runDto = new RunDto
				{
				Id = runResultAsync.Id,
				Number = runResultAsync.Number,
				Location = runResultAsync.Location,
				DailyRoutes = runResultAsync.DayVariants.Select( dv => new RunVariantDto
						{
						Id = dv.Id,
						DayOfWeek = ( int ) dv.DayOfWeek,
						RunId = dv.RunId,
						DeliveryPoints = dv.DeliveryPoints.Select( dp => new DeliveryPointDto
								{
								Id = dp.Id,
								DropNumber = dp.DropNumber,
								DayOfWeek = ( int ) dp.DayOfWeek,
								WindowOpenTime = dp.WindowOpenTime,
								WindowCloseTime = dp.WindowCloseTime,
								RunVariantId = dp.RunVariantId,
								ShopId = dp.ShopId,
								Shop = new ShopDto
									{
									Id = dp.Shop.Id,
									Name = dp.Shop.Name,
									Number = dp.Shop.Number,
									Street = dp.Shop.Street,
									Street2 = dp.Shop.Street2,
									City = dp.Shop.City,
									County = dp.Shop.County,
									Postcode = dp.Shop.Postcode,
									PhoneNumber = dp.Shop.PhoneNumber,
									},
								}
						).ToList(),
						}
				).ToList(),
				};

		return runDto;
		}
}