using McvAngularTest2.Models;
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
                ListViewSettings[] existing = context.ListViewSettings.Where(x => x.UserId == userId && x.IsTemporary && x.ListId == viewSettings.listId).ToArray();
                foreach (var x in existing) context.ListViewSettings.Remove(x);

                UserActiveView userActiveView = context.UserActiveView.FirstOrDefault(x => x.UserId == userId);
                if (userActiveView != null) context.UserActiveView.Remove(userActiveView);

                ListViewSettings lvs = new ListViewSettings();
                lvs.IsDefault = false;
                lvs.IsTemporary = true;
                lvs.UserId = userId;
                lvs.ListId = viewSettings.listId;
                lvs.Name = viewSettings.name;
                lvs.ViewData = JsonConvert.SerializeObject(viewSettings, new JsonSerializerSettings() { ContractResolver = new IgnoreThisTypePropertyFilterContractResolver<ViewSettings>() });

                context.ListViewSettings.Add(lvs);


                userActiveView = new UserActiveView();
                userActiveView.ListId = lvs.ListId;
                userActiveView.UserId = userId;
                userActiveView.ListViewSettings = lvs;

                context.UserActiveView.Add(userActiveView);

                context.SaveChanges();

                viewSettings = CreateFromListViewSetting(lvs);
            }

            return Content(JsonConvert.SerializeObject(viewSettings), "application/json");
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
                UserActiveView userActiveView = context.UserActiveView.FirstOrDefault(x => x.UserId == userId && x.ListId == listId);

                if (userActiveView != null)
                {
                    lvs = context.ListViewSettings.First(x => x.Id == userActiveView.ViewId);
                }
            }

            ViewSettings viewSettings = null;
            if (lvs != null) viewSettings = CreateFromListViewSetting(lvs);

            return Content(JsonConvert.SerializeObject(viewSettings), "application/json");
        }


        public ActionResult SaveNewNamedView(ViewSettings viewSettings)
        {
            if (viewSettings.isTemporary) throw new InvalidOperationException("A view cannot be temporary for this method.");

            using (AngularPatternsEntities context = new AngularPatternsEntities())
            {

                // if the view is to be default, remove the default flag from an existing view, if any exist (for this user or public)
                if (viewSettings.isDefault)
                {
                    ListViewSettings existingDefault = null;

                    if (viewSettings.isPublic)
                    {
                        existingDefault = context.ListViewSettings.FirstOrDefault(x => x.UserId == userId && x.ListId == viewSettings.listId && x.IsDefault && !x.IsPublic);
                    }
                    else
                    {
                        existingDefault = context.ListViewSettings.FirstOrDefault(x => x.IsDefault && x.ListId == viewSettings.listId && x.IsPublic);
                    }

                    existingDefault.IsDefault = false;
                }

                // remove any temporary view for this user
                ListViewSettings[] existing = context.ListViewSettings.Where(x => x.UserId == userId && x.IsTemporary && x.ListId == viewSettings.listId).ToArray();
                foreach (var x in existing) context.ListViewSettings.Remove(x);

                // check for a name collision

                bool doesNameExist = false;

                if (viewSettings.isPublic)
                {
                    doesNameExist = context.ListViewSettings.Any(x => x.UserId == userId && !x.IsPublic && x.Name == viewSettings.name);
                }
                else
                {
                    doesNameExist = context.ListViewSettings.Any(x => x.IsPublic && x.Name == viewSettings.name);
                }

                // if there's a name collision, rename the view

                if (doesNameExist) viewSettings.name += String.Format("_{0:yyyy-MM-dd HH:mm}", DateTime.Now);

                // add a new view

                ListViewSettings lvs = new ListViewSettings();
                lvs.IsDefault = viewSettings.isDefault;
                lvs.IsPublic = viewSettings.isPublic;
                lvs.IsTemporary = false;
                lvs.UserId = viewSettings.isPublic ? null: (int?)userId;
                lvs.ListId = viewSettings.listId;
                lvs.Name = viewSettings.name;
                lvs.ViewData = JsonConvert.SerializeObject(viewSettings, new JsonSerializerSettings() { ContractResolver = new IgnoreThisTypePropertyFilterContractResolver<ViewSettings>() });

                context.ListViewSettings.Add(lvs);

                // remove any existing active view for this user

                UserActiveView userActiveView = context.UserActiveView.FirstOrDefault(x => x.UserId == userId);
                if (userActiveView != null) context.UserActiveView.Remove(userActiveView);

                // set this view as an active one

                userActiveView = new UserActiveView();
                userActiveView.ListId = lvs.ListId;
                userActiveView.UserId = userId;
                userActiveView.ListViewSettings = lvs;

                context.UserActiveView.Add(userActiveView);

                context.SaveChanges();


                viewSettings = CreateFromListViewSetting(lvs);
            }

            return Content(JsonConvert.SerializeObject(viewSettings), "application/json");
        }

        public ActionResult GetViewList(int listId)
        {
            using (AngularPatternsEntities context = new AngularPatternsEntities())
            {
                ViewListEntry[] vle = context.ListViewSettings.Where(x => x.ListId == listId && !x.IsTemporary && ((x.IsPublic) || (x.UserId == userId))).Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.IsPublic
                }).ToArray().Select(x => new ViewListEntry() { id = x.Id, name = x.Name, isPublic = x.IsPublic }).ToArray();

                return Content(JsonConvert.SerializeObject(vle), "application/json");
            }
        }

        /// <summary>
        /// Gets the view settings with the specified id.
        /// </summary>
        /// <param name="listId"></param>
        /// <returns></returns>
        public ActionResult GetViewById(int id)
        {
            using (AngularPatternsEntities context = new AngularPatternsEntities())
            {
                ListViewSettings lvs = context.ListViewSettings.FirstOrDefault(x => x.Id == id);

                if (lvs == null) throw new Exception("The view doesn't exist");

                UserActiveView userActiveView = context.UserActiveView.FirstOrDefault(x => x.UserId == userId && x.ListId == lvs.ListId);

                if (userActiveView != null) context.UserActiveView.Remove(userActiveView);

                // set this view as an active one

                userActiveView = new UserActiveView();
                userActiveView.ListId = lvs.ListId;
                userActiveView.UserId = userId;
                userActiveView.ListViewSettings = lvs;

                context.UserActiveView.Add(userActiveView);

                context.SaveChanges();

                ViewSettings viewSettings = CreateFromListViewSetting(lvs);

                return Content(JsonConvert.SerializeObject(viewSettings), "application/json");
            }


        }

        ViewSettings CreateFromListViewSetting(ListViewSettings lvs)
            {
                ViewSettings vs = JsonConvert.DeserializeObject<ViewSettings>(lvs.ViewData);
                vs.name = lvs.Name;
                vs.id = lvs.Id;
                vs.isDefault = lvs.IsDefault;
                vs.isPublic = lvs.IsPublic;
                vs.isTemporary = lvs.IsTemporary;
                vs.listId = lvs.ListId;

                return vs;
            }
        }
    }