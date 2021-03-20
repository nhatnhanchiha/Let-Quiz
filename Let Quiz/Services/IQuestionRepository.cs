using LetQuiz.Domain;
using Let_Quiz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Let_Quiz.Services
{
    public interface IQuestionRepository
    {
        IEnumerable<Question> GetQuestionsByQuizID(int quizID);
    }
}
