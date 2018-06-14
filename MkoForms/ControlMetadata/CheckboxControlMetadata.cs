using MkoForms.ControlValidators;
using MkoForms.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.ControlMetadata
{
    [ValidatorType(typeof(GeneralControlValidator))]
    public class CheckboxControlMetadata : GeneralControlMetadata
    {
        const string type_string = "checkbox";

        public CheckboxControlMetadata() 
            : base(type_string)
        {
        }

        public string additionalLabel;
    }
}
