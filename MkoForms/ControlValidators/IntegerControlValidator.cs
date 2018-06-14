using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MkoForms.ControlMetadata;
using MkoForms.Metadata;

namespace MkoForms.ControlValidators
{
    public class IntegerControlValidator : TextInputControlBaseValidator
    {
        public override void Validate(object value, GeneralControlMetadata metadata)
        {
            IntegerControlMetadata m = (IntegerControlMetadata)metadata;

            if (value != null)
            {
                var i = Convert.ToInt32(value);

                if (m.min.HasValue)
                {
                    if (i < m.min.Value)
                    {
                        throw new InvalidOperationException(String.Format("The minimum value is {0} and the actual is {1}.", m.min, i));
                    }
                }

                if (m.max.HasValue)
                {
                    if (i > m.max)
                    {
                        throw new InvalidOperationException(String.Format("The maximum value is {0} and the actual is {1}.", m.max, i));
                    }
                }


                base.Validate(value, metadata);
            }
        }
    }

}