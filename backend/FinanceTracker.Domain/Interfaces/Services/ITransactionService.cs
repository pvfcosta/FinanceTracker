using FinanceTracker.Domain.Entities;
using FinanceTracker.Domain.Interfaces.Services.Base;

namespace FinanceTracker.Domain.Interfaces.Services
{
    public interface ITransactionService : IBaseService<Transaction>
    {
        Transaction Add(Transaction transaction);
    }
}
