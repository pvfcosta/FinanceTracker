using FinanceTracker.Domain.Entities;
using FinanceTracker.Domain.Interfaces.Services.Base;
using FinanceTracker.Service.Validators;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker.Application.Controllers
{
    [ApiController]
    [Route("api/transaction")]
    public class TransactionController : ControllerBase
    {
        private readonly IBaseService<Transaction> _baseTransactionService;

        public TransactionController(IBaseService<Transaction> baseService)
        {
            _baseTransactionService = baseService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] Transaction transaction)
        {
            if (transaction == null) return NotFound();

            return Execute(() => _baseTransactionService.Add<TransactionValidator>(transaction).Id);
        }

        [HttpPut]
        public IActionResult Update([FromBody] Transaction transaction)
        {
            if (transaction == null) return NotFound();

            return Execute(() => _baseTransactionService.Update<TransactionValidator>(transaction));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id == 0) return NotFound();

            Execute(() =>
            {
                _baseTransactionService.Delete(id);
                return true;
            });

            return new NoContentResult();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Execute(() => _baseTransactionService.Get());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id == 0) return NotFound();

            return Execute(() => _baseTransactionService.GetById(id));
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