using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace McvAngularTest2.Models
{
    public class MyFormData
    {
        public decimal? unitPrice { get; set; }
        public int startYear { get; set; }
        public string lastName { get; set; }
        public bool notifyViaMail { get; set; }
    }
}