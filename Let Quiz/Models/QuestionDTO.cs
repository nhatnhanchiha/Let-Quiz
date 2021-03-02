using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Let_Quiz.Models
{
    public class QuestionDTO
    {
        public int QuestionId { get; set; }
        public string Content { get; set; }
        public List<AnswerDTO> Answers { get; set; }
    }
}
