namespace ShiftTracker.Angular.Controllers;

using System.Globalization;
using System.Text.Json.Serialization;
using DTOs;
using Microsoft.AspNetCore.Mvc;
using Models;
using Newtonsoft.Json;
using Serilog;
using Services;
using static Helpers.TimeConverter;

[ApiController]
[Route( "api/[controller]" )]
public class ShiftController : ControllerBase
{
	private readonly IRunService   _runService;
	private readonly IShiftService _shiftService;
	private          ILogger       Log { get; set; }
	
	public ShiftController(ILogger logger,IShiftService shiftService, IRunService runService)
	{
		_shiftService = shiftService;
		_runService = runService;
		Log = logger;
	}

	/// <summary>
	///     Get all Shifts without Time Data///
	/// </summary>
	/// <param name="includeRun"></param>
	/// <param name="includeBreaks"></param>
	/// <param name="includeTimeData"></param>
	/// <returns>
	///     All Shift entities
	/// </returns>
	[HttpGet]
	public async Task<IActionResult> GetAllShifts()
	{
		var dtolist = new List<ShiftDto?>();
		try
		{
			var shiftResultAsync = await _shiftService.GetAllShiftsAsync();

			foreach ( var shift in shiftResultAsync )
			{
				dtolist.Add( ShiftDto.CreateDto( shift ) );
			}
			
			return Ok( dtolist);
		}
		catch ( Exception e )
		{
			Console.WriteLine( e );
			return BadRequest();
		}
	}
	
	[HttpPost("create")]
	public async Task<IActionResult> CreateShift([FromBody] ShiftDto shiftDto)
	{
		var shift = new Shift();
		shift = new Shift()
			{
			Date = shiftDto.Date,
			StartTime = shiftDto.StartTime,
			EndTime = shiftDto.EndTime,
			BreakDuration = shiftDto.BreakDuration,
			DriveTime = shiftDto.DriveTime,
			ShiftDuration = shiftDto.ShiftDuration,
			OtherWorkTime = shiftDto.OtherWorkTime,
			WorkTime = shiftDto.WorkTime,
			RunId = shiftDto.RunId,
			Run = await _runService.GetRunByIdAsync(shiftDto.RunId, false),
			Breaks = new List<Break>(),
			};
	
		try
		{
			
			await _shiftService.AddAsync( shift );
			Log.Information("Shift {@shift.Id} saved", shift.Id);
			return Ok();
		}
		catch ( Exception e )
		{
			Log.Error( "Shift did it save" );
			return BadRequest( "Error creating shift" );
		}
	}
	

	/// <summary>
	///     Get Shift by Id
	/// </summary>
	/// <param name="id"></param>
	/// <param name="includeRun"></param>
	/// <param name="includeBreaks"></param>
	/// <param name="includeTimeData"></param>
	/// <returns></returns>
	[HttpGet( "{id}" )]
	public async Task<ActionResult<ShiftDto?>> GetShiftById(int id)
	{
		try
		{
			var shift = await _shiftService.GetShiftByIdAsync( id );
			
			if ( shift != null )
			{
				Log.Information("ShiftController-GetShiftById ... Shift {@shift} found", shift.Id);

				return ShiftDto.CreateDto( shift );
			}
			Log.Error("ShiftController-GetShiftById ... Shift {@shift} not found", shift.Id);
			return BadRequest( "Shift not found" );
		}
		catch ( Exception e )
		{
			Log.Error("ShiftController-GetShiftById ... Shift with Id of {Id} not found", id);
			Log.Debug("ShiftController-GetShiftById ... Error {@e}", e);
			return BadRequest( "Error getting shift" );
		}
	}


	/// <summary>
	///     Creates a new shift.
	///     ShiftWithTimeDataDto is used to create a new shift with time data.
	/// </summary>
	/// <param name="shiftDto"></param>
	/// <returns></returns>

	[HttpDelete( "{id}" )]
	public async Task<ActionResult> DeleteShift(int id)
	{
		try
		{
			if ( !await _shiftService.ExistsAsync( id ) ) return NotFound( "Shift not found" );

			await _shiftService.DeleteAsync( id );
			return Ok( "Shift Deleted Successfully" );
		}
		catch ( Exception e )
		{
			Console.WriteLine( e );
			return BadRequest( "Error deleting shift" );
		}
	}

	[HttpPut( "{id}" )]
	public async Task<IActionResult> UpdateShift(int id, [FromBody] ShiftDto shiftDto)
	{
		try
		{
			var shift = await _shiftService.GetShiftByIdAsync( id );
			if ( shift == null ) return NotFound( "Shift not found" );
			Log.Information( "ShiftController.UpdateShift ... Shift with Id {@id} has been found", id );
			shift.Date = shiftDto.Date;
			shift.StartTime = shiftDto.StartTime;
			shift.EndTime = shiftDto.EndTime;
			shift.BreakDuration = shiftDto.BreakDuration;
			shift.DriveTime = shiftDto.DriveTime;
			shift.ShiftDuration = shiftDto.ShiftDuration;
			shift.OtherWorkTime = shiftDto.OtherWorkTime;
			shift.WorkTime = shiftDto.WorkTime;
			shift.ShiftDuration = shiftDto.ShiftDuration;
			shift.RunId = shiftDto.RunId;
			shift.Breaks = new List<Break>();
			var run = await _runService.GetAsync( shiftDto.RunId );
			if ( run != null)
			{
				shift.Run = run;
			}
			await _shiftService.UpdateAsync( shift );
			return Ok();
		}
		catch ( Exception e )
		{
			Console.WriteLine( e );
			return BadRequest( "Error updating shift" );
		}
	}

	[HttpGet( "checkDateInUse" )]
	public async Task<ActionResult> checkDateInUse([FromQuery]string date)
	{
		DateTime date1 = DateTime.ParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture);
		bool shift = await _shiftService.GetShiftByDateAsync( date1);

		Console.WriteLine("Shift Controller" + "" + shift);
		if (shift)
		{
			return Ok(true);
		}
		else
		{
			return Ok(false);
		}
	}
}