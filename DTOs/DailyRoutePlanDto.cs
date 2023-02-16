namespace ShiftTracker.Angular.DTOs;

using Models;

public class DailyRoutePlanDto
{
	public int? Id        { get; set; }
	public int  DayOfWeek { get; set; }
	
	public DateTime StartTime { get; set; }

	//Delivery Window Start/End Times
	public TimeSpan? WindowOpenTime  { get; set; }
	public TimeSpan  WindowCloseTime { get; set; }

	public int?    RunId { get; set; }
	public RunDto? Run   { get; set; }

	public int      ShopId { get; set; }
	public ShopDto? Shop   { get; set; }

	public static DailyRoutePlanDto CreateDto(DailyRoutePlan dayVariant)
	{
		var dayVariantDto = new DailyRoutePlanDto
		{
			Id             = dayVariant.Id,
			DayOfWeek      = (int)dayVariant.DayOfWeek,
			StartTime      = dayVariant.StartTime,
			WindowOpenTime = dayVariant.WindowOpenTime,
			WindowCloseTime = dayVariant.WindowCloseTime,
			RunId          = dayVariant.RunId,
			ShopId         = dayVariant.ShopId
		};
		return dayVariantDto;
	}
}