using LetQuiz.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Let_Quiz.Services
{
    public interface IAccountsRepository
    {
        Account CheckLogin(string userName, string password);
        Account GetAccount(string userName);
    }
}
