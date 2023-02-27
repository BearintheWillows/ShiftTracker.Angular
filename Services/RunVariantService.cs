namespace ShiftTracker.Angular.Services;

using Data;
using Data.AppDbContext;
using Models;
using Serilog;

public interface IRunVariantService : IBaseCrudService<RunVariant>
{
	
	
}


public class RunVariantService : BaseCrudService<RunVariant>, IRunVariantService
	{

		public RunVariantService(AppDbContext context, ILogger logger) : base( context, logger )
		{
		}
		
	}