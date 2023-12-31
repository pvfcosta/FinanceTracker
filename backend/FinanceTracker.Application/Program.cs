using FinanceTracker.Domain.Interfaces.Repositories;
using FinanceTracker.Domain.Interfaces.Services;
using FinanceTracker.Infra.Data.Context;
using FinanceTracker.Infra.Data.Repositories;
using FinanceTracker.Service.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<DatabaseContext>(options =>
{
    options.UseSqlServer("Server=localhost,1433;Database=financetracker;User ID=sa;Password=1q2w3e4r@#$;TrustServerCertificate=True;");
});

builder.WebHost.UseUrls("http://*:5005");

builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("FinanceTrackerPolicy", builder =>
    {
        builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("FinanceTrackerPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
