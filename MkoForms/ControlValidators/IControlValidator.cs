using MkoForms.ControlMetadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MkoForms.Metadata;

namespace MkoForms.ControlValidators
{
    public interface IControlValidator
    {
        void Validate(object value, GeneralControlMetadata metadata);
    }
}
