namespace ShiftTracker.Angular.Services;

using Data;
using Microsoft.EntityFrameworkCore;
using Serilog;

public interface IBaseCrudService<T> where T : class
{
	Task<T?>             GetAsync(int id);
	Task<IEnumerable<T>> GetAllAsync();
	Task<T>              AddAsync(T            entity);
	Task<T>              UpdateAsync(T         entity);
	Task                 DeleteAsync(int       id);
	Task<T>              AddAsyncWithoutSave(T entity);
	Task<bool>           CheckIfAnyChangesAsync();
}

public abstract class BaseCrudService<T> : IBaseCrudService<T> where T : class
{
	internal ILogger Log;

	public BaseCrudService(AppDbContext context, ILogger logger)
	{
		Context = context;
		Log = logger;
	}

	internal AppDbContext Context { get; }

	/// <summary>
	///     Gets singular entity of type T
	/// </summary>
	/// <param name="id"></param>
	/// <returns>Single Entity</returns>
	public async Task<T?> GetAsync(int id) => await Context.Set<T>().FindAsync( id );

	/// <summary>
	///     Gets all entities of type T
	/// </summary>
	/// <returns>List of type T entities</returns>
	public async Task<IEnumerable<T>> GetAllAsync() => await Context.Set<T>().ToListAsync();

	/// <summary>
	///     Adds a new entity to the database
	/// </summary>
	/// <param name="entity"></param>
	/// <returns>Created Entity</returns>
	public async Task<T> AddAsync(T entity)
	{
		try
		{ 
				await Context.Set<T>().AddAsync( entity );
          		await Context.SaveChangesAsync();
                Log.Information( "Entity Added to Database: {@entity}", entity );
		}
				
		catch ( Exception e )
		{
			Log.Error( "Error Adding Entity to Database: {@entity}", entity );
			Log.Fatal( "Error: {@e}", e );
			throw;
		}
		
		return entity;
	}

	public async Task<T> AddAsyncWithoutSave(T entity)
	{
		await Context.Set<T>().AddAsync( entity );
		return entity;
	}

	/// <summary>
	///     Updated entity in database
	/// </summary>
	/// <param name="entity"></param>
	/// <returns>Updated Entity</returns>
	public async Task<T> UpdateAsync(T entity)
	{
		Context.Set<T>().Update( entity );
		await Context.SaveChangesAsync();
		return entity;
	}

	/// <summary>
	///     Deletes entity from database by id
	/// </summary>
	/// <param name="id"></param>
	public async Task DeleteAsync(int id)
	{
		var entity = await Context.Set<T>().FindAsync( id );
		Context.Set<T>().Remove( entity );
		await Context.SaveChangesAsync();
	}
	
	public async Task<bool> CheckIfAnyChangesAsync()
	{
		var changes = Context.ChangeTracker.Entries().Where( x => x.State != EntityState.Modified );

		var entityEntries = changes.ToList();
		while ( entityEntries.Any() )
		{
			await Context.SaveChangesAsync();
		}
		return true;
	}
}