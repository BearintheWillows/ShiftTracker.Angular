namespace ShiftTracker.Angular.Data.UserDbContext.Configs;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShiftTracker.Angular.Models;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
	public void Configure(EntityTypeBuilder<User> builder)
	{
		builder.ToTable( "Users" );
		builder.HasKey( u => u.Id );
		builder.Property( u => u.FirstName ).IsRequired().HasMaxLength( 30 );
		builder.Property( u => u.LastName ).IsRequired().HasMaxLength( 30 ); 
	}
}