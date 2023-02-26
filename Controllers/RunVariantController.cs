namespace ShiftTracker.Angular.Controllers;

using Microsoft.AspNetCore.Mvc;
using Services;

[ApiController]
[Route( "api/[controller]" )]
public class RunVariantController
{
	
	private readonly RunVariantService _runVariantService;
	private readonly RunService       _runService;
	
	public RunVariantController(RunVariantService runVariantService, RunService runService)
	{
		_runVariantService = runVariantService;
		_runService = runService;
	}
	
	
	
}