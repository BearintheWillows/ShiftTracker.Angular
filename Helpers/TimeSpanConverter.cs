namespace ShiftTracker.Angular.Helpers;

using System.Globalization;
using Newtonsoft.Json;

public class TimeSpanConverter : JsonConverter
{
	public TimeSpanConverter()
	{
	}
	
	public override void WriteJson(JsonWriter writer, object? value, JsonSerializer serializer)
	{
		TimeSpan timeSpan = ( TimeSpan ) value;
		writer.WriteValue( timeSpan.ToString( @"hh\:mm" ) );
	}


	public override object? ReadJson(
		JsonReader     reader,
		Type           objectType,
		object?        existingValue,
		JsonSerializer serializer
	)
	{
		string timeSpanString = ( string ) reader.Value;
		return TimeSpan.ParseExact( timeSpanString, @"hh\:mm", CultureInfo.InvariantCulture );
	}

	public override bool CanConvert(Type objectType)
	{
		return objectType == typeof(TimeSpan);
	}
}