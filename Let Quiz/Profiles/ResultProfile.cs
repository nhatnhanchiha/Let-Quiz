using AutoMapper;
using Let_Quiz.Models;
using LetQuiz.Domain;

namespace Let_Quiz.Profiles
{
    public class ResultProfile : Profile
    {
        public ResultProfile()
        {
            CreateMap<Result, ResultDTO>().ForMember(des => des.NameOfQuiz,
                opt => opt.MapFrom(
                    src => src.Quiz.Name))
                .ForMember(des => des.AnswerDtos, opt => opt.MapFrom(
                    src => src.Answers));
        }
    }
}
