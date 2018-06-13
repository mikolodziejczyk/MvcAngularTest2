using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.ControlMetadata
{
    public class CheckboxControlMetadata : GeneralControlMetadata
    {
        const string type_string = "checkbox";

        public CheckboxControlMetadata()
        {
            type = type_string;
        }

        public string additionalLabel;
    }
}
