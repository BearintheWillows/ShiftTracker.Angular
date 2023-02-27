namespace ShiftTracker.Angular.Data.AppDbContext.Configs;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

public class DeliveryPointConfiguration : IEntityTypeConfiguration<DeliveryPoint>
{
	public void Configure(EntityTypeBuilder<DeliveryPoint> builder)
	{
		builder.ToTable( "Delivery Point" );
		builder.HasKey( s => s.Id );
		builder.HasIndex(s => new { s.ShopId, s.DayOfWeek })
		       .IsUnique();
		builder.Property( s => s.DayOfWeek ).IsRequired();
		builder.Property( s => s.DropNumber ).IsRequired();
		builder.Property( s => s.ShopId ).IsRequired();
		builder.Property( s => s.RunVariantId ).IsRequired();
		builder.Property( s => s.WindowOpenTime ).IsRequired();
		builder.Property( s => s.WindowCloseTime ).IsRequired();
	}
}