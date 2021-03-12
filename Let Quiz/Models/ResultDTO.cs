using System;
using System.Collections.Generic;
using LetQuiz.Domain;

namespace Let_Quiz.Models
{
    public class ResultDTO
    {
        public int ResultId { get; set; }
        public double Point { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime FinishTime { get; set; }
        public int QuizId { get; set; }
        public QuizDTO Quiz { get; set; }
        public string NameOfQuiz { get; set; }
        public List<AnswerDTO> AnswerDtos { get; set; }
    }
}
