namespace ShiftTracker.Angular.Controllers;

using AutoMapper;
using DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models;
using Serilog;

[ApiController]
[Route( "api/[controller]" )]
public class AccountsController : Controller
{
	private readonly UserManager<AppUser> _userManager;
	private readonly IMapper _mapper;
	
	public AccountsController(UserManager<AppUser> userManager, IMapper mapper)
	{
		_userManager = userManager;
		_mapper = mapper;
	}
	
	[HttpPost( "register" )]
	public async Task<IActionResult> Register([FromBody] UserForRegistrationDto userForRegistration)
	{
		if (userForRegistration == null || !ModelState.IsValid)
		{
			Log.Error( "UserForRegistrationDto is null or ModelState is invalid" );
			return BadRequest( ModelState );
		}
		var userToCreate = new AppUser();
		
		
		userToCreate = _mapper.Map<AppUser>( userForRegistration );

		
		Log.Information( "Attempting to create user {userToCreate}", userToCreate );
		
	
		var result = await _userManager.CreateAsync( userToCreate, userForRegistration.Password );
		
		if (!result.Succeeded)
		{

			var errors = new List<string>();
			foreach (var error in result.Errors)
			{
				errors = result.Errors.Select( e => e.Description ).ToList();
			}
			return BadRequest( new RegistrationResponseDto()
				{
				IsSuccessful = false,
				Errors = errors
				} );
		}
		
		return StatusCode( 201 );
	}
}