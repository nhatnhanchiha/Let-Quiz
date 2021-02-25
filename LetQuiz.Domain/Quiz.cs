using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LetQuiz.Domain
{
    public class Quiz
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuizId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public string Password { get; set; }
        public DateTime CreateDate { get; set; }
        public float Duration { get; set; }
        public float MaxPoint { get; set; }
        public bool IsExpire { get; set; }

        [Required]
        public string AccountUsername { get; set; }
        public Account Account { get; set; }

        public List<Question> Questions { get; set; }

        public List<Result> Results { get; set; }
    }
}
