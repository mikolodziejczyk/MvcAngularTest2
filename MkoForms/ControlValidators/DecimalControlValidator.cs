using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MkoForms.ControlMetadata;
using MkoForms.Metadata;

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

                if (m.min.HasValue)
                {
                    if (v < m.min.Value)
                    {
                        throw new InvalidOperationException(String.Format("The minimum value is {0} and the actual is {1}.", m.min, v));
                    }
                }

                if (m.max.HasValue)
                {
                    if (v > m.max.Value)
                    {
                        throw new InvalidOperationException(String.Format("The maximum value is {0} and the actual is {1}.", m.max, v));
                    }
                }


                if (m.maxDecimalDigits.HasValue)
                {
                    if (v != Decimal.Round(v, m.maxDecimalDigits.Value, MidpointRounding.AwayFromZero))
                    {
                        throw new InvalidOperationException(String.Format("The maximum number of digits after the decimal point is {0} and the actual is greater.", m.maxDecimalDigits));
                    }
                }

                base.Validate(value, metadata);
            }
        }
    }
}
