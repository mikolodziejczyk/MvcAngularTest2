using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace McvAngularTest2.Models
{
    public class StoreableViewSettings
    {
        public string[] columns { get; set; }
        public int[] columnRelativeWidths { get; set; }
        public SortMeta[] sort { get; set; }
        public IDictionary<string, FilterEntry> filters { get; set; }
    }
}