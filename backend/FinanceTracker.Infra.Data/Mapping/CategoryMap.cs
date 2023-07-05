using FinanceTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FinanceTracker.Infra.Data.Mapping
{
    public class CategoryMap : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.ToTable("Transaction");

            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name).IsRequired().HasColumnName("Name").HasColumnType("varchar(50)");

            builder.Property(c => c.CreationDate).HasColumnName("CreationDate").HasColumnType("datetime2");

            builder.HasMany(c => c.Transactions).WithOne(t => t.Category);
        }
    }
}
