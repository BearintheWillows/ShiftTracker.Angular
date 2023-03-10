namespace ShiftTracker.Angular.Handlers;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Models;

public class JwtHandler
{
	private readonly IConfiguration _configuration;
	private readonly IConfigurationSection _jwtSettings;
	private readonly UserManager<IdentityUser> _userManager;
	
	public JwtHandler(IConfiguration configuration, UserManager<IdentityUser> userManager)
	{
		_configuration = configuration;
		_jwtSettings = _configuration.GetSection( "JwtSettings" );
		_userManager = userManager;
	}
	
	public SigningCredentials GetSigningCredentials()
	{
		var key = Encoding.UTF8.GetBytes( _jwtSettings.GetSection( "securityKey" ).Value );
		var secret = new SymmetricSecurityKey( key );
		return new SigningCredentials( secret, SecurityAlgorithms.HmacSha256 );
	}
	
	public async Task<List<Claim>> GetClaims(AppUser user)
	{
		var claims = new List<Claim>
		{
		new( ClaimTypes.Email, user.Email )
		};
		
		var roles = await _userManager.GetRolesAsync( user );
		foreach ( var role in roles )
		{
			claims.Add( new Claim( ClaimTypes.Role, role ) );
		}

		return claims;
	}
	
	public JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
	{
		var tokenOptions = new JwtSecurityToken(
			issuer: _jwtSettings.GetSection( "issuer" ).Value,
			audience: _jwtSettings.GetSection( "audience" ).Value,
			claims: claims,
			expires: DateTime.Now.AddMinutes( Convert.ToDouble( _jwtSettings.GetSection( "expirationInMinutes" ).Value ) ),
			signingCredentials: signingCredentials
		);
		return tokenOptions;
	}
}