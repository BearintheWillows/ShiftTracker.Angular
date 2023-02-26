using Microsoft.EntityFrameworkCore;
using Serilog;
using Serilog.Events;
using ShiftTracker.Angular.Data;
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
builder.Services.AddRazorPages();

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
	                                                     options.UseSqlServer(
		                                                     builder.Configuration.GetConnectionString(
			                                                     "DefaultConnection"
		                                                     )
	                                                     )
);

builder.Services.AddScoped<IShiftService, ShiftService>();
builder.Services.AddScoped<IBreakService, BreakService>();
builder.Services.AddScoped<IShopService, ShopService>();
builder.Services.AddScoped<IRunService, RunService>();
builder.Services.AddScoped<IRunVariantService, RunVariantService>();


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
app.MapRazorPages();


app.MapFallbackToFile( "index.html" );

app.Run();