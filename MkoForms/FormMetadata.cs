using MkoForms.ControlMetadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms
{
    public class FormMetadata
    {
        public Dictionary<string, GeneralControlMetadata> controls;
        public string saveUrl;
        public Navigation navigation;
    }
}
