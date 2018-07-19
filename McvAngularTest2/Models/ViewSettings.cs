using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace McvAngularTest2.Models
{
    public class ViewSettings : StoreableViewSettings
    {
        public int id { get; set; }
        public int listId { get; set; }

        public string name { get; set; }
        public bool isPublic { get; set; }
        public bool isTemporary { get; set; }
        public bool isDefault { get; set; }


    }
}