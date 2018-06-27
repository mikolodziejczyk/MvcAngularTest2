using McvAngularTest2.Models;
using MkoForms;
using MkoForms.ControlMetadata;
using MkoForms.Metadata;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;

namespace McvAngularTest2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Edit(int id)
        {
            MyFormData data = GetData(id);

            string initialData = JsonConvert.SerializeObject(data);

            ViewBag.formMetadataUrl = Url.RouteUrl("api", new { controller = "Home", action = "FormMetadata" });

            return View((object)initialData);
        }

       

        public ActionResult FormMetadata()
        {
            IControlGroup fd = MyFormMetadata.GetMetadata();

            var rs = JsonConvert.SerializeObject(fd, new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore
            });

            return Content(rs, "application/json");
        }

        public ActionResult Load(int? id)
        {
            MyFormData data;

            if (id.HasValue)
            {
                data = GetData(id.Value);
            }
            else
            {
                data = new MyFormData();
            }

            string initialData = JsonConvert.SerializeObject(data);
            return Content(initialData, "application/json");
        }

        public ActionResult Save(MyFormData data)
        {
            IControlGroup fd = MyFormMetadata.GetMetadata();

            MkoForms.Validators.ControlGroupValidator.Validate(data, fd);


            var r = new FormSaveReply();

            if (data.lastName == "Fail")
            {
                r.isFailure = true;
                r.failureMessage = "Nie udało się zapisać zmian, błąd na żądanie użytkownika.";

            }
            else if (data.lastName == "Error")
            {
                r.isError = true;
                r.errors = new string[] { "Wartość jest niewystarczająca.", "Podane wartości są bez sensu!" };

                r.propertyErrors = new Dictionary<string, object>();
                r.propertyErrors["notifyViaMail"] = "In %s you must allow notifying by mail";
                r.propertyErrors["extraPerson.lastName"] = "In %s the name seems suspicious.";
                r.propertyErrors["recipients.0"] = "W polu %s wartość jest brzydka.";
                r.propertyErrors["contacts.0.firstName"] = new string[] { "W polu %s mamy pierwszy błąd.", "W polu %s mamy też błąd kolejny" };

                int lastIndex = data.contacts.Length - 1;
                string path = string.Format("contacts.{0}.lastName", lastIndex);
                r.propertyErrors[path] = "In %s we have an error added dynamically";
            }
            else
            {
                r.isSuccess = true;
            }


            var rs = JsonConvert.SerializeObject(r, new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore
            });
            return Content(rs, "application/json");

        }

        private MyFormData GetData(int id)
        {
            return new MyFormData()
            {
                id = id,
                locationId = 1,
                displayName = "Wpis próbny",

                unitPrice = 321.12m,
                startYear = 2001,
                notifyViaMail = true,
                extraPerson = new PersonNameVM() { firstName = "John", lastName = "Doe" },
                address = new Address()
                {
                    address1 = "ul. Jakaś 12/34",
                    address2 = "w podwórzu",
                    city = "Siemianowice Śląskie",
                    zip = "12-456"
                },
                recipients = new string[] { "tom@gmail.com", "john@somewhere.com", "harry@nowhere.com" },
                contacts = new PersonNameVM[]
                {
                    new PersonNameVM() {firstName = "Jan", lastName = "Kowalski"},
                    new PersonNameVM() {firstName = "Tomasz", lastName = "Nowak"},
                }

            };
        }

    }
}