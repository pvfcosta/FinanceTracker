using FinanceTracker.Domain.Entities;
using FinanceTracker.Domain.Interfaces.Services;
using FinanceTracker.Service.Validators;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker.Application.Controllers
{
    [ApiController]
    [Route("api/transaction")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] Transaction transaction)
        {
            if (transaction == null) return NotFound();

            return Execute(() => _transactionService.Add(transaction).Id);
        }

        [HttpPut]
        public IActionResult Update([FromBody] Transaction transaction)
        {
            if (transaction == null) return NotFound();

            return Execute(() => _transactionService.Update<TransactionValidator>(transaction));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id == 0) return NotFound();

            Execute(() =>
            {
                _transactionService.Delete(id);
                return true;
            });

            return new NoContentResult();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Execute(() => _transactionService.Get());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id == 0) return NotFound();

            return Execute(() => _transactionService.GetById(id));
        }

        private IActionResult Execute(Func<object> func)
        {
            try
            {
                var result = func();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


    }
}