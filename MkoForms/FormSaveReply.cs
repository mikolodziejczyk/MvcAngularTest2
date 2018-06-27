using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MkoForms
{
    public class FormSaveReply
    {
        public FormSaveReply()
        {
        }

        public bool? isSuccess;
        public bool? isError;
        public bool? isFailure;
        
        public string[] errors;
        public string failureMessage;

        public string redirectUrl;

        public IDictionary<string, object> propertyErrors;

        public static FormSaveReply Success
        {
            get
            {
                return new FormSaveReply() { isSuccess = true };
            }
        }
    }
}
