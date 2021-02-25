using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace LetQuiz.Domain
{
    public class Account
    {
        [Key]
        [MaxLength(50)]
        public string Username { get; set; }
        [Required]
        [MaxLength(30)]
        public string Password { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public bool IsTeacher { get; set; }
        public bool Status { get; set; }

        public List<Quiz> Quizzes { get; set; }
        public List<Result> Results { get; set; }
    }
}
