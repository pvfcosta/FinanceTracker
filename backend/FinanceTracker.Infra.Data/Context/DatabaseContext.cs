using FinanceTracker.Domain.Entities;
using FinanceTracker.Infra.Data.Mapping;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Infra.Data.Context
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Transaction>(new TransactionMap().Configure);
            modelBuilder.Entity<Category>(new CategoryMap().Configure);
        }
    }
}
