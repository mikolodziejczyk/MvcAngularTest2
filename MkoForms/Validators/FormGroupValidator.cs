using MkoForms.ControlValidators;
using MkoForms.Metadata;
using MkoForms.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.Validators
{
    public class FormGroupValidator : GeneralControlValidator
    {
        public override void Validate(object value, GeneralControlMetadata metadata)
        {
            // validates for required                     
            base.Validate(value, metadata);

            FormGroupMetadata m = (FormGroupMetadata)metadata;

            if (value != null)
            {
                ControlGroupValidator.Validate(value, m);
            }
        }
    }
}
