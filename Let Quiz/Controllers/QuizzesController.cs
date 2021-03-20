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
        [Authorize]
        [HttpGet(Name = "GetQuizzes")]
        public ActionResult<IEnumerable<Quiz>> GetQuizzes([FromQuery] PageInfoDTO pageInfo)
        {
            if (pageInfo == null || pageInfo.CurrentPage <= 0 || pageInfo.MaxRecord <= 0)
            {
                return BadRequest();
            }

            if (pageInfo.SearchValue == null)
            {
                pageInfo.SearchValue = "";
            }

            var quizzes = _quizzesRepository.GetQuizzes(pageInfo);
            var quizzesDTO = _mapper.Map<IEnumerable<QuizDTO>>(quizzes);

            int maxPage = _quizzesRepository.GetMaxPage(pageInfo);

            string url = Url.Link("GetQuizzes", null);

            var pagingQuiz = new PagingQuizDTO
            {
                SearchValue = pageInfo.SearchValue,
                CurrentPage = pageInfo.CurrentPage,
                MaxPage = maxPage,
                NextPage = pageInfo.CurrentPage >= maxPage ? null : $"{url}?SearchValue={pageInfo.SearchValue}&CurrentPage={pageInfo.CurrentPage + 1}&MaxRecord={pageInfo.MaxRecord}",
                PreviousPage = pageInfo.CurrentPage <= 1 ? null : $"{url}?SearchValue={pageInfo.SearchValue}&CurrentPage={pageInfo.CurrentPage - 1}&MaxRecord={pageInfo.MaxRecord}",
                Quizzes = quizzesDTO,
            };

            return Ok(pagingQuiz);
        }

        [Authorize(Roles = "True")]
        [HttpGet("teacher/own-quizzes")]
        public ActionResult<IEnumerable<Quiz>> GetOwnQuizzes()
        {
            var username = User.FindFirst("UserName")?.Value;
            var quizzes = _quizzesRepository.GetOwnQuizzes(username);

            return Ok(_mapper.Map<IEnumerable<QuizDTO>>(quizzes));
        }

        [Authorize(Roles = "True")]
        [HttpGet("teacher/{quizID}")]
        public ActionResult<Quiz> GetQuiz(int quizID)
        {
            var quiz = _quizzesRepository.GetQuiz(quizID);

            return Ok(_mapper.Map<QuizDTO>(quiz));
        }

        [Authorize(Roles = "True")]
        [HttpPut("change-password/{quizID}/{password}")]
        public ActionResult ChangeQuizPassword(int quizID, string password)
        {
            var quiz = _quizzesRepository.GetQuiz(quizID);
            if (quiz == null)
            {
                return BadRequest();
            }
            quiz.Password = password;

            _quizzesRepository.UpdateQuiz(quiz);

            _quizzesRepository.SaveChanges();

            return NoContent();
        }

        [Authorize(Roles = "True")]
        [HttpPut("close-quiz")]
        public ActionResult CloseQuiz([FromBody] int quizID)
        {
            var quiz = _quizzesRepository.GetQuiz(quizID);
            if (quiz == null)
            {
                return BadRequest();
            }

            quiz.IsExpire = true;

            _quizzesRepository.UpdateQuiz(quiz);

            _quizzesRepository.SaveChanges();

            return NoContent();
        }

        [Authorize(Roles = "True")]
        [HttpPut("re-open-quiz")]
        public ActionResult ReOpenQuiz([FromBody] int quizID)
        {
            var quiz = _quizzesRepository.GetQuiz(quizID);
            if (quiz == null)
            {
                return BadRequest();
            }
            
            quiz.IsExpire = false;
            
            _quizzesRepository.UpdateQuiz(quiz);

            _quizzesRepository.SaveChanges();

            return NoContent();
        }

        [Authorize(Roles = "True")]
        [HttpPost("insert-quizzes")]
        public ActionResult InsertQuizzes([FromBody] QuizDTO quiz)
        {

            if (_quizzesRepository.InsertQuiz(quiz))
            {
                return Ok(_mapper.Map<QuizDTO>(quiz));
            }

            return BadRequest();
        }
        // GET: api/Quizzes/5
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
