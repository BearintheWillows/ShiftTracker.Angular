namespace ShiftTracker.Angular.Data.AppDbContext.Configs;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

public class RunVariantConfiguration : IEntityTypeConfiguration<RunVariant>
{

	public void Configure(EntityTypeBuilder<RunVariant> builder)
	{
		builder.ToTable( "Run Variants" );
		builder.HasKey( rv => rv.Id );
		builder.HasIndex( rv => new { rv.RunId, rv.DayOfWeek } ).IsUnique();
		builder.Property( rv => rv.DayOfWeek ).IsRequired();
		builder.HasOne( rv => rv.Run ).WithMany( r => r.DayVariants ).HasForeignKey( s => s.RunId )
		       .OnDelete( DeleteBehavior.Cascade );
		builder.HasMany<DeliveryPoint>(rv => rv.DeliveryPoints).WithOne(drp => drp.RunVariant).HasForeignKey(drp => drp.RunVariantId).OnDelete(DeleteBehavior.Cascade);
	}
}	