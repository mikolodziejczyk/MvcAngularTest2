using MkoForms.ControlValidators;
using MkoForms.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.ControlMetadata
{
    [ValidatorType(typeof(TextInputControlBaseValidator))]
    public class TextInputControlBaseMetadata : GeneralControlMetadata
    {
        public TextInputControlBaseMetadata(string type)
                 : base(type)
        {

        }

        public string placeholder;
        public int maxLength;
        public string controlSize;
    }
}
