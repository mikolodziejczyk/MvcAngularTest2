using MkoForms.ControlMetadata;
using MkoForms.ControlValidators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.Validators
{
    public class ObjectValidator
    {

        public static void ValidateObject(object model, FormMetadata metadata)
        {
            Tuple<string, GeneralControlMetadata>[] scalarControls = metadata.controls.Where(x => x.Key.Contains(".") == false).Select(x => Tuple.Create(x.Key, x.Value)).ToArray();
            ValidateScalarProperties(model, scalarControls);
        }

        static void ValidateScalarProperties(object model, Tuple<string, GeneralControlMetadata>[] controls)
        {
            Type modelType = model.GetType();

            foreach (var control in controls)
            {
                Type controlMetadataType = control.Item2.GetType();
                IControlValidator controlValidator = new GeneralControlValidator();

                object value = modelType.GetProperty(control.Item1).GetValue(model, null);
                GeneralControlMetadata metadata = control.Item2;

                controlValidator.Validate(value, metadata);
            }

        }


    }
}
