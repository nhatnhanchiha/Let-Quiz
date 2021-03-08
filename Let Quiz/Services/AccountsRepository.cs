using Let_Quiz.Models;
using LetQuiz.Data;
using LetQuiz.Domain;
using Microsoft.EntityFrameworkCore;
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
            var account = _letQuizContext.Accounts.AsNoTracking().FirstOrDefault(c => c.Username.Equals(userName) && c.Password.Equals(password) && c.Status == true);
            return account;
        }

        public Account GetAccount(string userName)
        {
            var acc = _letQuizContext.Accounts.Find(userName);

            var account = new Account
            {
                Username = acc.Username,
                Name = acc.Name,
                IsTeacher = acc.IsTeacher,
                Status = acc.Status
            };

            return account;
        }

        public Account CheckUserNameExist(string userName)
        {
            var acc = _letQuizContext.Accounts.Find(userName);

            if(acc == null)
            {
                return new Account()
                {
                    Username = ""
                };
            }

            return new Account
            {
                Username = acc.Username,
            };
        }

        public bool AddNewAccount(Account account)
        {
            _letQuizContext.Accounts.Add(account);
            return _letQuizContext.SaveChanges() > 0;
        }

        public void Update(Account account)
        {
            _letQuizContext.Accounts.Update(account);
        }

        public bool SaveChanges()
        {
            return _letQuizContext.SaveChanges() > 0;
        }
    }
}
