using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Let_Quiz.Models
{
    public class QuizDTO
    {
        public int QuizId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public DateTime CreateDate { get; set; }
        public float Duration { get; set; }
        public float MaxPoint { get; set; }
        public bool IsExpire { get; set; }
        public string TeacherName { get; set; }
    }
}
