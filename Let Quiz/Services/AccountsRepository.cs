using Let_Quiz.Models;
using LetQuiz.Data;
using LetQuiz.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Let_Quiz.Services
{
    public class AccountsRepository : IAccountsRepository
    {
        private readonly LetQuizContext _letQuizContext;

        public AccountsRepository(LetQuizContext letQuizContext)
        {
            this._letQuizContext = letQuizContext;
        }

        public Account CheckLogin(string userName, string password)
        {
            var account = _letQuizContext.Accounts.FirstOrDefault(c => c.Username.Equals(userName) && c.Password.Equals(password) && c.Status == true);
            return account;
        }

        public Account GetAccount(string userName)
        {
            var acc = _letQuizContext.Accounts.Find(userName);

            var account = new Account
            {
                Username = acc.Username,
                Name = acc.Name,
                IsTeacher = acc.IsTeacher
            };

            return account;
        }
    }
}
