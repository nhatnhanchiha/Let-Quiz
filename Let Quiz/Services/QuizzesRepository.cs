using System;
using Let_Quiz.Models;
using LetQuiz.Data;
using LetQuiz.Domain;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Let_Quiz.Services
{
    public class QuizzesRepository : IQuizzesRepository
    {
        private readonly LetQuizContext _letQuizContext;
        private readonly IMapper _mapper;
        private readonly IResultsRepository _resultsRepository;

        public QuizzesRepository(LetQuizContext letQuizContext, IMapper mapper, IResultsRepository resultsRepository)
        {
            _letQuizContext = letQuizContext;
            _mapper = mapper;
            _resultsRepository = resultsRepository;
        }

        public IEnumerable<Quiz> GetQuizzes()
        {
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
            }).Where(q => q.IsExpire == false).ToList();

            return quizzes;
        }

    }
}
