﻿namespace ShiftTracker.Angular.DTOs;

public class AuthResponseDto
{
	public bool IsSuccessful { get; set; }
	public string? Token { get; set; }
	public string? ErrorMessage { get; set; }
}