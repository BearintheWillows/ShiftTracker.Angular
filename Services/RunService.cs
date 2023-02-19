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

	Task<int>             GetRunIdByNumberAsync(int runNumber);
	Task<IQueryable<Run>> GetRunByIdAsync(int       runId);

	Task<Run> CreateAsync(Run                entity);
	Task<Run> AddDeliveryPointToRunAsync(int runId, DayOfWeek dayOfWeek, DeliveryPoint deliveryPoint);
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

	public async Task<IQueryable<Run>> GetRunByIdAsync(int runId)
	{
		if ( !await ExistsAsync( runId ) ) return null;
		Log.Information("RunService.GetRunByIdAsync({@runId}) returned successfully", runId);
		return Context.Runs.Include( r => r.DayVariants ).ThenInclude( dv => dv.DeliveryPoints )
		                    .Where( r => r.Id == runId );

	}

	public async Task<bool> ExistsAsync(int id) => await Context.Runs.AnyAsync( r => r.Id == id );

	public async Task<int> GetRunIdByNumberAsync(int runNumber)
	{
		return Context.Runs.AsQueryable().Where( r => r.Number == runNumber ).Select( r => r.Id ).FirstOrDefault();
	}

	public async Task<Run> CreateAsync(Run entity)
	{
		if ( entity == null ) return null;
		await Context.Runs.AddAsync( entity );
		await Context.SaveChangesAsync();
		Log.Information("RunService.CreateAsync({@entity}) returned successfully", entity);
		return entity;
	}

	public async Task<Run> AddDeliveryPointToRunAsync(int runId, DayOfWeek dayOfWeek, DeliveryPoint deliveryPoint)
	{
		
var run = await Context.Runs.Include( r => r.DayVariants ).ThenInclude( dv => dv.DeliveryPoints )
		                            .FirstOrDefaultAsync( r => r.Id == runId );
		if ( run == null ) return null;
		var dayVariant = run.DayVariants.FirstOrDefault( dv => dv.DayOfWeek == dayOfWeek );
		Log.Information("RunService.AddDeliveryPointToRunAsync({@runId}, {@dayOfWeek}, {@deliveryPoint}) returned successfully", runId, dayOfWeek, deliveryPoint);
		

		deliveryPoint.RunVariantId = deliveryPoint.RunVariantId;
		deliveryPoint.DayOfWeek    = (DayOfWeek)dayOfWeek;
		await Context.DeliveryPoints.AddAsync( deliveryPoint );
		await Context.SaveChangesAsync();
		Log.Information("RunService.AddDeliveryPointToRunAsync({@runId}, {@dayOfWeek}, {@deliveryPoint}) returned successfully", runId, dayOfWeek, deliveryPoint);
		return run;
	}
}