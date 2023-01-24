namespace ShiftTracker.Angular.DTOs;

public class ShopDto
{
	public int Id { get; set; }

	public string  Name        { get; set; }
	public int     Number      { get; set; }
	public string  Street      { get; set; }
	public string? Street2     { get; set; }
	public string  City        { get; set; }
	public string  County      { get; set; }
	public string  Postcode    { get; set; }
	public int     PhoneNumber { get; set; }

	public ICollection<DailyRoutePlanDto>? DayVariants { get; set; }
}