using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MkoForms.ControlMetadata;

namespace MkoForms.ControlValidators
{
    public class StringControlValidator : TextInputControlBaseValidator
    {
        public override void Validate(object value, GeneralControlMetadata metadata)
        {
            StringControlMetadata m = (StringControlMetadata)metadata;

            if (value != null)
            {
                var s = value as string;

                if (s.Length < m.minLength)
                {
                    throw new InvalidOperationException(String.Format("The minimum length is {0} and the actual is {1}.", m.minLength, s.Length));
                }

                if (s.Length > m.maxLength)
                {
                    throw new InvalidOperationException(String.Format("The maximum length is {0} and the actual is {1}.", m.maxLength, s.Length));
                }

            }

            base.Validate(value, metadata);
        }
    }
}
