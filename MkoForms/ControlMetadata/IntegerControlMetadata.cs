using MkoForms.ControlValidators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.ControlMetadata
{
    [ValidatorType(typeof(IntegerControlValidator))]
    public class IntegerControlMetadata : TextInputControlBaseMetadata
    {
        const string type_string = "integer";

        public IntegerControlMetadata()
        {
            type = type_string;
        }

        public int? min;
        public int? max;
    }
}
