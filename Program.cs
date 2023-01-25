using Microsoft.EntityFrameworkCore;
using ShiftTracker.Angular.Data;
using ShiftTracker.Angular.Services;

var CorsPolicy = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder( args );

// Add services to the container.


builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

builder.Services.AddCors( options =>
	{
		options.AddPolicy( name: CorsPolicy, policy =>
		{
			policy.WithOrigins( "https://localhost:44491" );
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

builder.Services.AddScoped<IShopService, ShopService>();
builder.Services.AddScoped<IShiftService, ShiftService>();
builder.Services.AddScoped<IBreakService, BreakService>();
builder.Services.AddScoped<IDailyRoutePlanService, DailyRoutePlanService>();
builder.Services.AddScoped<IRunService, RunService>();


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