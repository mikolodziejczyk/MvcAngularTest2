using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms
{

    [System.AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
    sealed class ValidatorTypeAttribute : Attribute
    {
        readonly Type validatorType;


        public ValidatorTypeAttribute(Type validatorType)
        {
            this.validatorType = validatorType;

        }

        public Type ValidatorType
        {
            get { return this.validatorType; }
        }

    }
}
