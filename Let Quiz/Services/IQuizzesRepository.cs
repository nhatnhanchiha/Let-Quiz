﻿using LetQuiz.Domain;
using System.Collections.Generic;
using Let_Quiz.Models;

namespace Let_Quiz.Services
{
    public interface IQuizzesRepository
    {
        IEnumerable<Quiz> GetQuizzes(PageInfoDTO pageInfo);
        IEnumerable<Quiz> GetQuizzesForTeacher(PageInfoDTO pageInfo, string teacherId);
        int GetMaxPage(PageInfoDTO pageInfo);
        int GetMaxPageForTeacher(PageInfoDTO pageInfo, string teacherId);

        IEnumerable<Quiz> GetOwnQuizzes(string username);

        Quiz GetQuiz(int quizID);

        void UpdateQuiz(Quiz quiz);

        bool SaveChanges();

        bool InsertQuiz(QuizDTO quizt);
    }
}
