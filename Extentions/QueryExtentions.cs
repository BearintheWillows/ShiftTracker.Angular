namespace ShiftTracker.Angular.Extentions;

using Microsoft.EntityFrameworkCore;
using Models;

public static class QueryExtentions
{
	public static IQueryable<Shift> IncludeExtraShiftData(
		this IQueryable<Shift> query,
		bool                   includeBreaks,
		bool                   includeRun,
		bool                   includeTimeData
	)
	{
		if ( includeBreaks ) query = query.Include( s => s.Breaks );

		if ( includeRun ) query = query.Include( s => s.Run );

		if ( includeTimeData && includeRun && includeBreaks )
			return query.Select( s => new Shift
					{
					Id = s.Id,
					Date = s.Date,
					RunId = s.RunId,
					StartTime = s.StartTime,
					EndTime = s.EndTime,
					ShiftDuration = s.ShiftDuration,
					BreakDuration = s.BreakDuration,
					OtherWorkTime = s.OtherWorkTime,
					DriveTime = s.DriveTime,
					WorkTime = s.WorkTime,
					Breaks = s.Breaks,
					Run = s.Run,
					}
			);
		if ( !includeTimeData && includeRun && includeBreaks )
			return query.Select( s => new Shift
					{
					Id = s.Id,
					Date = s.Date,
					RunId = s.RunId,
					Breaks = s.Breaks,
					Run = s.Run,
					}
			);
		if ( !includeTimeData && !includeRun && includeBreaks )
			return query.Select( s => new Shift
					{
					Id = s.Id, Date = s.Date, RunId = s.RunId, Breaks = s.Breaks,
					}
			);
		if ( !includeTimeData && !includeBreaks && !includeRun )
			return query.Select( s => new Shift { Id = s.Id, Date = s.Date, RunId = s.RunId } );
		if ( !includeTimeData && includeRun && !includeBreaks )
			return query.Select( s => new Shift { Id = s.Id, Date = s.Date, RunId = s.RunId, Run = s.Run } );
		if ( includeTimeData && !includeRun && includeBreaks )
			return query.Select( s => new Shift
					{
					Id = s.Id,
					Date = s.Date,
					RunId = s.RunId,
					Breaks = s.Breaks,
					StartTime = s.StartTime,
					EndTime = s.EndTime,
					ShiftDuration = s.ShiftDuration,
					DriveTime = s.DriveTime,
					BreakDuration = s.BreakDuration,
					OtherWorkTime = s.OtherWorkTime,
					WorkTime = s.WorkTime,
					}
			);
		if ( includeTimeData && includeRun && !includeBreaks )
			return query.Select( s => new Shift
					{
					Id = s.Id,
					Date = s.Date,
					RunId = s.RunId,
					Run = s.Run,
					StartTime = s.StartTime,
					EndTime = s.EndTime,
					ShiftDuration = s.ShiftDuration,
					DriveTime = s.DriveTime,
					BreakDuration = s.BreakDuration,
					OtherWorkTime = s.OtherWorkTime,
					WorkTime = s.WorkTime,
					}
			);

		return query;
	}

	public static IQueryable<Shop> IncludeDayVariants(
		this IQueryable<Shop> query,
		bool                  includeVariants
	) => query.Include( s => s.DailyRoutePlan );

	public static IQueryable<Run> IncludeDailyDoutePlans(this IQueryable<Run> query, bool includeDRP)
	{
		if ( includeDRP ) return query.Include( s => s.RoutePlans ).ThenInclude( rp => rp.Shop );

		return query;
	}
}