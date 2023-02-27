namespace ShiftTracker.Angular.Data.AppDbContext.Configs;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

public class BreakConfiguration : IEntityTypeConfiguration<Break>
{
	public void Configure(EntityTypeBuilder<Break> builder)
	{
		builder.ToTable( "Breaks" );
		builder.HasKey( b => b.Id );
		builder.Property( b => b.StartTime ).IsRequired();
		builder.Property( b => b.EndTime ).IsRequired();
		builder.Property( b => b.Duration ).IsRequired();
		builder.HasOne( b => b.Shift ).WithMany( b => b.Breaks ).HasForeignKey( b => b.ShiftId )
		       .OnDelete( DeleteBehavior.Cascade );
	}
}