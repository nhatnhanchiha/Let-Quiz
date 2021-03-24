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

        public IEnumerable<Quiz> GetQuizzes(PageInfoDTO pageInfo)
        {
            int offset = (pageInfo.CurrentPage - 1) * pageInfo.MaxRecord;

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
            }).Where(q => q.IsExpire == false && q.Name.Contains(pageInfo.SearchValue)).OrderByDescending(q => q.CreateDate).Skip(offset).Take(pageInfo.MaxRecord).ToList();

            return quizzes;
        }
        public IEnumerable<Quiz> GetQuizzesForTeacher(PageInfoDTO pageInfo)
        {
            int offset = (pageInfo.CurrentPage - 1) * pageInfo.MaxRecord;

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
            }).Where(q => q.Name.Contains(pageInfo.SearchValue)).OrderByDescending(q => q.CreateDate).Skip(offset).Take(pageInfo.MaxRecord).ToList();

            return quizzes;
        }

        public int GetMaxPage(PageInfoDTO pageInfo)
        {
            var numRecord = _letQuizContext.Quizzes.Where(q => q.IsExpire == false && q.Name.Contains(pageInfo.SearchValue)).Count();

            return (int)Math.Ceiling((numRecord * 1.0) / pageInfo.MaxRecord);
        }
        public int GetMaxPageForTeacher(PageInfoDTO pageInfo)
        {
            var numRecord = _letQuizContext.Quizzes.Where(q => q.Name.Contains(pageInfo.SearchValue)).Count();

            return (int)Math.Ceiling((numRecord * 1.0) / pageInfo.MaxRecord);
        }

        public IEnumerable<Quiz> GetOwnQuizzes(string username)
        {
            var quizzes = _letQuizContext.Quizzes.Select(q => new Quiz
            {
                QuizId = q.QuizId,
                Name = q.Name,
                Password = q.Password,
                CreateDate = q.CreateDate,
                Duration = q.Duration,
                MaxPoint = q.MaxPoint,
                AccountUsername = q.AccountUsername,
                IsExpire = q.IsExpire
            }).Where(q => q.AccountUsername == username).ToList();

            return quizzes;
        }

        public Quiz GetQuiz(int quizID)
        {
            var q = _letQuizContext.Quizzes.Find(quizID);
            Quiz quiz = new Quiz
            {
                QuizId = quizID,
                Name = q.Name,
                Password = q.Password,
                CreateDate = q.CreateDate,
                Duration = q.Duration,
                MaxPoint = q.MaxPoint,
                IsExpire = q.IsExpire,
                AccountUsername = q.AccountUsername
            };
            return quiz;
        }

        public void UpdateQuiz(Quiz quiz)
        {
            _letQuizContext.Quizzes.Update(quiz);
        }

        public bool SaveChanges()
        {
            return _letQuizContext.SaveChanges() > 0;
        }

        public bool InsertQuiz(QuizDTO quizt)
        {
            var quiz = new Quiz
            {
                Name = quizt.Name,
                Password = quizt.Password,
                CreateDate = DateTime.Now,
                Duration = quizt.Duration,
                MaxPoint = quizt.MaxPoint,
                IsExpire = quizt.IsExpire,
                AccountUsername = quizt.TeacherName,
                Questions = new List<Question>()
            };
            foreach (QuestionDTO question in quizt.QuestionDtos)
            {
                quiz.Questions.Add(new Question
                {
                    Content = question.Content,
                    QuizId = quiz.QuizId,
                    Answers = new List<Answer>()
                });
                foreach (AnswerDTO awnser in question.Answers)
                {
                    quiz.Questions.ElementAt<Question>(quiz.Questions.Count - 1).Answers.Add(new Answer
                    {
                        QuestionId = quiz.Questions.ElementAt<Question>(quiz.Questions.Count - 1).QuestionId,
                        Content = awnser.Content,
                        IsCorrect = awnser.IsCorrect
                    });
                    quiz.Questions.ElementAt<Question>(quiz.Questions.Count - 1).Answers = ShuffleList<AnswerDTO>(quiz.Questions.ElementAt<Question>(quiz.Questions.Count - 1).Answers);
                }
            }

            _letQuizContext.Quizzes.Add(quiz);
            return _letQuizContext.SaveChanges() > 0;
        }
        private List<Answer> ShuffleList<T>(List<Answer> answers)
        {
            List<Answer> list = new List<Answer>();
            Random rnd = new Random();
            int totalItem = answers.Count;
            Answer obj;
            while (totalItem >= 1)
            {
                totalItem -= 1;
                int nextIndex = rnd.Next(totalItem, answers.Count);
                obj = answers[nextIndex];
                answers[nextIndex] = answers[totalItem];
                answers[totalItem] = obj;
            }
            foreach (Answer x in answers)
            {
                list.Add(x);
            }
            return list;
        }
    }
}
