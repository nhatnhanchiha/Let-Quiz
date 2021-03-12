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

        // Anh Dung
        // GET: api/quizzes
        [Authorize(Roles = "False")]
        [HttpGet(Name = "getQuizzes")]
        public ActionResult<IEnumerable<QuizPagingDTO>> GetQuizzes([FromQuery] PageDTO page)
        {
            if (page == null || page.CurrentPage <= 0 || page.MaxRecord <= 0)
            {
                return BadRequest();
            }

            if (page.SearchValue == null)
            {
                page.SearchValue = string.Empty;
            }

            var quizzes = _quizzesRepository.GetQuizzes(page);

            var quizDTO = _mapper.Map<IEnumerable<QuizDTO>>(quizzes);

            int maxPage = (int)Math.Ceiling(_quizzesRepository.GetTotalRecord(page) * 1.0 / page.MaxRecord);

            string url = Url.Link("getQuizzes", null);

            string nextPage = (page.CurrentPage + 1) > maxPage ? null : $"{url}?SearchValue={page.SearchValue}&CurrentPage={page.CurrentPage + 1}&MaxRecord={page.MaxRecord}";
            string previousPage = (page.CurrentPage - 1) < 1 ? null : $"{url}?SearchValue={page.SearchValue}&CurrentPage={page.CurrentPage - 1}&MaxRecord={page.MaxRecord}";

            return Ok(new QuizPagingDTO
            {
                SearchValue = page.SearchValue,
                CurrentPage = page.CurrentPage,
                MaxPage = maxPage,
                NextPage = nextPage,
                PreviousPage = previousPage,
                Quizzes = quizDTO
            });
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
