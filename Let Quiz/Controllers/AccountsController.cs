using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LetQuiz.Data;
using LetQuiz.Domain;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Let_Quiz.Models;
using Let_Quiz.Services;

namespace Let_Quiz.Controllers
{
    [Authorize]
    [Route("api/accounts")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly LetQuizContext _context;
        private readonly IMapper _mapper;
        private readonly IAccountsRepository _accountsRepository;

        public AccountsController(LetQuizContext context, IAccountsRepository accountsRepository, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _accountsRepository = accountsRepository;
        }

        // Get: api/accounts/Username
        [HttpGet("{Username}")]
        public ActionResult<AccountDTO> GetAccount(string Username)
        {
            var account = _accountsRepository.GetAccount(Username);

            return Ok(_mapper.Map<AccountDTO>(account));
        }

        //// POST: api/Accounts
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Account>> PostAccount(Account account)
        //{
        //    _context.Accounts.Add(account);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (AccountExists(account.Username))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetAccount", new { id = account.Username }, account);
        //}

        //// DELETE: api/Accounts/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteAccount(string id)
        //{
        //    var account = await _context.Accounts.FindAsync(id);
        //    if (account == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Accounts.Remove(account);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool AccountExists(string id)
        //{
        //    return _context.Accounts.Any(e => e.Username == id);
        //}
    }
}
