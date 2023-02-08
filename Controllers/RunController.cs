using Microsoft.AspNetCore.Mvc;

namespace ShiftTracker.Angular.Controllers;

using Services;

[ApiController]
[Route( "api/[controller]" )]

public class RunController : Controller
{
	private readonly IRunService _runService;
	
		public RunController(IRunService runService)
	{
		_runService = runService;
	}
		
		[HttpGet]
		public async Task<IActionResult> GetAllRuns()
		{
			try
			{
				var runResultAsync = await _runService.GetAllAsync();
				return Ok( runResultAsync );
			}
			catch ( Exception e )
			{
				Console.WriteLine( e );
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