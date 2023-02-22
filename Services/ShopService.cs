namespace ShiftTracker.Angular.Services;

using Data;
using Microsoft.EntityFrameworkCore;
using Models;

public interface IShopService
{
	Task<List<Shop>>        GetAllShops();
	Task<IEnumerable<Shop>> GetAllAvailableShops(DayOfWeek dayOfWeek);
}

public class ShopService : IShopService
{
	private readonly AppDbContext _context;

	public ShopService(AppDbContext context)
	{
		_context = context;
	}

	public async Task<List<Shop>> GetAllShops()
	{
		return await _context.Shops.ToListAsync();
	}
	
	public async Task<IEnumerable<Shop>> GetAllAvailableShops(DayOfWeek dayOfWeek)
	{
		var shops = await _context.Shops
		                          .Include( s => s.DeliveryPoints )
		                          .Where( shop => shop.DeliveryPoints.Any( dp => dp.DayOfWeek != dayOfWeek ) )
		                          .ToListAsync();
		return shops;
	}
}
