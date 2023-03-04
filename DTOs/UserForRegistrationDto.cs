namespace ShiftTracker.Angular.DTOs;

using System.ComponentModel.DataAnnotations;

public class UserForRegistrationDto
{
	public string? FirstName { get; set; }
	public string? LastName { get; set; }
	
	[Required(ErrorMessage = "Username is required")]
	[MinLength(3, ErrorMessage = "Username must be at least 3 characters")]
	public string? UserName { get; set; }
	
	
	
	[Required(ErrorMessage = "Email is required")]
	[EmailAddress(ErrorMessage = "Invalid email address")]
	public string? Email { get; set; }
	
	[Required(ErrorMessage = "Password is required")]
	public string? Password { get; set; }
	
	[Compare("Password", ErrorMessage = "Passwords do not match")]
	public string? ConfirmPassword { get; set; }
}