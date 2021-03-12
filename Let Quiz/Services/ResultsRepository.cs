using Let_Quiz.Models;
using LetQuiz.Data;
using LetQuiz.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Let_Quiz.Services
{
    public class ResultsRepository : IResultsRepository
    {
        private readonly LetQuizContext _letQuizContext;

        public ResultsRepository(LetQuizContext letQuizContext)
        {
            _letQuizContext = letQuizContext;
        }

        public bool AddResult(QuizAnswerDTO quizAnswer)
        {
            float point = CalculatePoint(quizAnswer.QuizId, quizAnswer.AnswerSelect);

            var result = new Result
            {
                QuizId = quizAnswer.QuizId,
                AccountUsername = quizAnswer.Username,
                Point = point,
                StartTime = DateTime.Now,
                FinishTime = DateTime.Now,
            };

            _letQuizContext.Results.Add(result);
            if (_letQuizContext.SaveChanges() > 0)
            {
                var a = _letQuizContext.Results.OrderBy(r => r.ResultId).LastOrDefault();

                foreach (var answerSelect in quizAnswer.AnswerSelect)
                {
                    if (answerSelect.AnswerId != 0)
                    {
                        _letQuizContext.ResultDetail.Add(new ResultDetail
                        {
                            ResultId = a.ResultId,
                            AnswerId = answerSelect.AnswerId
                        });
                    }
                }

                return _letQuizContext.SaveChanges() > 0;
            }

            return false;
        }

        private float CalculatePoint(int quizID, IEnumerable<AnswerSelectDTO> answerSelects)
        {
            int count = 0;

            // get quiz by quizID
            var quiz = _letQuizContext.Quizzes.AsNoTracking().FirstOrDefault(q => q.QuizId == quizID);

            var numOfQuestion = _letQuizContext.Questions.Count(q => q.QuizId == quizID);

            // get list question of specific quizID
            var questions = _letQuizContext.Questions.Select(q => new Question
            {
                QuestionId = q.QuestionId,
                QuizId = q.QuizId,
                Answers = q.Answers.Select(a => new Answer
                {
                    AnswerId = a.AnswerId,
                    IsCorrect = a.IsCorrect
                }).ToList()
            }).Where(q => q.QuizId == quizID).ToList();

            // calculate number question correct
            foreach (var ansSelect in answerSelects)
            {
                var answer = questions.FirstOrDefault(q => q.QuestionId == ansSelect.QuestionId)
                                 .Answers.FirstOrDefault(a => a.AnswerId == ansSelect.AnswerId);

                if (answer != null)
                {
                    if (answer.IsCorrect)
                    {
                        count += 1;
                    }
                }

            }

            // calculate point
            float point = (float)(1.0 * quiz.MaxPoint / numOfQuestion) * count;

            return point;
        }
    }
}
