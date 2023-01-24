namespace ShiftTracker.Angular.Data;

using Configs;
using Microsoft.EntityFrameworkCore;
using Models;

public class AppDbContext : DbContext
{
	public AppDbContext(DbContextOptions<AppDbContext> options)
		: base( options )
	{ }

	public DbSet<Shift> Shifts { get; set; }
	public DbSet<Break> Breaks { get; set; }
	

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.ApplyConfiguration( new ShiftConfiguration() );
		modelBuilder.ApplyConfiguration( new BreakConfiguration() );
		modelBuilder.Seed();
	}
}