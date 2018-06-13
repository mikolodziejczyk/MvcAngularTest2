using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.ControlMetadata
{
    public class StringControlMetadata : TextInputControlBaseMetadata
    {
        const string type_string = "string";

        public StringControlMetadata()
        {
            type = type_string;
        }


        public int? minLength;
    }
}
