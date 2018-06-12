using McvAngularTest2.Models;
using MkoForms;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
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
            FormEnvironment fe = new FormEnvironment()
            {
                rootUrl = Url.Content("~/"),
                formMetadataUrl = Url.Content("~/assets/my-form-metadata.json"),
                saveUrl = Url.Action("Save", "Home"),
                okUrl = Url.Action("About"),
                cancelUrl = Url.Action("Index")
            };

            // ViewBag.formEnvironment = JsonConvert.SerializeObject(fe);
            ViewBag.formMetadataUrl = Url.Content("~/assets/my-form-metadata.json");

            return View();
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