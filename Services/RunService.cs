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

	Task<int> GetRunIdByNumberAsync(int runNumber);
	Task<Run> GetRunByIdAsync(int       runId);

	Task<Run>           CreateAsync(Run                entity);
	Task<DeliveryPoint> AddDeliveryPointToRunAsync(int runVariantId, DeliveryPoint deliveryPoint);

}

public class RunService : BaseCrudService<Run>, IRunService
{

	public RunService(AppDbContext context, ILogger logger) : base( context, logger )
	{
	}

	
	public async Task<List<Run>> GetAllAsync()
	{
		return await Context.Runs.Include(r => r.DayVariants).ThenInclude(dv => dv.DeliveryPoints).ThenInclude(dp => dp.Shop).AsNoTracking().ToListAsync();
	}

	public async Task<Run> GetRunByIdAsync(int runId)
	{
		if ( !await ExistsAsync( runId ) ) return null;
		Log.Information("RunService.GetRunByIdAsync({@runId}) returned successfully", runId);
		return await Context.Runs.Include( r => r.DayVariants ).ThenInclude( dv => dv.DeliveryPoints ).ThenInclude(dp => dp.Shop).AsNoTracking().FirstOrDefaultAsync( r => r.Id == runId );

	}

	public async Task<bool> ExistsAsync(int id) => await Context.Runs.AnyAsync( r => r.Id == id );

	public async Task<int> GetRunIdByNumberAsync(int runNumber)
	{	
		
		var number = await Context.Runs.Where( r => r.Number == runNumber ).AsNoTracking().Select( r => r.Id ).FirstOrDefaultAsync();
     	
		Log.Information("RunService.GetRunIdByNumberAsync({@runNumber}) returned successfully", runNumber);

		return number;
	}

	public async Task<Run> CreateAsync(Run entity)
	{
		if ( entity == null ) return null;
		await Context.Runs.AddAsync( entity );
		
		var run = Context.Entry(entity);
		
		entity.DayVariants = RunVariant.GenerateRunVariants(entity);
		
		await Context.SaveChangesAsync();
		Log.Information("RunService.CreateAsync({@entity}) returned successfully", entity);
		return entity;
	}

	public async Task<DeliveryPoint> AddDeliveryPointToRunAsync(int runVariantId, DeliveryPoint deliveryPoint)
	{
		
		try
		{ 
			Log.Information( "RunService.AddDeliveryPointToRunAsync({@runVariantId}, {@deliveryPoint}) called",
			                 runVariantId,
			                 deliveryPoint
			);
			await Context.DeliveryPoints.AddAsync( deliveryPoint );
			await Context.SaveChangesAsync();
			Log.Information( "RunService.AddDeliveryPointToRunAsync returned successfully");
			
			return deliveryPoint;
                
		}
		catch ( Exception e )
		{
			Console.WriteLine( e );
			throw;
		}
		
		
	}

	
}