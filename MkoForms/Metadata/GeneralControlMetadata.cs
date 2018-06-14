using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.Metadata
{
    public class GeneralControlMetadata
    {
        public GeneralControlMetadata(string type)
        {
            this.type = type;
        }

        public string type;
        public string label;
        public bool? isRequired;
        public string help;
        public string id;
        public string name;
    }
}
