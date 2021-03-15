using Let_Quiz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Let_Quiz.Helpers;
using LetQuiz.Domain;

namespace Let_Quiz.Services
{
    public interface IResultsRepository
    {
        Result AddResult(QuizAnswerDTO quizAnswer);

        PagedList<ResultDTO> GetResultsByUserName(string username, ResultParams resultParams);

        ResultDTO GetResultWithFullDetail(string username, int id);
    }
}
