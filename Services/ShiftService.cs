namespace ShiftTracker.Angular.Services;

using Data;
using Data.AppDbContext;
using DTOs;
using Extentions;
using Microsoft.EntityFrameworkCore;
using Models;
using Serilog;

public interface IShiftService : IBaseCrudService<Shift>
{
	Task<Shift?> GetShiftByIdAsync(int id);
	Task<bool>   ExistsAsync(int?      id);
	
	Task<bool> GetShiftByDateAsync(DateTime date);

	Task<List<Shift>> GetAllShiftsAsync();
}

public class ShiftService : BaseCrudService<Shift>, IShiftService
{
	private readonly IBreakService _breakService;

	public ShiftService(ILogger logger, AppDbContext context, IBreakService breakService) : base( context, logger )
	{
		_breakService = breakService;
	}

	public async Task<Shift?> GetShiftByIdAsync(int id) =>
		await Context.Shifts
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
		
		 var shifts = await Context.Shifts.Include(s => s.Run).ToListAsync();
		 Log.Information( "Shifts Retrieved from ShiftsService - GetAllShiftsAsync: {@shifts}", shifts.Count );
		 return shifts;
	}

	public async Task<bool> ExistsAsync(int?            id)       => await Context.Shifts.AnyAsync( x => x.Id == id );
	
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
		var findDate = await Context.Shifts.AsNoTracking().FirstOrDefaultAsync( s => s.Date == date );

		if ( findDate != null )
		{
			return true;
		} else
		{
			return false;
		}
	}
}