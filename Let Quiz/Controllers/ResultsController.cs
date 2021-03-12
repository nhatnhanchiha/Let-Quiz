using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Let_Quiz.Extenstions;
using Let_Quiz.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LetQuiz.Data;
using LetQuiz.Domain;
using Let_Quiz.Services;
using Let_Quiz.Models;
using Microsoft.AspNetCore.Authorization;

namespace Let_Quiz.Controllers
{
    [Route("api/results")]
    [ApiController]
    public class ResultsController : ControllerBase
    {
        private readonly LetQuizContext _context;
        private readonly IResultsRepository _resultsRepository;

        public ResultsController(LetQuizContext context, IResultsRepository resultsRepository)
        {
            _context = context;
            _resultsRepository = resultsRepository;
        }

        // Anh Dung
        // Post:
        [Authorize(Roles = "False")]
        [HttpPost]
        public ActionResult AddResultQuiz([FromBody] QuizAnswerDTO quizAnswer)
        {
            if (_resultsRepository.AddResult(quizAnswer))
            {
                return Created("https://localhost:44300/api/results", quizAnswer);
            }

            return BadRequest();
        }

        [Authorize(Roles = "False")]
        [HttpGet("student/results")]
        public ActionResult<IEnumerable<ResultDTO>> GetResultList([FromQuery]ResultParams resultParams)
        {
            var username = User.FindFirst("UserName")?.Value;
            var results = _resultsRepository.GetResultsByUserName(username, resultParams);

            Response.AddPagingNationHeader(results.CurrentPage, results.PageSize, results.TotalCount, results.TotalPages);

            return Ok(results);
        }

        [Authorize(Roles = "False")]
        [HttpGet("student/results/{resultId}")]
        public ActionResult<ResultDTO> GetDetailOfQuiz(int resultId)
        {
            var username = User.FindFirst("Username")?.Value;
            var result = _resultsRepository.GetResultWithFullDetail(username, resultId);
            return Ok(result);
        }

        //// GET: api/Results
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Result>>> GetResults()
        //{
        //    return await _context.Results.ToListAsync();
        //}

        //// GET: api/Results/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Result>> GetResult(int id)
        //{
        //    var result = await _context.Results.FindAsync(id);

        //    if (result == null)
        //    {
        //        return NotFound();
        //    }

        //    return result;
        //}

        //// PUT: api/Results/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutResult(int id, Result result)
        //{
        //    if (id != result.ResultId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(result).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ResultExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/Results
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Result>> PostResult(Result result)
        //{
        //    _context.Results.Add(result);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetResult", new { id = result.ResultId }, result);
        //}

        //// DELETE: api/Results/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteResult(int id)
        //{
        //    var result = await _context.Results.FindAsync(id);
        //    if (result == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Results.Remove(result);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool ResultExists(int id)
        //{
        //    return _context.Results.Any(e => e.ResultId == id);
        //}
    }
}
