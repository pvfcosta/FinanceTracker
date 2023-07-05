using FinanceTracker.Domain.Entities;
using FinanceTracker.Domain.Interfaces.Services;
using FinanceTracker.Service.Validators;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker.Application.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] Category category)
        {
            if (category == null) return NotFound();

            return Execute(() => _categoryService.Add(category).Id);
        }

        [HttpPut]
        public IActionResult Update([FromBody] Category category)
        {
            if (category == null) return NotFound();

            return Execute(() => _categoryService.Update<CategoryValidator>(category));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id == 0) return NotFound();

            Execute(() =>
            {
                _categoryService.Delete(id);
                return true;
            });

            return new NoContentResult();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Execute(() => _categoryService.Get());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id == 0) return NotFound();

            return Execute(() => _categoryService.GetById(id));
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