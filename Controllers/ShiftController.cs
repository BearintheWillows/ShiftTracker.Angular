namespace ShiftTracker.Angular.Controllers;

using DTOs;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

[ApiController]
[Route( "api/[controller]" )]
public class ShiftController : ControllerBase
{
	private readonly IRunService   _runService;
	private readonly IShiftService _shiftService;

	public ShiftController(IShiftService shiftService, IRunService runService)
	{
		_shiftService = shiftService;
		_runService = runService;
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
	public async Task<IActionResult> GetAllShifts(
		[FromQuery] bool includeRun = true    ,
		bool             includeBreaks = false   ,
		bool             includeTimeData = true
	)
	{
		try
		{
			var shiftResultAsync =
				await _shiftService.GetAllAsync( includeBreaks, includeRun, includeTimeData );
			Console.WriteLine("Shift Controller" + "" + shiftResultAsync.Count);
			var shifts = shiftResultAsync.Select( s => ShiftDto.CreateDto(s, (includeBreaks, includeRun, includeTimeData)
			                                      )).ToList();
		return Ok( shifts );
		}
		catch ( Exception e )
		{
			Console.WriteLine( e );
			return BadRequest();
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
	public async Task<ActionResult<ShiftDto?>> GetShiftById(
		int              id,
		[FromQuery] bool includeRun      = true,
		bool             includeBreaks   = false,
		bool             includeTimeData = true
	)
	{
		try
		{
			var shift = await _shiftService.GetShiftByIdAsync( id);

			if ( shift != null ) return ShiftDto.CreateDto( shift, ( includeBreaks, includeRun, includeTimeData ) );

			return BadRequest( "Shift not found" );
		}
		catch ( Exception e )
		{
			Console.WriteLine( e );
			return BadRequest( "Error getting shift" );
		}
	}


	/// <summary>
	///     Creates a new shift.
	///     ShiftWithTimeDataDto is used to create a new shift with time data.
	/// </summary>
	/// <param name="shiftDto"></param>
	/// <returns></returns>
	[HttpPost]
	public async Task<ActionResult?> AddShift([FromBody] ShiftDto shiftDto)
	{
		if ( !_shiftService.TimeEntryValidator( shiftDto ) )
			return BadRequest( "Time entries do not add up to shift duration total" );

		try
		{
			var shift = new Shift
				{
				Date = shiftDto.Date,
				RunId = shiftDto.RunId,
				Breaks = new List<Break>(),
				StartTime = shiftDto.StartTime,
				EndTime = shiftDto.EndTime,
				BreakDuration = shiftDto.BreakDuration,
				DriveTime = shiftDto.DriveTime,
				ShiftDuration = shiftDto.ShiftDuration,
				OtherWorkTime = shiftDto.OtherWorkTime,
				WorkTime = shiftDto.WorkTime,
				};
			shift = await _shiftService.AddAsync( shift );
			shiftDto.Id = shift.Id;
			return Ok( shiftDto );
		}
		catch ( Exception e )
		{
			Console.WriteLine( e );
			return BadRequest( null );
		}
	}

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
		// if ( !_shiftService.TimeEntryValidator( shiftDto ) )
		// 	return BadRequest( "Time entries do not add up to shift duration total" );

		try
		{
			var shift = await _shiftService.GetAsync( id );
			if ( shift == null ) return NotFound( "Shift not found" );

			shift.Date = shiftDto.Date;
			shift.RunId = shiftDto.RunId;
			shift.StartTime = shiftDto.StartTime;
			shift.EndTime = shiftDto.EndTime;
			shift.BreakDuration = shiftDto.BreakDuration;
			shift.DriveTime = shiftDto.DriveTime;
			shift.ShiftDuration = shiftDto.ShiftDuration;
			shift.OtherWorkTime = shiftDto.OtherWorkTime;
			shift.WorkTime = shiftDto.WorkTime;

			await _shiftService.UpdateAsync( shift );
			return Ok();
		}
		catch ( Exception e )
		{
			Console.WriteLine( e );
			return BadRequest( "Error updating shift" );
		}
	}
}