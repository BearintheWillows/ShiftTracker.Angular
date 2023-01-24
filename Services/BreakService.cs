namespace ShiftTracker.Angular.Services;

using Data;
using Microsoft.EntityFrameworkCore;
using Models;

public interface IBreakService : IBaseCrudService<Break>
{
	Task<bool>               ExistsAsync(int?                      id);
	Task<IEnumerable<Break>> GetAllAsyncByShiftId(int              shiftId);
	Task                     PostAllBreaksAsync(IEnumerable<Break> breaks);
	
}

public class BreakService : BaseCrudService<Break>, IBreakService
{
	private readonly AppDbContext _context;

	public BreakService(AppDbContext context) : base( context )
	{
		_context = context;
	}

	public async Task PostAllBreaksAsync(IEnumerable<Break> breaks)
	{
		await _context.Breaks.AddRangeAsync( breaks );
		await _context.SaveChangesAsync();
	}

	public async Task<bool> ExistsAsync(int? id) => await _context.Breaks.AnyAsync( s => s.Id == id );

	public async Task<IEnumerable<Break>> GetAllAsyncByShiftId(int shiftId)
	{
		return await _context.Breaks.Where( s => s.ShiftId == shiftId ).ToListAsync();
		
	}
	
}