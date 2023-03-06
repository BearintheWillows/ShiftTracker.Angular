namespace ShiftTracker.Angular.DTOs;

public class LoginResponseDto
{
	public bool isSuccessful { get; set; }
	public string? token { get; set; }
	public string? errorMessage { get; set; }
}