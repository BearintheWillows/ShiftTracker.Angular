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
				var runResultAsync = _runService.GetRunIdByNumber( runNumber );
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
			Run runResultAsync = await _runService.GetRunByIdAsync( runId, false );
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
		
		[HttpGet("{id}/includeDRP")]
		public async Task<ActionResult<RunDto>> GetRunByIdWithDRP(int id)
		{
			Run runResultAsync = await _runService.GetRunByIdAsync(id, true);
			Log.Information("RunController.GetRunByIdWithDRP({@id}) returned {@runResultAsync} Successfully", id, runResultAsync);
			
			RunDto resultConversion = RunDto.CreateRunDto(runResultAsync, true);
			try
			{
				return Ok(resultConversion);
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
				return BadRequest();
			}
		}

}