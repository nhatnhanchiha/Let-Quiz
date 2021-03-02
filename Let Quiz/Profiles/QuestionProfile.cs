using AutoMapper;
using Let_Quiz.Models;
using LetQuiz.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Let_Quiz.Profiles
{
    public class QuestionProfile : Profile
    {
        public QuestionProfile()
        {
            CreateMap<Question, QuestionDTO>().ForMember(qDTO => qDTO.Answers,
                                                         opt => opt.MapFrom(src => src.Answers));
        }
    }
}
