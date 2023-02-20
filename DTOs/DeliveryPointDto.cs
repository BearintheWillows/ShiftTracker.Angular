namespace ShiftTracker.Angular.Models;

using DTOs;

public class DeliveryPointDto
{
	public int?      Id              { get; set; } = 0;
	public int       DropNumber      { get; set; }
	public int       DayOfWeek       { get; set; }
	public DateTime? WindowOpenTime  { get; set; }
	public DateTime  WindowCloseTime { get; set; }
	public int       RunVariantId    { get; set; }
	
	public RunVariantDto RunVariantDto { get; set; }
	public int       ShopId          { get; set; }
	
	public ShopDto Shop { get; set; }

	public static DeliveryPointDto CreateDtoList(DeliveryPointDto deliveryPoint)
	{
		var deliveryPointDto = new DeliveryPointDto
		{
			Id              = deliveryPoint.Id,
			DropNumber      = deliveryPoint.DropNumber,
			DayOfWeek       = (int)deliveryPoint.DayOfWeek,
			WindowOpenTime  = deliveryPoint.WindowOpenTime,
			WindowCloseTime = deliveryPoint.WindowCloseTime,
			RunVariantId    = deliveryPoint.RunVariantId,
			ShopId          = deliveryPoint.ShopId
		};
		return deliveryPointDto;
	}
}