namespace ShiftTracker.Angular.Services;

using Data;
using Microsoft.EntityFrameworkCore;
using Models;

public interface IShopService
{
	Task<List<Shop>> GetAllShops();
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
}
