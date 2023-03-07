﻿namespace ShiftTracker.Angular.DTOs;

using System.ComponentModel.DataAnnotations;

public class UserForAuthenticationDto
{
	[Required(ErrorMessage = "Email is required")]
	public string? Email    { get; set; }
	
	[Required(ErrorMessage = "Password is required")]
	public string? Password { get; set; }
}