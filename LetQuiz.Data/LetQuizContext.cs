using LetQuiz.Domain;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace LetQuiz.Data
{
    public class LetQuizContext : DbContext
    {
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<ResultDetail> ResultDetail { get; set; }

        public LetQuizContext(DbContextOptions<LetQuizContext> options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>()
                .Property(a => a.Status)
                .HasDefaultValueSql("1");

            modelBuilder.Entity<Result>()
                .HasMany(r => r.Answers)
                .WithMany(a => a.Results)
                .UsingEntity<ResultDetail>(rd => rd.HasOne<Answer>().WithMany(),
                    rd => rd.HasOne<Result>().WithMany());
        }
    }
}