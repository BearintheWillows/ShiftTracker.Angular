namespace ShiftTracker.Angular.Data.AppDbContext.Configs;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

public class RunConfiguration : IEntityTypeConfiguration<Run>
{
	public void Configure(EntityTypeBuilder<Run> builder)
	{
		builder.ToTable( "Runs" );
		builder.HasKey( r => r.Id );
		builder.Property( s => s.Id ).UseHiLo<int>("runs_hilo");
		builder.Property( r => r.Location ).IsRequired();
		builder.HasIndex( r => r.Number ).IsUnique();
		builder.Property( r => r.Number ).IsRequired();
	}
}