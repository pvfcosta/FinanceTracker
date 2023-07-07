using FinanceTracker.Domain.Entities;
using FinanceTracker.Domain.Interfaces.Repositories.Base;

namespace FinanceTracker.Domain.Interfaces.Repositories
{
    public interface ICategoryRepository : IBaseRepository<Category>
    {
        new void Delete(int id);
    }
}
