using FinanceTracker.Domain.Entities;
using FinanceTracker.Domain.Interfaces.Services.Base;

namespace FinanceTracker.Domain.Interfaces.Services
{
    public interface ICategoryService : IBaseService<Category>
    {
        Category Add(Category category);
    }
}
