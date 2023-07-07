using FinanceTracker.Domain.Entities;
using FinanceTracker.Domain.Interfaces.Repositories.Base;

namespace FinanceTracker.Domain.Interfaces.Repositories
{
    public interface ITransactionRepository : IBaseRepository<Transaction>
    {
        new IList<Transaction> Select();
    }
}
