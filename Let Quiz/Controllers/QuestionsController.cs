using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LetQuiz.Data;
using LetQuiz.Domain;
using Let_Quiz.Models;
using Let_Quiz.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace Let_Quiz.Controllers
{
    [Route("api/questions")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly LetQuizContext _context;
        private readonly IQuestionRepository _questionRepository;
        private readonly IMapper _mapper;

        public QuestionsController(LetQuizContext context, IQuestionRepository questionRepository, IMapper mapper)
        {
            _context = context;
            _questionRepository = questionRepository;
            _mapper = mapper;
        }

        // Anh Dung
        // Get: api/questions
        [Authorize(Roles ="False")]
        [HttpGet]
        public ActionResult<IEnumerable<QuestionDTO>> GetQuestionsByQuizID([FromQuery] int quizID)
        {
            var questions = _questionRepository.GetQuestionsByQuizID(quizID);

            return Ok(_mapper.Map<IEnumerable<QuestionDTO>>(questions));
        }

        //// GET: api/Questions
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        //{
        //    return await _context.Questions.ToListAsync();
        //}

        //// GET: api/Questions/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Question>> GetQuestion(int id)
        //{
        //    var question = await _context.Questions.FindAsync(id);

        //    if (question == null)
        //    {
        //        return NotFound();
        //    }

        //    return question;
        //}

        //// PUT: api/Questions/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutQuestion(int id, Question question)
        //{
        //    if (id != question.QuestionId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(question).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!QuestionExists(id))
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

        //// POST: api/Questions
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Question>> PostQuestion(Question question)
        //{
        //    _context.Questions.Add(question);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetQuestion", new { id = question.QuestionId }, question);
        //}

        //// DELETE: api/Questions/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteQuestion(int id)
        //{
        //    var question = await _context.Questions.FindAsync(id);
        //    if (question == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Questions.Remove(question);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool QuestionExists(int id)
        //{
        //    return _context.Questions.Any(e => e.QuestionId == id);
        //}
    }
}
