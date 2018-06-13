using McvAngularTest2.Models;
using MkoForms;
using MkoForms.ControlMetadata;
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

            // ViewBag.formEnvironment = JsonConvert.SerializeObject(fe);
            ViewBag.formMetadataUrl = Url.RouteUrl("api", new { controller = "Home", action = "FormMetadata" });

            return View();
        }

        public ActionResult FormMetadata()
        {
            FormMetadata fd = new FormMetadata()
            {
                saveUrl = Url.RouteUrl("api", new { controller = "Home", action = "Save" }),
                okUrl = Url.Action("Index"),
                cancelUrl = Url.Action("About")
            };

            fd.controls.Add("unitPrice", new DecimalControlMetadata()
            {
                id = "unitPrice_id",
                name = "unitPrice_name",
                label = "Cena jednostkowa",
                isRequired = false,
                help = "Cena jednostkowa za towar bez uwzględnienia rabatów. Szczegóły <small><a href='http://global-solutions.pl'>Pomoc 21342</a></small>",
                min = 0,
                max = 100000,
                maxDecimalDigits = 2
            });

            fd.controls.Add("startYear", new IntegerControlMetadata()
            {
                label = "Rok - początek",
                isRequired = true,
                help = "Rok początkowy <b>lorem ipsum</b> with html. <i>This is dynamic</i>",
                placeholder = "Rok początkowy",
                maxLength = 4,
                controlSize = "medium",
                min = 1900,
                max = 2100
            });

            fd.controls.Add("lastName", new StringControlMetadata()
            {
                label = "Nazwisko",
                isRequired = true,
                controlSize = "medium",
                maxLength = 20,
                minLength = 2
            });

            fd.controls.Add("notifyViaMail", new CheckboxControlMetadata()
            {
                label = "Wyślij e-mail",
                help = "Zaznacz aby otrzymywać powiadomienia poprzez e-mail.",
                additionalLabel = "Powiadomienia e-mail"
            });



            var rs = JsonConvert.SerializeObject(fd, new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore
            });

            return Content(rs, "application/json");
        }

        public ActionResult Save(MyFormData data)
        {
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