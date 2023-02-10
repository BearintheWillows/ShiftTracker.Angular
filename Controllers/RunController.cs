using Microsoft.AspNetCore.Mvc;

namespace ShiftTracker.Angular.Controllers;

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
				var runResultAsync = _runService.GetRunIdByNumber( runNumber );
				return Ok( runResultAsync );
			}
			catch ( Exception e )
			{
				Console.WriteLine( e );
				return BadRequest();
			}
		}
	}