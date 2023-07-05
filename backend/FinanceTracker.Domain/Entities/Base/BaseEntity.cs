using System.ComponentModel.DataAnnotations;

namespace FinanceTracker.Domain.Entities.Base
{
    public abstract class BaseEntity
    {
        [Key]
        public virtual int Id { get; set; }
    }
}
