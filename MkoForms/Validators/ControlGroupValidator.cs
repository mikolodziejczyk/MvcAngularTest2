using MkoForms.ControlMetadata;
using MkoForms.ControlValidators;
using MkoForms.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.Validators
{
    public class ControlGroupValidator
    {

        public static void Validate(object model, IControlGroup metadata)
        {
            Tuple<string, GeneralControlMetadata>[] controls = metadata.controls.Select(x => Tuple.Create(x.Key, x.Value)).ToArray();

            Type modelType = model.GetType();

            foreach (var control in controls)
            {
                Type controlMetadataType = control.Item2.GetType();
                Type validatorType = ControlValidatorCache.GetValidator(controlMetadataType);
                IControlValidator controlValidator = (IControlValidator)Activator.CreateInstance(validatorType);

                object value = modelType.GetProperty(control.Item1).GetValue(model, null);
                GeneralControlMetadata controlMetadata = control.Item2;

                controlValidator.Validate(value, controlMetadata);
            }

        }


    }
}
