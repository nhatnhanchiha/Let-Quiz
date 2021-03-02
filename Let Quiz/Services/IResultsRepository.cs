using Let_Quiz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Let_Quiz.Services
{
    public interface IResultsRepository
    {
        bool AddResult(QuizAnswerDTO quizAnswer);
    }
}
