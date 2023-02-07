namespace ShiftTracker.Angular.Services;

using Data;
using DTOs;
using Extentions;
using Microsoft.EntityFrameworkCore;
using Models;

public interface IShiftService : IBaseCrudService<Shift>
{
	Task<Shift?> GetShiftByIdAsync(int id);
	Task<bool>   ExistsAsync(int?      id);
	
	Task<bool> GetShiftByDateAsync(DateTime date);

	Task<List<Shift>> GetAllShiftsAsync();
}

public class ShiftService : BaseCrudService<Shift>, IShiftService
{
	private readonly AppDbContext _context;
	private readonly IBreakService        _breakService;

	public ShiftService(AppDbContext context, IBreakService breakService) : base( context )
	{
		_context = context;
		_breakService = breakService;
	}

	public async Task<Shift?> GetShiftByIdAsync(int id) =>
		await _context.Shifts
		              .Include(s => s.Breaks)
		              .Include(s => s.Run)
		              .FirstOrDefaultAsync( s => s.Id == id );

	/// <summary>
	/// </summary>
	/// <param name="includeBreaks"></param>
	/// <param name="includeRun"></param>
	/// <param name="includeTimeData"></param>
	/// <returns></returns>
	public async Task<List<Shift>> GetAllShiftsAsync()
	{
		
		 var shifts = await _context.Shifts.Include(s => s.Run).ToListAsync();
		 return shifts;
	}

	public async Task<bool> ExistsAsync(int?            id)       => await _context.Shifts.AnyAsync( x => x.Id == id );
	
	/// <summary>
	///     Checks if the shift times add up to the shift duration.
	/// </summary>
	/// <param name="shiftDto"></param>
	/// <returns>True/False</returns>
	// public bool TimeEntryValidator(ShiftDto shiftDto) => shiftDto.ShiftDuration.Equals(
	// 	new TimeSpan(
	// 	)
	// );

	public async Task<bool> GetShiftByDateAsync(DateTime date)
	{
		var findDate = await _context.Shifts.AsNoTracking().FirstOrDefaultAsync( s => s.Date == date );

		if ( findDate != null )
		{
			return true;
		} else
		{
			return false;
		}
	}
}