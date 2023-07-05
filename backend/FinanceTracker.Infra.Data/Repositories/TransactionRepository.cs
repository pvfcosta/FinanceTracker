using FinanceTracker.Domain.Entities;
using FinanceTracker.Domain.Interfaces.Repositories;
using FinanceTracker.Infra.Data.Context;
using FinanceTracker.Infra.Data.Repositories.Base;

namespace FinanceTracker.Infra.Data.Repositories
{
    public class TransactionRepository : BaseRepository<Transaction>, ITransactionRepository
    {
        public TransactionRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }
    }
}
