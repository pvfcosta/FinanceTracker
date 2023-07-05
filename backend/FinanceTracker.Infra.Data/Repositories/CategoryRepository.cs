using FinanceTracker.Domain.Entities;
using FinanceTracker.Domain.Interfaces.Repositories;
using FinanceTracker.Infra.Data.Context;
using FinanceTracker.Infra.Data.Repositories.Base;

namespace FinanceTracker.Infra.Data.Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }
    }
}
