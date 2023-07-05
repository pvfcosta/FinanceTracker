using FinanceTracker.Domain.Entities;
using FinanceTracker.Domain.Interfaces.Repositories.Base;
using FinanceTracker.Service.Services.Base;
using FinanceTracker.Service.Validators;
using FluentValidation;

namespace FinanceTracker.Service.Services
{
    public class TransactionService : BaseService<Transaction>
    {
        public TransactionService(IBaseRepository<Transaction> baseRepository)
        {
            _baseRepository = baseRepository;
        }

        public Transaction Add(Transaction transaction)
        {
            transaction.TransactionDate = DateTime.UtcNow;
            Validate(transaction, Activator.CreateInstance<TransactionValidator>());
            _baseRepository.Insert(transaction);
            return transaction;
        }

        private void Validate(Transaction transaction, AbstractValidator<Transaction> validator)
        {
            if (transaction == null)
                throw new ArgumentNullException(nameof(transaction));

            validator.ValidateAndThrow(transaction);
        }
    }
}
