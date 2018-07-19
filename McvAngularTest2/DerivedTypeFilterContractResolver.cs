using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace McvAngularTest2
{
    public class IgnoreThisTypePropertyFilterContractResolver<T> :
            DefaultContractResolver
    {
        protected override JsonProperty CreateProperty(
              MemberInfo member,
              MemberSerialization memberSerialization)
        {
            JsonProperty property = base.CreateProperty(
                 member, memberSerialization);
            if (property.DeclaringType == typeof(T))
            {
                property.ShouldSerialize =
                  instance => false;
            }
            return property;
        }
    }
}