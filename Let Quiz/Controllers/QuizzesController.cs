using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LetQuiz.Data;
using LetQuiz.Domain;
using Microsoft.AspNetCore.Authorization;
using Let_Quiz.Services;
using AutoMapper;
using Let_Quiz.Models;

namespace Let_Quiz.Controllers
{
    [Authorize]
    [Route("api/quizzes")]
    [ApiController]
    public class QuizzesController : ControllerBase
    {
        private readonly LetQuizContext _context;
        private readonly IQuizzesRepository _quizzesRepository;
        private readonly IMapper _mapper;

        public QuizzesController(LetQuizContext context, IQuizzesRepository quizzesRepository, IMapper mapper)
        {
            _context = context;
            _quizzesRepository = quizzesRepository;
            _mapper = mapper;
        }

        // GET: api/quizzes
        [HttpGet]
        public ActionResult<IEnumerable<Quiz>> GetQuizzes()
        {
            var quizzes = _quizzesRepository.GetQuizzes();

            return Ok(_mapper.Map<IEnumerable<QuizDTO>>(quizzes));
        }

        //// GET: api/Quizzes/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Quiz>> GetQuiz(int id)
        //{
        //    var quiz = await _context.Quizzes.FindAsync(id);

        //    if (quiz == null)
        //    {
        //        return NotFound();
        //    }

        //    return quiz;
        //}

        //// PUT: api/Quizzes/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutQuiz(int id, Quiz quiz)
        //{
        //    if (id != quiz.QuizId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(quiz).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!QuizExists(id))
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

        //// POST: api/Quizzes
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Quiz>> PostQuiz(Quiz quiz)
        //{
        //    _context.Quizzes.Add(quiz);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetQuiz", new { id = quiz.QuizId }, quiz);
        //}

        //// DELETE: api/Quizzes/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteQuiz(int id)
        //{
        //    var quiz = await _context.Quizzes.FindAsync(id);
        //    if (quiz == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Quizzes.Remove(quiz);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool QuizExists(int id)
        //{
        //    return _context.Quizzes.Any(e => e.QuizId == id);
        //}
    }
}
