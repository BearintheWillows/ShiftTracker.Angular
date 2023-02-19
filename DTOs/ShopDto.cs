namespace ShiftTracker.Angular.DTOs;

using Models;
using Serilog;

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

	public ICollection<RunVariantDto>? DayVariants { get; set; }

	public static ShopDto CreateDto(Shop shop)
	{
		var shopDto = new ShopDto
		{
			Id          = shop.Id,
			Name        = shop.Name,
			Number      = shop.Number,
			Street      = shop.Street,
			Street2     = shop.Street2,
			City        = shop.City,
			County      = shop.County,
			Postcode    = shop.Postcode,
			PhoneNumber = shop.PhoneNumber
		};
		
		Log.Information($"ShopDto.CreateDto: {@shopDto}", shopDto);
		return shopDto;
	}
}