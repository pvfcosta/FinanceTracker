using FinanceTracker.Domain.Entities;
using FluentValidation;

namespace FinanceTracker.Service.Validators
{
    public class CategoryValidator : AbstractValidator<Category>
    {
        public CategoryValidator()
        {
            RuleFor(c => c.Name).NotEmpty().WithMessage("Category name must not be empty");
            RuleFor(c => c.CreationDate).NotEmpty().WithMessage("Category creation date must have a value");
        }
    }
}
