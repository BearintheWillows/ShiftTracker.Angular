namespace ShiftTracker.Angular.Models;

public class DeliveryPoint
{
	public int Id { get; set; }
	private int _dropNumber;
	public int DropNumber
	{
		get {return _dropNumber;}
		set
		{
			if (_dropNumber != value)
			{
				_dropNumber = value;
				this.RunVariant.UpdateDropNumbers();
			}
		}
	}
	
	public DayOfWeek   DayOfWeek       { get; set; }
	public DateTime?   WindowOpenTime  { get; set; }
	public DateTime    WindowCloseTime { get; set; }
	public int         RunVariantId    { get; set; }
	public RunVariant? RunVariant      { get; set; }
	public int       ShopId          { get; set; }
	public Shop?     Shop            { get; set; }
	
	public void SetDayOfWeek(RunVariant runVariant, DayOfWeek dayOfWeek )
	{
		if ( runVariant != null && runVariant.DayOfWeek != dayOfWeek )
		{
			throw new ArgumentException( "Day of week must match the day of week of the run variant" );
		}
		else
		{
			DayOfWeek = dayOfWeek;
		}
	}
}

