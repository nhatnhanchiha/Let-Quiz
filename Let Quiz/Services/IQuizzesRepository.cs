using LetQuiz.Domain;
using System.Collections.Generic;
using Let_Quiz.Models;

namespace Let_Quiz.Services
{
    public interface IQuizzesRepository
    {
        IEnumerable<Quiz> GetQuizzes();
    }
}
