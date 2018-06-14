using MkoForms.ControlValidators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.ControlMetadata
{
    [ValidatorType(typeof(StringControlValidator))]
    public class StringControlMetadata : TextInputControlBaseMetadata
    {
        const string type_string = "string";

        public StringControlMetadata()
            : base(type_string)
        {
        }


        public int? minLength;
    }
}
