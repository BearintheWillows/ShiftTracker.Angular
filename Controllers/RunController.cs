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
				List<Run> runResultAsync = await _runService.GetAllAsync();

				IEnumerable < RunDto > runs = RunDto.CreateRunDtoList( runResultAsync );


				return Ok( runs );
				
			}
			catch ( Exception e )
			{
				
				return BadRequest();
			}
		}
		
		[HttpGet( "{runId}" )]
		public async Task<IActionResult> GetRunById( int runId )
		{
			try
			{
				Run runResultAsync = await _runService.GetRunByIdAsync( runId);
				Log.Information("RunController.GetRunById({@runId}) returned {@runResultAsync} Successfully", runId, runResultAsync);
				
				RunDto runDto = RunDto.CreateRunDto( runResultAsync );
				return Ok(runDto);
			}
			catch ( Exception e )
			{
				Console.WriteLine( e );
				return BadRequest();
			}
		}
		
		[HttpGet( "number/{runNumber}" )]
		public async Task<ActionResult> GetRunIdByRunNumber( int runNumber )
		{
			try
			{
				int runResultAsync = await _runService.GetRunIdByNumberAsync( runNumber );

				Log.Information( "RunController.GetRunIdByRunNumber({@runNumber}) returned {@runResultAsync} Successfully", runNumber, runResultAsync );
				var returnedId = runResultAsync;
				return Ok( returnedId );
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
					
                                					return Ok( RunDto.CreateRunDto(runResultAsync));
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