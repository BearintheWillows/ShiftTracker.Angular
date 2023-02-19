namespace ShiftTracker.Angular.DTOs;

using Models;

public class RunVariantDto
{
	public int? Id        { get; set; }
	public int  DayOfWeek { get; set; }
	
	public DateTime StartTime { get; set; }
	
	public int?    RunId { get; set; }
	public RunDto? Run   { get; set; }
	
	public ICollection<DeliveryPointDto>? DeliveryPoints { get; set; }


	public static RunVariantDto CreateDto(RunVariant runVariant)
	{
		var runVariantDto = new RunVariantDto
		{
			Id             = runVariant.Id,
			DayOfWeek      = (int)runVariant.DayOfWeek,
			StartTime      = runVariant.StartTime,
			RunId          = runVariant.RunId,
		// 	DeliveryPoints = runVariant.DeliveryPoints.Select( DeliveryPointDto.CreateDto ).ToList()
		};
		return runVariantDto;
	}
}
