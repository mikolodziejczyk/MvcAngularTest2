using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms.Metadata
{
    /// <summary>
    /// Represents an interface common for FormGroupMetadata and FormMetadata.
    /// </summary>
    public interface IControlGroup
    {
        Dictionary<string, GeneralControlMetadata> controls { get; set; }
    }
}
