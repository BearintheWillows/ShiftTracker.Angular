namespace ShiftTracker.Angular.Models;

using Microsoft.AspNetCore.Identity;

public class User : IdentityUser
{
	public string? FirstName { get; set; }
	public string? LastName { get; set; }
	
	public List<Shift> Shifts { get; set; }
}