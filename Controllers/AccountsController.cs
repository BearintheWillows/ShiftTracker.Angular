namespace ShiftTracker.Angular.Controllers;

using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using DTOs;
using Handlers;
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
	private readonly JwtHandler _jwtHandler;
	
	public AccountsController(UserManager<AppUser> userManager, IMapper mapper, JwtHandler jwtHandler )
	{
		_userManager = userManager;
		_mapper = mapper;
		_jwtHandler = jwtHandler;
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
		
		await _userManager.AddToRoleAsync( userToCreate, "Employee" );
		
		return StatusCode( 201 );
	}
	
	[HttpPost( "login" )]
	public async Task<IActionResult> Login([FromBody] UserForAuthenticationDto userForAuthentication)
	{
		if (userForAuthentication == null)
		{
			Log.Error( "UserForAuthenticationDto is null" );
			return BadRequest( "Invalid client request" );
		}
	
		var user = await _userManager.FindByEmailAsync( userForAuthentication.Email );
	
		if (user == null || !await _userManager.CheckPasswordAsync( user, userForAuthentication.Password ))
		{
			Log.Error( "User is null or password is incorrect" );
			return Unauthorized( new AuthResponseDto()
			{
				IsSuccessful = false,
				ErrorMessage = "Invalid Authentication"
			} );
		}
		
		var signingCredentials = _jwtHandler.GetSigningCredentials();
		var claims = await _jwtHandler.GetClaims( user );
		var tokenOptions = _jwtHandler.GenerateTokenOptions( signingCredentials, claims );
		var token = new JwtSecurityTokenHandler().WriteToken( tokenOptions );
		
		return Ok( new AuthResponseDto()
		{
			IsSuccessful = true,
			Token = token
		} );
	}

}