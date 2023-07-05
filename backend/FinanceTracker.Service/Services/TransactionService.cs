using FinanceTracker.Domain.Entities;
using FinanceTracker.Domain.Interfaces.Repositories;
using FinanceTracker.Domain.Interfaces.Services;
using FinanceTracker.Service.Services.Base;
using FinanceTracker.Service.Validators;
using FluentValidation;

namespace FinanceTracker.Service.Services
{
    public class TransactionService : BaseService<Transaction>, ITransactionService
    {
        public TransactionService(ITransactionRepository transactionRepository) : base(transactionRepository)
        {
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
