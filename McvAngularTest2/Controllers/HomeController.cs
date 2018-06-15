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

        public ActionResult Edit()
        {
            MyFormData data = new MyFormData()
            {
                id = 234,
                locationId = 1,
                displayName = "Wpis próbny",

                unitPrice = 321.12m,
                startYear = 2001,
                notifyViaMail = true,
                extraPerson = new PersonNameVM() { firstName = "John", lastName = "Doe" }
            };

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

    }
}