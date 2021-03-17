using LetQuiz.Domain;
using System.Collections.Generic;
using Let_Quiz.Models;

namespace Let_Quiz.Services
{
    public interface IQuizzesRepository
    {
        IEnumerable<Quiz> GetQuizzes(PageInfoDTO pageInfo);
        int GetMaxPage(PageInfoDTO pageInfo);

        IEnumerable<Quiz> GetOwnQuizzes(string username);

        Quiz GetQuiz(int quizID);

        void UpdateQuiz(Quiz quiz);

        bool SaveChanges();

        bool InsertQuizzes(QuizDTO quizt);
    }
}
