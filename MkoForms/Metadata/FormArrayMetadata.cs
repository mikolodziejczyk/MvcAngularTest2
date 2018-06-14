using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.Metadata
{
    public class FormArrayMetadata : GeneralControlMetadata
    {
        const string type_string = "form_array";

        public FormArrayMetadata()
            : base(type_string)
        {
        }

        /// <summary>
        /// The minimum number of items, if the value is required, this usually should be set to 1.
        /// </summary>
        public int? minLength;
        public int? maxLength;

        public GeneralControlMetadata itemMetadata;
    }
}
