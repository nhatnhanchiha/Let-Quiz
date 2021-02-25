using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace LetQuiz.Domain
{
    public class Result
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ResultId { get; set; }

        public float? Point { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime FinishTime { get; set; }

        public int QuizId { get; set; }
        public Quiz Quiz { get; set; }

        [Required]
        public string AccountUsername { get; set; }
        public Account Account { get; set; }

        public List<Answer> Answers { get; set; }
    }
}
