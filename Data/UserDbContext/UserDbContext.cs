namespace ShiftTracker.Angular.Data.UserDbContext;

using Configs;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShiftTracker.Angular.Models;

public class UserDbContext : IdentityDbContext<User>
{
	public UserDbContext(DbContextOptions<UserDbContext> options)
		: base( options )
	{ }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		
		modelBuilder.ApplyConfiguration( new UserConfiguration() );
		base.OnModelCreating( modelBuilder );
	}
}