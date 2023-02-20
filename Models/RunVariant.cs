namespace ShiftTracker.Angular.Models;

public class RunVariant
{
	public int       Id        { get; set; }
	public DayOfWeek DayOfWeek { get; set; }
	public DateTime? StartTime { get; set; } = null;

	public int RunId { get; set; }
	public Run Run { get; set; }

	public ICollection<DeliveryPoint> DeliveryPoints { get; set; } = new List<DeliveryPoint>();

	public void UpdateDropNumbers()
	{
		var entities = this.DeliveryPoints
		                   .Where( dp => dp.RunVariantId == this.Id && dp.DayOfWeek == this.DayOfWeek )
		                   .OrderBy( dp => dp.DropNumber )
		                   .ToList();

		bool isInOrder = true;

		for ( int i = 0; i < entities.Count; i++ )
		{
			if ( entities[ i ].DropNumber != i + 1 )
			{
				isInOrder = false;
				break;
			}
		}

		if ( !isInOrder )
		{
			for ( int i = 0; i < entities.Count; i++ )
			{
				entities[ i ].DropNumber = i + 1;
			}
		}
	}
	
	public static List<RunVariant> GenerateRunVariants(Run run)
	{
		var variants = new List<RunVariant>();
		for ( int i = 0; i < 7; i++ )
		{
			variants.Add( new RunVariant()
				{
				DayOfWeek = (DayOfWeek) i,
				RunId = run.Id
				
				} );
		}

		return variants;
	}
}