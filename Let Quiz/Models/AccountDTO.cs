using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Let_Quiz.Models
{
    public class AccountDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public bool IsTeacher { get; set; }
        public bool Status { get; set; }
    }
}
