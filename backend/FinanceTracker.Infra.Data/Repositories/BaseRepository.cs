using FinanceTracker.Domain.Entities.Base;
using FinanceTracker.Domain.Interfaces.Repositories.Base;
using FinanceTracker.Infra.Data.Context;

namespace FinanceTracker.Infra.Data.Repositories
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        protected readonly DatabaseContext _databaseContext;

        public BaseRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public void Delete(int id)
        {
            _databaseContext.Set<TEntity>().Remove(SelectById(id));
            _databaseContext.SaveChanges();
        }

        public void Insert(TEntity obj)
        {
            _databaseContext.Set<TEntity>().Add(obj);
            _databaseContext.SaveChanges();
        }

        public IList<TEntity> Select() => _databaseContext.Set<TEntity>().ToList();

        public TEntity SelectById(int id) => _databaseContext.Set<TEntity>().Find(id);

        public void Update(TEntity obj)
        {
            _databaseContext.Entry(obj).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _databaseContext.SaveChanges();
        }
    }
}
