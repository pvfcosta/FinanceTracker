using FinanceTracker.Domain.Entities.Base;

namespace FinanceTracker.Domain.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
