namespace ShiftTracker.Angular.Services;

using Data;
using Extentions;
using Microsoft.EntityFrameworkCore;
using Models;
using Serilog;

public interface IRunService : IBaseCrudService<Run>
{
	Task<List<Run>> GetAllAsync();
	Task<bool>      ExistsAsync(int  id);

	Task<List<Tuple<int, int>>> GetAllNumbersAndIds();
	
	Task<int> GetRunIdByNumber(int runNumber);
	Task<Run> GetRunByIdAsync(int  runId);
	
}

public class RunService : BaseCrudService<Run>, IRunService
{

	public RunService(AppDbContext context, ILogger logger) : base( context, logger )
	{
	}

	public async Task<List<Run>> GetAllAsync()
	{
		return await Context.Runs.Include(r => r.DayVariants).ThenInclude(dv => dv.DeliveryPoints).ThenInclude(dp => dp.Shop).ToListAsync();
	}

	public async Task<IQueryable<Run>> GetRunByIdAsync(int runId, bool includeDRP)
	{
		if ( !await ExistsAsync( runId ) ) return null;
		Log.Information("RunService.GetRunByIdAsync({@runId}) returned successfully", runId);
		return Context.Runs.Include( r => r.DayVariants ).ThenInclude( dv => dv.DeliveryPoints )
		                    .Where( r => r.Id == runId );

	}

	public async Task<bool> ExistsAsync(int id) => await Context.Runs.AnyAsync( r => r.Id == id );

	/// <summary>
	///     Returns a List of tuples containing the Run Id {0} and the Run Number {1}
	/// </summary>
	/// <returns>Tuple</returns>
	public async Task<List<Tuple<int, int>>> GetAllNumbersAndIds() =>
		await Context.Runs.Select( r => new Tuple<int, int>( r.Id, r.Number ) ).ToListAsync();


	public async Task<int> GetRunIdByNumber(int runNumber)
	{
		return Context.Runs.AsQueryable().Where( r => r.Number == runNumber ).Select( r => r.Id ).FirstOrDefault();
	}

	public async Task<Run> GetRunByIdAsync(int runId) => throw new NotImplementedException();
}