namespace ShiftTracker.Angular.Data.Configs;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
	public void Configure(EntityTypeBuilder<User> builder)
	{
		builder.ToTable( "Users" );
		builder.HasKey( u => u.Id );
		builder.Property( u => u.FirstName ).IsRequired().HasMaxLength( 30 );
		builder.Property( u => u.LastName ).IsRequired().HasMaxLength( 30 );
		builder.HasMany( u => u.Shifts ).WithOne( s => s.User ).HasForeignKey( s => s.UserId );
	}
}