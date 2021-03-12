using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Let_Quiz.Models
{
    public class PagingQuizDTO
    {
        public string SearchValue { get; set; }
        public int CurrentPage { get; set; }
        public int MaxPage { get; set; }
        public string NextPage { get; set; }
        public string PreviousPage { get; set; }
        public IEnumerable<QuizDTO> Quizzes { get; set; }
    }
}
