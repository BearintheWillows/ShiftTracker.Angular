namespace ShiftTracker.Angular.Controllers;

using DTOs;
using Microsoft.AspNetCore.Mvc;
using Services;

[ApiController]
[Route( "api/[controller]" )]
public class ShopController : ControllerBase
{
	private readonly IShopService _shopService;
	
	public ShopController(IShopService shopService)
	{
		_shopService = shopService;
	}
	
	
	[HttpGet]
	public async Task<IActionResult> GetAllShops()
	{
		var shopList = await _shopService.GetAllShops();
		var shopDtoList = new List<ShopDto>();
		
		foreach (var shop in shopList)
		{
			shopDtoList.Add(ShopDto.CreateDto(shop));
		}
		return Ok(shopDtoList);
	}
}