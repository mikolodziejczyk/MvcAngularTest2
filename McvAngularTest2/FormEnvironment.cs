using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace McvAngularTest2
{
    /// <summary>
    /// Represents a set of urls that are passed to an angular form.
    /// </summary>
    public class FormEnvironment
    {
        public string rootUrl;
        public string formMetadataUrl;
        public string saveUrl;
        public string okUrl;
        public string cancelUrl;
    }
}