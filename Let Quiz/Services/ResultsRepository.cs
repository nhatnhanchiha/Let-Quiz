﻿using Let_Quiz.Models;
using LetQuiz.Data;
using LetQuiz.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Let_Quiz.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace Let_Quiz.Services
{
    public class ResultsRepository : IResultsRepository
    {
        private readonly LetQuizContext _letQuizContext;
        private readonly IMapper _mapper;

        public ResultsRepository(LetQuizContext letQuizContext, IMapper mapper)
        {
            _letQuizContext = letQuizContext;
            _mapper = mapper;
        }

        public Result AddResult(QuizAnswerDTO quizAnswer)
        {
            float point = CalculatePoint(quizAnswer.QuizId, quizAnswer.AnswerSelect);

            var result = new Result
            {
                QuizId = quizAnswer.QuizId,
                AccountUsername = quizAnswer.Username,
                Point = point,
                StartTime = DateTime.Parse(quizAnswer.StartTime),
                FinishTime = DateTime.Parse(quizAnswer.FinishTime),
            };

            _letQuizContext.Results.Add(result);
            if (_letQuizContext.SaveChanges() > 0)
            {
                foreach (var answerSelect in quizAnswer.AnswerSelect)
                {
                    if (answerSelect.AnswerId != 0)
                    {
                        _letQuizContext.ResultDetail.Add(new ResultDetail
                        {
                            ResultId = result.ResultId,
                            AnswerId = answerSelect.AnswerId
                        });
                    }
                }

                _letQuizContext.SaveChanges();

                return result;
            }

            return null;
        }

        public PagedList<ResultDTO> GetResultsByUserName(string username, ResultParams resultParams)
        {
            var query = _letQuizContext.Results
                .Where(r => r.AccountUsername == username)
                .Include(r => r.Quiz)
                .ProjectTo<ResultDTO>(_mapper.ConfigurationProvider)
                .Where(r => (r.NameOfQuiz.ToLower().Contains(resultParams.QuizName == null ? "" : resultParams.QuizName.ToLower())))
                .OrderByDescending(r => r.FinishTime)
                .AsNoTracking();
            return PagedList<ResultDTO>.Create(query, resultParams.PageNumber, resultParams.PageSize);
        }

        public ResultDTO GetResultWithFullDetail(string username, int id)
        {
            var now = DateTime.Now;
            return _letQuizContext.Results
                .Where(r => r.AccountUsername == username)
                .Where(r => r.ResultId == id)
                .Where(r => r.FinishTime < now)
                .Include(r => r.Answers)
                .Include(r => r.Quiz)
                .ThenInclude(q => q.Questions)
                .ThenInclude(q => q.Answers)
                .ProjectTo<ResultDTO>(_mapper.ConfigurationProvider)
                .AsNoTracking()
                .FirstOrDefault();
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
