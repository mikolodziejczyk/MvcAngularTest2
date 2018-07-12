using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace McvAngularTest2.Controllers
{
    public class ViewManagerController : Controller
    {
        int userId = 123; // simulates the current user id
        int listId = 234; // shoud come from the object
        
        /// <summary>
        /// Sets the specified view data as the current view for the specified user.
        /// </summary>
        /// <param name="viewSettings"></param>
        /// <returns></returns>
        public ActionResult SetTemporaryView(ViewSettings viewSettings)
        {
            if (viewSettings.isPublic || viewSettings.isDefault || !viewSettings.isTemporary) throw new InvalidOperationException("A view cannot be public, default for this settings but must be temporary.");

            using (AngularPatternsEntities context = new AngularPatternsEntities())
            {
                ListViewSettings[] existing = context.ListViewSettings.Where(x => x.UserId == userId && x.IsTemporary).ToArray();
                foreach (var x in existing) context.ListViewSettings.Remove(x);

                UserActiveView userActiveView = context.UserActiveView.FirstOrDefault(x => x.UserId == userId);
                if (userActiveView != null) context.UserActiveView.Remove(userActiveView);

                ListViewSettings lvs = new ListViewSettings();
                lvs.IsDefault = false;
                lvs.IsTemporary = true;
                lvs.UserId = userId;
                lvs.ListId = listId;
                lvs.Name = viewSettings.name;
                lvs.ViewData = JsonConvert.SerializeObject(viewSettings);

                context.ListViewSettings.Add(lvs);


                userActiveView = new UserActiveView();
                userActiveView.ListId = lvs.ListId;
                userActiveView.UserId = userId;
                userActiveView.ListViewSettings = lvs;

                context.UserActiveView.Add(userActiveView);

                context.SaveChanges();
            }

            return Json(true);
        }

        /// <summary>
        /// Gets the current view settings for the specified user.
        /// </summary>
        /// <param name="listId"></param>
        /// <returns></returns>
        public ActionResult GetCurrent(int listId)
        {

            ListViewSettings lvs = null;

            using (AngularPatternsEntities context = new AngularPatternsEntities())
            {
                UserActiveView userActiveView = context.UserActiveView.FirstOrDefault(x => x.UserId == userId);

                if (userActiveView != null)
                {
                    lvs = context.ListViewSettings.First(x => x.Id == userActiveView.ViewId);
                }
            }

            return Content(JsonConvert.SerializeObject(lvs), "application/json");
        }
    }
}