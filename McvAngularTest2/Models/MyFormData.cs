using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace McvAngularTest2.Models
{
    public class MyFormData
    {
        public int? id { get; set; }
        public int locationId { get; set; }
        public string displayName { get; set; }

        public decimal? unitPrice { get; set; }
        public int startYear { get; set; }
        public string lastName { get; set; }
        public bool notifyViaMail { get; set; }

        public PersonNameVM extraPerson { get; set; }

        public string[] recipients { get; set; }

        public PersonNameVM[] contacts {get; set;}
    }
}