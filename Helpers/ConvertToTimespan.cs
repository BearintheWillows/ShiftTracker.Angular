namespace ShiftTracker.Angular.Helpers;

public static class TimeConverter
{
	public static TimeSpan ConvertToTimeSpan(string time)
	{
		var seconds = 00;
		
		var timeParts = time.Split( ':' );
		var hours = int.Parse( timeParts[0] );
		var minutes = int.Parse( timeParts[1] );
		if ( timeParts.Length == 3 )
		{
			seconds = int.Parse( timeParts[2] );
		}
		
		return new TimeSpan( hours, minutes, seconds );
	}
}