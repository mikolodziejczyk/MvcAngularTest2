using MkoForms.ControlValidators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.ControlMetadata
{
    [ValidatorType(typeof(DecimalControlValidator))]
    public class DecimalControlMetadata : TextInputControlBaseMetadata
    {
        const string type_string = "decimal";

        public DecimalControlMetadata()
        {
            type = type_string;
        }

        public decimal? min;
        public decimal? max;
        public decimal? maxDecimalDigits;
    }
}
