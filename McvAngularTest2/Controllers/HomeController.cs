using Newtonsoft.Json;
using System;
using System.Collections.Generic;
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
            FormEnvironment fe = new FormEnvironment() {
                rootUrl = Url.Content("~/"),
                formMetadataUrl = Url.Content("~/assets/my-form-metadata.json"),
                saveUrl = Url.Action("Save","Home"),
                okUrl = Url.Action("About"),
                cancelUrl = Url.Action("Index")
            };

            // ViewBag.formEnvironment = JsonConvert.SerializeObject(fe);
            ViewBag.formMetadataUrl = Url.Content("~/assets/my-form-metadata.json");

            return View();
        }


    }
}