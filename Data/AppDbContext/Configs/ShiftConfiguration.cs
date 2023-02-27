namespace ShiftTracker.Angular.Data.AppDbContext.Configs;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

public class ShiftConfiguration : IEntityTypeConfiguration<Shift>
{
	public void Configure(EntityTypeBuilder<Shift> builder)
	{
		builder.ToTable( "Shifts" );
		builder.HasKey( s => s.Id );
		builder.Property( s => s.Id ).UseHiLo();
		builder.Property( s => s.Date ).IsRequired();
		builder.Property( s => s.StartTime ).IsRequired();
		builder.Property( s => s.EndTime ).IsRequired();
		builder.Property( s => s.BreakDuration ).IsRequired();
		builder.Property( s => s.DriveTime ).IsRequired();
		builder.Property( s => s.ShiftDuration ).IsRequired();
		builder.Property( s => s.WorkTime ).IsRequired();
		builder.HasIndex( s => s.Date ).IsUnique();
	}
}