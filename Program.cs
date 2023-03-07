using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Serilog.Events;
using ShiftTracker.Angular.AutoMapperProfiles;
using ShiftTracker.Angular.Data.IdentityDbContext;
using ShiftTracker.Angular.Data.AppDbContext;
using ShiftTracker.Angular.Handlers;
using ShiftTracker.Angular.Models;
using ShiftTracker.Angular.Services;

var CorsPolicy = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder( args );

// Add services to the container.

Log.Logger = new LoggerConfiguration()
               .MinimumLevel.Debug()
               .WriteTo.File( "Logs/log-.txt", rollingInterval: RollingInterval.Day )
               .WriteTo.Console(restrictedToMinimumLevel: LogEventLevel.Information)
               .CreateLogger();



builder.Services.AddSingleton( Log.Logger );



builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddControllersWithViews();

builder.Services.AddCors( options =>
	{
		options.AddPolicy( name: CorsPolicy, policy =>
		{
			policy.AllowAnyMethod();
			policy.AllowAnyOrigin();
			policy.AllowAnyHeader();
			
		} );
	}
);
builder.Services.AddDbContext<AppDbContext>( options =>
	{
		options.UseSqlServer( builder.Configuration.GetConnectionString( "AppDbConnection" ));
	}
);
builder.Services.AddDbContext<ShiftTracker.Angular.Data.IdentityDbContext.IdentityDbContext>( options => {
	options.UseSqlServer( builder.Configuration.GetConnectionString( "IdentityConnection" ),
		options => options.MigrationsAssembly( "ShiftTracker.Angular" )
	                    );
}

);
builder.Services.AddIdentity<AppUser, IdentityRole>( options =>
	        {

		        options.Password.RequireDigit = false;
		        options.Password.RequireLowercase = false;
		        options.Password.RequireUppercase = false;
		       options.Password.RequireNonAlphanumeric = false;
		        options.Password.RequiredLength = 6;
		        options.Password.RequiredUniqueChars = 0;
		        options.User.RequireUniqueEmail = true;
	        }
        ).AddEntityFrameworkStores<ShiftTracker.Angular.Data.IdentityDbContext.IdentityDbContext>()
         .AddDefaultTokenProviders();

var jwtSettings = builder.Configuration.GetSection( "JwtSettings" );
builder.Services.AddAuthentication( opt =>
{
	opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer( options =>
{
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuerSigningKey = true,
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateLifetime = true,
		ValidIssuer = jwtSettings.GetSection( "Issuer" ).Value,
		ValidAudience = jwtSettings.GetSection( "Audience" ).Value, 
		IssuerSigningKey = new SymmetricSecurityKey( Encoding.ASCII.GetBytes( jwtSettings.GetSection( "SecurityKey" ).Value ) ),
	
	};
} );

builder.Services.AddScoped<JwtHandler>();

builder.Services.AddScoped<IShiftService, ShiftService>();
builder.Services.AddScoped<IBreakService, BreakService>();
builder.Services.AddScoped<IShopService, ShopService>();
builder.Services.AddScoped<IRunService, RunService>();
builder.Services.AddScoped<IRunVariantService, RunVariantService>();

builder.Services.AddAutoMapper( typeof( MappingProfile ) );

var app = builder.Build();

// Configure the HTTP request pipeline.
if ( app.Environment.IsDevelopment() )
{
	app.UseMigrationsEndPoint();
} else
{
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(CorsPolicy);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute( name: "default",
                        pattern: "{controller}/{action=Index}/{id?}"
);

app.MapFallbackToFile( "index.html" );

app.Run();