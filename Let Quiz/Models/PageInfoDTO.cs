using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Let_Quiz.Models
{
    public class PageInfoDTO
    {
        public string SearchValue { get; set; }
        public int CurrentPage { get; set; }
        public int MaxRecord { get; set; }
    }
}
