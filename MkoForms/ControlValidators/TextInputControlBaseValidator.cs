using MkoForms.ControlMetadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MkoForms.Metadata;


namespace MkoForms.ControlValidators
{
    public class TextInputControlBaseValidator : GeneralControlValidator
    {
        public override void Validate(object value, GeneralControlMetadata metadata)
        {
            // this one currently does nothing, the length is tested in the string validator
            base.Validate(value, metadata);
        }
    }
}
