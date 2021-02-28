using Let_Quiz.Models;
using Let_Quiz.Services;
using LetQuiz.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Let_Quiz.Controllers
{
    [ApiController]
    [Route("api/authenticate")]
    public class AuthenticateController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAccountsRepository _accountsRepository;

        public AuthenticateController(IConfiguration configuration, IAccountsRepository accountsRepository)
        {
            this._configuration = configuration;
            this._accountsRepository = accountsRepository;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] AccountDTO account)
        {
            if (account != null || account.Username != null || account.Password != null)
            {
                var acc = _accountsRepository.CheckLogin(account.Username, account.Password);

                if (acc != null)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["JWT:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserName", acc.Username),
                        new Claim("Name", acc.Name),
                        new Claim("IsTeacher", acc.IsTeacher.ToString())
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                            _configuration["JWT:Issure"],
                            _configuration["JWT:Audience"],
                            claims,
                            expires: DateTime.UtcNow.AddMinutes(3),
                            signingCredentials: signIn
                        );

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
