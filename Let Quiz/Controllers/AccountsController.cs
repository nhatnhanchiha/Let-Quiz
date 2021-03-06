﻿using System;
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

        // Anh Dung
        // Get: api/accounts/{Username}
        [Authorize]
        [HttpGet("{Username}")]
        public ActionResult<AccountDTO> GetAccount(string Username)
        {
            var account = _accountsRepository.GetAccount(Username);

            return Ok(_mapper.Map<AccountDTO>(account));
        }

        // Anh Dung
        // Get: api/accounts
        [HttpGet]
        public ActionResult<AccountDTO> CheckUserNameExist([FromQuery] string Username)
        {
            var account = _accountsRepository.CheckUserNameExist(Username);

            return Ok(_mapper.Map<AccountDTO>(account));
        }

        // Anh Dung
        // Post: api/accounts
        [HttpPost]
        public ActionResult<AccountDTO> AddNewAccount([FromBody] Account account)
        {
            _accountsRepository.AddNewAccount(account);

            return Created("https://localhost:44300/api/authenticate", _mapper.Map<AccountDTO>(account));
        }

        [Authorize]
        [HttpGet("profile")]
        public ActionResult<AccountDTO> GetProfile()
        {
            var username = User.FindFirst("UserName")?.Value;
            var account = _accountsRepository.GetAccount(username);
            return Ok(_mapper.Map<AccountDTO>(account));
        }

        [Authorize]
        [HttpPut("update-profile")]
        public ActionResult UpdateProfile(UpdateStudentProfileDTO dto)
        {
            var username = User.FindFirst("UserName")?.Value;
            var account = _accountsRepository.CheckLogin(username, dto.Password);
            if (account == null)
            {
                return BadRequest();
            }

            account.Name = dto.Name;

            _accountsRepository.Update(account);

            _accountsRepository.SaveChanges();

            return NoContent();
        }

        [Authorize]
        [HttpPut("update-password")]
        public ActionResult UpdatePassword(UpdatePasswordDTO dto)
        {
            var username = User.FindFirst("UserName")?.Value;
            var account = _accountsRepository.CheckLogin(username, dto.CurrentPassword);
            if (account == null)
            {
                return BadRequest();
            }

            account.Password = dto.NewPassword;

            _accountsRepository.Update(account);

            _accountsRepository.SaveChanges();

            return NoContent();
        }
    }
}
