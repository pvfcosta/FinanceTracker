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

        public new IList<Transaction> Select()
        {
            var transactions = _databaseContext.Set<Transaction>().ToList();
            var categories = _databaseContext.Set<Category>().ToList();

            return (from transaction in transactions
                    join category in categories on transaction.CategoryId equals category.Id into gj
                    from subcategory in gj.DefaultIfEmpty()
                    select new Transaction
                    {
                        Id = transaction.Id,
                        Value = transaction.Value,
                        Description = transaction.Description,
                        TransactionDate = transaction.TransactionDate,
                        CategoryId = transaction.CategoryId,
                        Category = subcategory == null ? null : new Category
                        {
                            CreationDate = subcategory.CreationDate,
                            Id = subcategory.Id,
                            Name = subcategory.Name,
                        },
                    }).ToList();
        }
    }
}
