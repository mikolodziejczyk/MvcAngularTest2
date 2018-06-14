using MkoForms.ControlMetadata;
using MkoForms.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.Metadata
{
    public class FormMetadata : IControlGroup
    {
        public FormMetadata()
        {
            this.controls = new Dictionary<string, GeneralControlMetadata>();
        }

        public Dictionary<string, GeneralControlMetadata> controls { get; set; }

        public string saveUrl;
        public string okUrl;
        public string cancelUrl;
    }
}
