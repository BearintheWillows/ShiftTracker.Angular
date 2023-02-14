namespace ShiftTracker.Angular.Services;

using Data;
using Extentions;
using Microsoft.EntityFrameworkCore;
using Models;
using Serilog;

public interface IRunService : IBaseCrudService<Run>
{
	Task<List<Run>> GetAllAsync(bool includeDRP);
	Task<bool>      ExistsAsync(int  id);

	Task<List<Tuple<int, int>>> GetAllNumbersAndIds();
	
	int        GetRunIdByNumber(int runNumber);
	Task<Run?> GetRunByIdAsync(int  runId, bool includeDRP);
	
}

public class RunService : BaseCrudService<Run>, IRunService
{

	public RunService(AppDbContext context, ILogger logger) : base( context, logger )
	{
	}

	public async Task<List<Run>> GetAllAsync(bool includeDRP)
	{
		if ( includeDRP )
			return await Context.Runs.Include( r => r.RoutePlans ).ThenInclude( r => r.Shop ).ToListAsync();
		
		var runs = await Context.Runs.ToListAsync();
		Log.Information( "RunService.GetAllAsync returned {@runs}.", runs.Count );
		
		return runs;
	}

	public async Task<Run?> GetRunByIdAsync(int runId, bool includeDRP)
	{
		if ( !await ExistsAsync( runId ) ) return null;
		Log.Information("RunService.GetRunByIdAsync({@runId}) returned successfully", runId);
		return await Context.Runs.AsQueryable()
		                     .IncludeDailyDoutePlans( includeDRP )
		                     .FirstOrDefaultAsync( s => s.Id == runId );
		
	}

	public async Task<bool> ExistsAsync(int id) => await Context.Runs.AnyAsync( r => r.Id == id );

	/// <summary>
	///     Returns a List of tuples containing the Run Id {0} and the Run Number {1}
	/// </summary>
	/// <returns>Tuple</returns>
	public async Task<List<Tuple<int, int>>> GetAllNumbersAndIds() =>
		await Context.Runs.Select( r => new Tuple<int, int>( r.Id, r.Number ) ).ToListAsync();


	public int GetRunIdByNumber(int runNumber)
	{
		return Context.Runs.AsQueryable().Where( r => r.Number == runNumber ).Select( r => r.Id ).FirstOrDefault();
	}
}