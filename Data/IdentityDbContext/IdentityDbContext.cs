namespace ShiftTracker.Angular.Data.IdentityDbContext;

using Configs;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShiftTracker.Angular.Models;

public class IdentityDbContext : IdentityDbContext<AppUser>
{
	public IdentityDbContext(DbContextOptions<IdentityDbContext> options)
		: base( options )
	{ }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating( modelBuilder );

		modelBuilder.ApplyConfiguration( new RoleConfiguration() );
	}
}