using LetQuiz.Data;
using LetQuiz.Domain;
using Let_Quiz.Models;
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

        public bool InsertQuestion(QuestionDTO q)
        {
            var quizid = _letQuizContext.Quizzes.Max(p => p.QuizId);
            var question = new LetQuiz.Domain.Question
            {
                Content = q.Content,
                QuizId = quizid,
                Answers = new List<Answer> { }
            };
            _letQuizContext.Questions.Add(question);
            var questionid = _letQuizContext.Questions.Max(p => p.QuestionId);
            foreach (AnswerDTO awnser in q.Answers)
            {
                var a = new LetQuiz.Domain.Answer
                {
                    QuestionId = questionid,
                    Content = awnser.Content,
                    IsCorrect = awnser.IsCorrect
                };
                question.Answers.Add(a);
                _letQuizContext.Answers.Add(a);
            }

            return _letQuizContext.SaveChanges() > 0;
        }
    }
}
