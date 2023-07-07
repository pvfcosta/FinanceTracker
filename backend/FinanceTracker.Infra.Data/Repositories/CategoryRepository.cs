using FinanceTracker.Domain.Entities;
using FinanceTracker.Domain.Interfaces.Repositories;
using FinanceTracker.Infra.Data.Context;
using FinanceTracker.Infra.Data.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Infra.Data.Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public new void Delete(int id)
        {
            var transactions = _databaseContext.Set<Transaction>().Where(t => t.CategoryId == id).ToList();
            foreach (var transaction in transactions)
            {
                transaction.CategoryId = null;
                _databaseContext.Entry(transaction).State = EntityState.Modified;
                _databaseContext.SaveChanges();
            }
            base.Delete(id);
        }
    }
}
