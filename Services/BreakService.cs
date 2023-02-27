namespace ShiftTracker.Angular.Services;

using Data;
using Data.AppDbContext;
using Microsoft.EntityFrameworkCore;
using Models;
using Serilog;

public interface IBreakService : IBaseCrudService<Break>
{
	Task<bool>               ExistsAsync(int?                      id);
	Task<IEnumerable<Break>> GetAllAsyncByShiftId(int              shiftId);
	Task                     PostAllBreaksAsync(IEnumerable<Break> breaks);
	
}

public class BreakService : BaseCrudService<Break>, IBreakService
{

	public BreakService(AppDbContext context, ILogger logger) : base( context, logger )
	{
		Log = logger;
	}

	public async Task PostAllBreaksAsync(IEnumerable<Break> breaks)
	{
		await Context.Breaks.AddRangeAsync( breaks );
		await Context.SaveChangesAsync();
	}

	public async Task<bool> ExistsAsync(int? id) => await Context.Breaks.AnyAsync( s => s.Id == id );

	public async Task<IEnumerable<Break>> GetAllAsyncByShiftId(int shiftId)
	{
		return await Context.Breaks.Where( s => s.ShiftId == shiftId ).ToListAsync();
		
	}
	
}