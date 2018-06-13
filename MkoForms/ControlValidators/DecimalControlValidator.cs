using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MkoForms.ControlMetadata;

namespace MkoForms.ControlValidators
{
    public class DecimalControlValidator : TextInputControlBaseValidator
    {
        public override void Validate(object value, GeneralControlMetadata metadata)
        {
            DecimalControlMetadata m = (DecimalControlMetadata)metadata;

            if (value != null)
            {
                var v = Convert.ToDecimal(value);

                if (v < m.min)
                {
                    throw new InvalidOperationException(String.Format("The minimum value is {0} and the actual is {1}.", m.min, v));
                }

                if (v > m.max)
                {
                    throw new InvalidOperationException(String.Format("The maximum value is {0} and the actual is {1}.", m.max, v));
                }


                base.Validate(value, metadata);
            }
        }
    }
}
