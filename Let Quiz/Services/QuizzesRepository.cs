using Let_Quiz.Models;
using LetQuiz.Data;
using LetQuiz.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Let_Quiz.Services
{
    public class QuizzesRepository : IQuizzesRepository
    {
        private readonly LetQuizContext _letQuizContext;

        public QuizzesRepository(LetQuizContext letQuizContext)
        {
            _letQuizContext = letQuizContext;
        }

        public IEnumerable<Quiz> GetQuizzes()
        {
            var quizzes = _letQuizContext.Quizzes.Select(q => new Quiz
            {
                QuizId = q.QuizId,
                Name = q.Name,
                CreateDate = q.CreateDate,
                Duration = q.Duration,
                Account = new Account
                {
                    Name = q.Account.Name
                },
                IsExpire = q.IsExpire
            }).Where(q => q.IsExpire == false).ToList();

            return quizzes;
        }
    }
}
