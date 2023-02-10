namespace ShiftTracker.Angular.Services;

using Data;
using DTOs;
using Microsoft.EntityFrameworkCore;
using Models;
using Serilog;

public interface IShopService : IBaseCrudService<Shop>
{
	Task<bool>              ExistsAsync(int id);
	Task<IEnumerable<Shop>> GetAllShopsWithDayData();
	Task<Shop?>             GetShopWithDayData(int        id);
	Task<bool>              IsNameAndNumberUnique(ShopDto shopDto);
}

public class ShopService : BaseCrudService<Shop>, IShopService
{

	public ShopService(AppDbContext context, ILogger logger) : base( context, logger )
	{

	}

	/// <summary>
	///     Checks if a shopDto with the given id exists
	/// </summary>
	/// <param name="id"></param>
	/// <returns>bool</returns>
	public async Task<bool> ExistsAsync(int id) => await Context.Shops.AnyAsync( s => s.Id == id );

	/// <summary>
	///     Get List of Shops with DayData
	/// </summary>
	/// <returns>List of Shops</returns>
	public async Task<IEnumerable<Shop>> GetAllShopsWithDayData() =>
		await Context.Shops.Include( s => s.DailyRoutePlan ).ToListAsync();

	/// <summary>
	///     Gets Singular Shop with Day data
	/// </summary>
	/// <param name="id"></param>
	/// <returns>Shop Entity</returns>
	public async Task<Shop?> GetShopWithDayData(int id) =>
		await Context.Shops.Include( s => s.DailyRoutePlan ).FirstOrDefaultAsync( s => s.Id == id );

	/// <summary>
	///     Check if a Shop with a given Name and Number Exists
	/// </summary>
	/// <param name="shopDto"></param>
	/// <returns>boolean</returns>
	public async Task<bool> IsNameAndNumberUnique(ShopDto shopDto) =>
		await Context.Shops.AnyAsync( s => s.Name == shopDto.Name && s.Number == shopDto.Number );
}