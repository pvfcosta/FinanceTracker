using FinanceTracker.Domain.Entities.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanceTracker.Domain.Entities
{
    public class Transaction : BaseEntity
    {
        public double Value { get; set; }
        public string Description { get; set; }
        public DateTime TransactionDate { get; set; }
        public int? CategoryId { get; set; }
        public virtual Category Category { get; set; }
    }
}
