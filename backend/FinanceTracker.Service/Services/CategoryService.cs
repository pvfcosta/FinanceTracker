using FinanceTracker.Domain.Entities;
using FinanceTracker.Domain.Interfaces.Repositories;
using FinanceTracker.Domain.Interfaces.Services;
using FinanceTracker.Service.Services.Base;
using FinanceTracker.Service.Validators;
using FluentValidation;

namespace FinanceTracker.Service.Services
{
    public class CategoryService : BaseService<Category>, ICategoryService
    {
        public CategoryService(ICategoryRepository categoryRepository) : base(categoryRepository)
        {
        }
        public Category Add(Category category)
        {
            category.CreationDate = DateTime.UtcNow;
            Validate(category, Activator.CreateInstance<CategoryValidator>());
            _baseRepository.Insert(category);
            return category;
        }

        private void Validate(Category category, AbstractValidator<Category> validator)
        {
            if (category == null)
                throw new ArgumentNullException(nameof(category));

            validator.ValidateAndThrow(category);
        }
    }
}
