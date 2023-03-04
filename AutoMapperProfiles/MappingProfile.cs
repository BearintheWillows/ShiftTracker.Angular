namespace ShiftTracker.Angular.AutoMapperProfiles;

using AutoMapper;
using DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Models;
public class MappingProfile : Profile
{
	public MappingProfile()
	{
		CreateMap<UserForRegistrationDto, AppUser>();
		
	}
}
