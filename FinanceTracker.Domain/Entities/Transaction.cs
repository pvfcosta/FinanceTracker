using FinanceTracker.Domain.Entities.Base;

namespace FinanceTracker.Domain.Entities
{
    public class Transaction : BaseEntity
    {
        public double Value { get; set; }
        public string Description { get; set; }
        public DateTime TransactionDate { get; set; }
        public Category Category { get; set; }
    }
}
