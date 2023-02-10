namespace ShiftTracker.Angular.Services;

using Data;
using Microsoft.EntityFrameworkCore;
using Models;
using Serilog;

public interface IDailyRoutePlanService : IBaseCrudService<DailyRoutePlan>
{
	Task<List<DailyRoutePlan>> GetRoutesForRunAsync(int         id);
	Task<List<DailyRoutePlan>> GetRouteForRunDayFilterAsync(int runId, DayOfWeek day);
	Task<bool>                 RunRouteExistsAsync(int          id);
}

public class DailyRoutePlanService : BaseCrudService<DailyRoutePlan>, IDailyRoutePlanService
{

	public DailyRoutePlanService(AppDbContext context, ILogger logger) : base( context, logger )
	{
	
	}

	//get all routes for a run
	public async Task<List<DailyRoutePlan>> GetRoutesForRunAsync(int id) =>
		await Context.DailyRoutes.Where( x => x.RunId == id ).ToListAsync();

	public async Task<List<DailyRoutePlan>> GetRouteForRunDayFilterAsync(int runId, DayOfWeek day) =>
		await Context.DailyRoutes.Where( dr => dr.RunId == runId && dr.DayOfWeek == day ).ToListAsync();


	public async Task<bool> RunRouteExistsAsync(int number) =>
		await Context.DailyRoutes.Include( dr => dr.Run ).AnyAsync( x => x.Run.Number == number );
}