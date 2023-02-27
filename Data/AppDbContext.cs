namespace ShiftTracker.Angular.Data;

using Configs;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models;

public class AppDbContext : IdentityDbContext<User>
{
	public AppDbContext(DbContextOptions<AppDbContext> options)
		: base( options )
	{ }

	public DbSet<Shift> Shifts { get; set; }
	public DbSet<Break> Breaks { get; set; }
	public DbSet<Run> Runs
	{
		get;
		set;
	}

	public DbSet<Shop?> Shops
	{
		get;
		set;
	}

	public DbSet<DeliveryPoint> DeliveryPoints
	{
		get;
		set;
	}
	
	public DbSet<RunVariant> RunVariants
	{
		get;
		set;
	}
	

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.ApplyConfiguration( new ShiftConfiguration() );
		modelBuilder.ApplyConfiguration( new BreakConfiguration() );
		modelBuilder.ApplyConfiguration( new RunConfiguration() );
		modelBuilder.ApplyConfiguration( new ShopConfiguration() );
		modelBuilder.ApplyConfiguration( new DeliveryPointConfiguration() );
		modelBuilder.ApplyConfiguration( new RunVariantConfiguration() );
		modelBuilder.ApplyConfiguration( new UserConfiguration() );
		modelBuilder.Seed();
	}
}