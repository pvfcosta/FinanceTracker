using FinanceTracker.Domain.Entities;
using FluentValidation;

namespace FinanceTracker.Service.Validators
{
    public class TransactionValidator : AbstractValidator<Transaction>
    {
        public TransactionValidator()
        {
            RuleFor(t => t.Value).NotEmpty().WithMessage("A transaction value must be inserted.");
            RuleFor(t => t.Description).MaximumLength(200).WithMessage("The description must have 200 characters or less.");
            RuleFor(t => t.TransactionDate).NotEmpty().WithMessage("Transaction date must not be empty.");
            RuleFor(t => t.CategoryId).Must(c => c > 0).When(c => c.CategoryId.HasValue).WithMessage("Invalid category");
        }
    }
}
