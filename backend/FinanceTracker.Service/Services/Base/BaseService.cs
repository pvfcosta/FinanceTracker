using FinanceTracker.Domain.Entities.Base;
using FinanceTracker.Domain.Interfaces.Repositories.Base;
using FinanceTracker.Domain.Interfaces.Services.Base;
using FluentValidation;

namespace FinanceTracker.Service.Services.Base
{
    public abstract class BaseService<TEntity> : IBaseService<TEntity> where TEntity : BaseEntity
    {
        protected readonly IBaseRepository<TEntity> _baseRepository;
        protected BaseService(IBaseRepository<TEntity> baseRepository)
        {
            _baseRepository = baseRepository;
        }
        public TEntity Add<TValidator>(TEntity obj) where TValidator : AbstractValidator<TEntity>
        {
            Validate(obj, Activator.CreateInstance<TValidator>());
            _baseRepository.Insert(obj);
            return obj;
        }

        public void Delete(int id) => _baseRepository.Delete(id);

        public IList<TEntity> Get() => _baseRepository.Select();

        public TEntity GetById(int id) => _baseRepository.SelectById(id);
        public TEntity Update<TValidator>(TEntity obj) where TValidator : AbstractValidator<TEntity>
        {
            Validate(obj, Activator.CreateInstance<TValidator>());
            _baseRepository.Update(obj);
            return obj;
        }

        private void Validate(TEntity obj, AbstractValidator<TEntity> validator)
        {
            if (obj == null)
                throw new ArgumentNullException(nameof(obj));

            validator.ValidateAndThrow(obj);
        }
    }
}
