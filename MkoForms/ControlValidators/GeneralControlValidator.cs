using MkoForms.ControlMetadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MkoForms.Metadata;

namespace MkoForms.ControlValidators
{
    public class GeneralControlValidator : IControlValidator
    {
        public virtual void Validate(object value, GeneralControlMetadata metadata)
        {
            if (metadata.isRequired ?? false)
            {
                if (value == null)
                {
                    throw new InvalidOperationException("The value is required but it was null.");
                }
            }
        }
    }
}
