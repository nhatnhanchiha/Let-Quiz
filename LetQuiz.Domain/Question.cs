using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LetQuiz.Domain
{
    public class Question
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuestionId { get; set; }
        [Required]
        [MaxLength(500)]
        public string Content { get; set; }

        public int QuizId { get; set; }
        public Quiz Quiz { get; set; }

        public List<Answer> Answers { get; set; }
    }
}
