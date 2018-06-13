using MkoForms.ControlValidators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.ControlMetadata
{
    [ValidatorType(typeof(TextInputControlBaseValidator))]
    public class TextInputControlBaseMetadata : GeneralControlMetadata
    {
        public string placeholder;
        public int maxLength;
        public string controlSize;
    }
}
