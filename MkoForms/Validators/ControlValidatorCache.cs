using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.Validators
{
    static class ControlValidatorCache
    {
        static ConcurrentDictionary<Type, Type> controlMetadataToValidator = new ConcurrentDictionary<Type, Type>();

        public static Type GetValidator(Type metadataType)
        {
            Type r = null;

            if (controlMetadataToValidator.TryGetValue(metadataType, out r) == false)
            {
                object[] attrs = metadataType.GetCustomAttributes(typeof(ValidatorTypeAttribute), false);

                if (attrs.Length == 1)
                {
                    ValidatorTypeAttribute vta = (ValidatorTypeAttribute)attrs[0];

                    r = vta.ValidatorType;

                    controlMetadataToValidator.TryAdd(metadataType, r);
                }
            }

            return r;

        }
    }
}