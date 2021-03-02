using LetQuiz.Data;
using LetQuiz.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Let_Quiz.Services
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly LetQuizContext _letQuizContext;

        public QuestionRepository(LetQuizContext letQuizContext)
        {
            this._letQuizContext = letQuizContext;
        }

        public IEnumerable<Question> GetQuestionsByQuizID(int quizID)
        {
            var questions = _letQuizContext.Questions.Include(q => q.Answers).Where(q => q.QuizId == quizID).ToList();

            return questions;
        }
    }
}
