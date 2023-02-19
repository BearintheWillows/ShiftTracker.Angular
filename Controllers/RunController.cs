using Microsoft.AspNetCore.Mvc;

namespace ShiftTracker.Angular.Controllers;

using DTOs;
using Models;
using Serilog;
using Services;

[ApiController]
[Route( "api/[controller]" )]

public class RunController : Controller
{
	private readonly IRunService _runService;
	private ILogger Log { get; }
	
		public RunController(IRunService runService, ILogger logger)
	{
		_runService = runService;
		Log = logger;
	}
		
		[HttpGet]
		public async Task<IActionResult> GetAllRuns()
		{
			try
			{
				var runResultAsync = await _runService.GetAllAsync();
				Log.Information("RunController.GetAllRuns() returned {@runResultAsync} Successfully", runResultAsync.Count());
				return Ok( runResultAsync );
				
			}
			catch ( Exception e )
			{
				
				return BadRequest();
			}
		}
		
		[HttpGet( "/runNumber/{runNumber}" )]
		public IActionResult GetRunByRunNumber( int runNumber )
		{
			try
			{
				var runResultAsync = _runService.GetRunIdByNumberAsync( runNumber );
				return Ok( runResultAsync );
			}
			catch ( Exception e )
			{
				Console.WriteLine( e );
				return BadRequest();
			}
		}
		
		[HttpGet( "{runId}" )]
		public async Task<ActionResult<Run>> GetRunById( int runId )
		{
			IQueryable<Run> runResultAsync = await _runService.GetRunByIdAsync( runId);
			Log.Information("RunController.GetRunById({@runId}) returned {@runResultAsync} Successfully", runId, runResultAsync);
			try
			{
			return Ok( runResultAsync);
			}
			catch ( Exception e )
			{
				Console.WriteLine( e );
				return BadRequest();
			}
		}

		[HttpPost]
		public async Task<ActionResult<Run>> CreateRun([FromBody] RunDto runDto)
		{
			var run = new Run(runDto.Number, runDto.Location);
			{
				try
				{ 
					var runResultAsync = await _runService.CreateAsync(run);
                  				Log.Information( "RunController.CreateRun({@run}) returned {@runResultAsync} Successfully",
                  				                 run,
                  				                 runResultAsync
                  				);
					
                                					return Ok( new RunDto(runResultAsync.Id, runResultAsync.Number, runResultAsync.Location, null));
				}
				catch ( Exception e )
				{
					Console.WriteLine( e );
					throw;
				}
				
				
			}
			
		}
		
		[HttpPost("{runId}/addDeliveryPoint")]
		public async Task<ActionResult<Run>> AddDeliveryPointToRun(int runId,[FromQuery] DayOfWeek dayOfWeek, [FromBody] DeliveryPointDto deliveryPointDto)
		{
			var deliveryPoint = new DeliveryPoint(deliveryPointDto.DropNumber, (DayOfWeek)deliveryPointDto.DayOfWeek, deliveryPointDto.WindowOpenTime, deliveryPointDto.WindowCloseTime, deliveryPointDto.RunVariantId, deliveryPointDto.ShopId);
			{
				try
				{
					var runResultAsync = await _runService.AddDeliveryPointToRunAsync(runId, dayOfWeek, deliveryPoint);
					Log.Information( "RunController.AddDeliveryPointToRun({@runId}, {@dayOfWeek}, {@deliveryPoint}) returned {@runResultAsync} Successfully",
					                 runId,
					                 dayOfWeek,
					                 deliveryPoint,
					                 runResultAsync
					);
					return Ok( new RunDto( runResultAsync.Id, runResultAsync.Number, runResultAsync.Location, null ) );
				}
				catch ( Exception e )
				{
					Console.WriteLine( e );
					throw;
				}
			}
		}
		
		

}