namespace ShiftTracker.Angular.Data.Configs;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

public class DailyRoutePlanConfiguration : IEntityTypeConfiguration<DailyRoutePlan>
{
	public void Configure(EntityTypeBuilder<DailyRoutePlan> builder)
	{
		builder.ToTable( "Daily Route Plans" );
		builder.HasKey( s => s.Id );
		builder.HasIndex( s => new { s.ShopId, s.RunId, s.DayOfWeek } ).IsUnique();
		builder.Property( s => s.DayOfWeek ).IsRequired().HasColumnType( "byte" );
		builder.Property( s => s.ShopId ).IsRequired();
		builder.Property( s => s.RunId ).IsRequired();
		builder.Property( s => s.WindowOpenTime ).IsRequired();
		builder.Property( s => s.WindowCloseTime ).IsRequired();
		builder.HasOne( s => s.Run ).WithMany( r => r.RoutePlans ).HasForeignKey( s => s.RunId )
		       .OnDelete( DeleteBehavior.Cascade );
		builder.HasOne( s => s.Shop ).WithMany( s => s.DailyRoutePlan ).HasForeignKey( s => s.ShopId )
		       .OnDelete( DeleteBehavior.Cascade );
	}
}