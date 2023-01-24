namespace ShiftTracker.Angular.Models;

public class Shop
{
	public int    Id   { get; set; }
	public string Name { get; set; } = string.Empty;

	public int     Number      { get; set; } = 0;
	public string  Street      { get; set; } = string.Empty;
	public string? Street2     { get; set; } = string.Empty;
	public string  City        { get; set; } = string.Empty;
	public string  County      { get; set; } = string.Empty;
	public string  Postcode    { get; set; } = string.Empty;
	public int     PhoneNumber { get; set; } = 0;


	public ICollection<DailyRoutePlan> DailyRoutePlan { get; set; }
}