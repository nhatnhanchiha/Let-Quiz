using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LetQuiz.Data;
using LetQuiz.Domain;

namespace Let_Quiz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultDetailsController : ControllerBase
    {
        private readonly LetQuizContext _context;

        public ResultDetailsController(LetQuizContext context)
        {
            _context = context;
        }

        // GET: api/ResultDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResultDetail>>> GetResultDetails()
        {
            return await _context.ResultDetails.ToListAsync();
        }

        // GET: api/ResultDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ResultDetail>> GetResultDetail(int id)
        {
            var resultDetail = await _context.ResultDetails.FindAsync(id);

            if (resultDetail == null)
            {
                return NotFound();
            }

            return resultDetail;
        }

        // PUT: api/ResultDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResultDetail(int id, ResultDetail resultDetail)
        {
            if (id != resultDetail.AnswerId)
            {
                return BadRequest();
            }

            _context.Entry(resultDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ResultDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ResultDetail>> PostResultDetail(ResultDetail resultDetail)
        {
            _context.ResultDetails.Add(resultDetail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ResultDetailExists(resultDetail.AnswerId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetResultDetail", new { id = resultDetail.AnswerId }, resultDetail);
        }

        // DELETE: api/ResultDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResultDetail(int id)
        {
            var resultDetail = await _context.ResultDetails.FindAsync(id);
            if (resultDetail == null)
            {
                return NotFound();
            }

            _context.ResultDetails.Remove(resultDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResultDetailExists(int id)
        {
            return _context.ResultDetails.Any(e => e.AnswerId == id);
        }
    }
}
