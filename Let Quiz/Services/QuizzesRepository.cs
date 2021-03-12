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

        public IEnumerable<Quiz> GetQuizzes(PageDTO page)
        {
            int skip = (page.CurrentPage - 1) * page.MaxRecord;

            var quizzes = _letQuizContext.Quizzes.Select(q => new Quiz
            {
                QuizId = q.QuizId,
                Name = q.Name,
                Password = q.Password,
                CreateDate = q.CreateDate,
                Duration = q.Duration,
                MaxPoint = q.MaxPoint,
                Account = new Account
                {
                    Name = q.Account.Name
                },
                IsExpire = q.IsExpire
            }).Where(q => q.IsExpire == false && q.Name.Contains(page.SearchValue)).Skip(skip).Take(page.MaxRecord).ToList();

            return quizzes;
        }

        public int GetTotalRecord(PageDTO page)
        {
            return _letQuizContext.Quizzes.Where(q => q.IsExpire == false && q.Name.Contains(page.SearchValue)).Count();
        }
    }
}
