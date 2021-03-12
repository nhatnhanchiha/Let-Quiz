using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Let_Quiz.Models
{
    public class QuizAnswerDTO
    {
        public int QuizId { get; set; }
        public string Username { get; set; }
        public IEnumerable<AnswerSelectDTO> AnswerSelect { get; set; }
        public string StartTime { get; set; }
        public string FinishTime { get; set; }
    }
}
