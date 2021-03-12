using AutoMapper;
using Let_Quiz.Models;
using LetQuiz.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Let_Quiz.Profiles
{
    public class QuizProfile : Profile
    {
        public QuizProfile()
        {
            CreateMap<Quiz, QuizDTO>().ForMember(quizDTO => quizDTO.TeacherName,
                opt => opt.MapFrom(src => src.Account.Name))
                .ForMember(des => des.QuestionDtos,
                    opt => opt.MapFrom(
                        src => src.Questions));
        }
    }
}
