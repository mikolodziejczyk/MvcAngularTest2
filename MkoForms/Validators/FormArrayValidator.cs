using MkoForms.ControlValidators;
using MkoForms.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.Validators
{
    public class FormArrayValidator : GeneralControlValidator
    {
        public override void Validate(object value, GeneralControlMetadata metadata)
        {
            // validates for required                     
            base.Validate(value, metadata);

            FormArrayMetadata m = (FormArrayMetadata)metadata;

            if (value != null)
            {
                object[] items = ((System.Collections.IList)value).OfType<object>().ToArray();
                int length = items.Length;

                // 0-item array passes isRequired check; it must be enforced by minLength == 1

                if (m.minLength.HasValue)
                {
                    if (length < m.minLength.Value)
                    {
                        throw new InvalidOperationException(String.Format("The minimum length of the array is {0} and the actual is {1}.", m.minLength, length));
                    }
                }

                if (m.maxLength.HasValue)
                {
                    if (length > m.maxLength.Value)
                    {
                        throw new InvalidOperationException(String.Format("The maximum length of the array is {0} and the actual is {1}.", m.maxLength, length));
                    }
                }

                ValidateArray(items, m.itemMetadata);
            }
        }


        public static void ValidateArray(object[] items, GeneralControlMetadata itemMetadata)
        {
            Type validatorType = ControlValidatorCache.GetValidator(itemMetadata.GetType());
            IControlValidator itemValidator = (IControlValidator)Activator.CreateInstance(validatorType);

            for (int i = 0; i < items.Length; i++)
            {
                itemValidator.Validate(items[i], itemMetadata);
            }
        }
    }
}
