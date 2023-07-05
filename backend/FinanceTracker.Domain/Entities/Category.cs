using FinanceTracker.Domain.Entities.Base;

namespace FinanceTracker.Domain.Entities
{
    public class Category : BaseEntity
    {
        public Category()
        {
            Transactions = new HashSet<Transaction>();
        }
        public string Name { get; set; }
        public DateTime CreationDate { get; set; }
        public virtual IEnumerable<Transaction> Transactions { get; set; }
    }
}
