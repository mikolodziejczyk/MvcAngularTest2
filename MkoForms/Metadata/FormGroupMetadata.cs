using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.Metadata
{
    public class FormGroupMetadata : GeneralControlMetadata, IControlGroup
    {
        const string type_string = "form_group";

        public FormGroupMetadata()
            : base(type_string)
        {
            this.controls = new Dictionary<string, GeneralControlMetadata>();
        }

        public Dictionary<string, GeneralControlMetadata> controls { get; set; }
    }
}
