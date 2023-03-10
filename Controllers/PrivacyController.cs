namespace ShiftTracker.Angular.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class PrivacyController : Controller
{
	[HttpGet]
	[Authorize(Roles = "Admin")]
	public IActionResult Privacy()
	{
		var claims = User.Claims
		                 .Select(c => new { c.Type, c.Value })
		                 .ToList();

		return Ok(claims);
	}
}