using FinanceTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FinanceTracker.Infra.Data.Mapping
{
    public class TransactionMap : IEntityTypeConfiguration<Transaction>
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.ToTable("Transaction");

            builder.HasKey(t => t.Id);

            builder.Property(t => t.Value).IsRequired().HasColumnName("Value").HasColumnType("decimal(9,2)");

            builder.Property(t => t.Description).HasColumnName("Description").HasColumnType("varchar(200)");

            builder.Property(t => t.TransactionDate).HasColumnName("TransactionDate").HasColumnType("datetime2");

            builder.Property(t => t.CategoryId).HasColumnName("CategoryId");

            builder.HasOne(t => t.Category).WithMany(c => c.Transactions).HasForeignKey(t => t.CategoryId);
        }
    }
}
