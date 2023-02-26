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
		
		[HttpPost("runVariant/{runVariantId:int}/addDeliveryPoint")]
		public async Task<ActionResult<Run>> AddDeliveryPointToRun(int runVariantId, [FromBody] DeliveryPointDto deliveryPointDto)
		{
			var deliveryPoint = new DeliveryPoint(deliveryPointDto.DropNumber, (DayOfWeek)deliveryPointDto.DayOfWeek, deliveryPointDto.WindowOpenTime, deliveryPointDto.WindowCloseTime, deliveryPointDto.RunVariantId, deliveryPointDto.ShopId);
			Log.Information( "RunController.AddDeliveryPointToRun({@runVariantId}, {@deliveryPoint}) called",
			                 runVariantId,
			                 deliveryPoint);
			{
				try
				{
					var runResultAsync = await _runService.AddDeliveryPointToRunAsync(runVariantId, deliveryPoint);
					
					Log.Information( "RunController.AddDeliveryPointToRun({@runVariantId}, {@deliveryPoint}) returned {@runResultAsync} Successfully",
					                 runVariantId,
					                 deliveryPoint,
					                 runResultAsync
					);
					return Ok( runResultAsync );
				}
				catch ( Exception e )
				{
					Log.Error( "RunController.AddDeliveryPointToRun({@runVariantId}, {@deliveryPoint}) returned {@runResultAsync} Successfully",
					           runVariantId,
					           deliveryPoint,
					           e
					);
					return BadRequest();
				}
			}
		}
		
	
		

}