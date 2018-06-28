using EnergyPoint.Repository;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace McvAngularTest2.Controllers
{
    public class EpController : Controller
    {
        // GET: Ep
        public ActionResult Index()
        {

            string data;

            using (EnergyPointEntities context = new EnergyPointEntities())
            {
                var r = context.Connection.Select(x => new { ppe = x.PPE, meterCode = x.MeterCode, name = x.Name, tariff = x.Tariff.Name, company = x.Company.Acronym }).ToArray();

                data = JsonConvert.SerializeObject(r);

            }


            return Content(data, "application/json");
        }

        public ActionResult Page(int first, int rows, string globalFilter, MultiSort[] multiSortMeta)
        {

            string data;

            using (EnergyPointEntities context = new EnergyPointEntities())
            {
                IQueryable<Connection> query = context.Connection;

                if (globalFilter != null)
                {
                    query = query.Where(x => x.Name.Contains(globalFilter) || x.PPE.Contains(globalFilter) ||
                                             x.MeterCode.Contains(globalFilter) || x.LocationDescription.Contains(globalFilter) ||
                                             x.Company.Name1.Contains(globalFilter) || x.Company.Acronym.Contains(globalFilter) ||
                                             x.Tariff.Name.Contains(globalFilter)
                                             );
                }

                int count = query.Count();

                query = query.OrderBy(x => x.PPE);

                if (multiSortMeta != null)
                {
                    for (int i = 0; i < multiSortMeta.Length; i++)
                    {

                        string field = multiSortMeta[i].field;
                        bool isAsc = multiSortMeta[i].order == 1;

                        if (i == 0)
                        {
                            switch (field)
                            {
                                case "name": query = isAsc ? query.OrderBy(x => x.Name) : query.OrderByDescending(x => x.Name); break;
                                case "ppe": query = isAsc ? query.OrderBy(x => x.PPE) : query.OrderByDescending(x => x.PPE); break;
                                case "meterCode": query = isAsc ? query = query.OrderBy(x => x.MeterCode) : query.OrderByDescending(x => x.MeterCode); break;
                               case "company": query = isAsc ?  query.OrderBy(x => x.Company.Acronym) : query.OrderByDescending(x => x.Company.Acronym); break;
                                case "tariff": query = isAsc ? query.OrderBy(x => x.Tariff.Name) : query.OrderByDescending(x => x.Tariff.Name); break;
                                    //case "Tariff.NameDESC": query = query.OrderByDescending(x => x.Tariff.Name); break;
                                    //case "StartDateASC": query = query.OrderBy(x => x.StartDate); break;
                                    //case "StartDateDESC": query = query.OrderByDescending(x => x.StartDate); break;
                                    //case "EndDateASC": query = query.OrderBy(x => x.EndDate); break;
                                    //case "EndDateDESC": query = query.OrderByDescending(x => x.EndDate); break;
                            }
                        }
                        else
                        {
                            IOrderedQueryable<Connection> oq = (IOrderedQueryable<Connection>)query;

                            switch (field)
                            {
                                case "name": query = isAsc ? oq.ThenBy(x => x.Name) : oq.ThenByDescending(x => x.Name); break;
                                case "ppe": query = isAsc ? oq.ThenBy(x => x.PPE) : oq.ThenByDescending(x => x.PPE); break;
                                case "meterCode": query = isAsc ? oq.ThenBy(x => x.MeterCode) : oq.ThenByDescending(x => x.MeterCode); break;
                                case "company": query = isAsc ? oq.ThenBy(x => x.Company.Acronym) : oq.ThenByDescending(x => x.Company.Acronym); break;
                                case "tariff": query = isAsc ? oq.ThenBy(x => x.Tariff.Name) : oq.ThenByDescending(x => x.Tariff.Name); break;
                                    //case "meterCodeDESC": query = query.OrderByDescending(x => x.MeterCode); break;
                                    //case "Company.AcronymASC": query = query.OrderBy(x => x.Company.Acronym); break;
                                    //case "Company.AcronymDESC": query = query.OrderByDescending(x => x.Company.Acronym); break;
                                    //case "Tariff.NameASC": query = query.OrderBy(x => x.Tariff.Name); break;
                                    //case "Tariff.NameDESC": query = query.OrderByDescending(x => x.Tariff.Name); break;
                                    //case "StartDateASC": query = query.OrderBy(x => x.StartDate); break;
                                    //case "StartDateDESC": query = query.OrderByDescending(x => x.StartDate); break;
                                    //case "EndDateASC": query = query.OrderBy(x => x.EndDate); break;
                                    //case "EndDateDESC": query = query.OrderByDescending(x => x.EndDate); break;
                            }
                        }
                    }
                }

                var r = query.Skip(first).Take(rows).Select(x => 
                    new { id = x.Id, ppe = x.PPE, meterCode = x.MeterCode, name = x.Name, tariff = x.Tariff.Name, company = x.Company.Acronym,
                    startDate = x.StartDate, endDate = x.EndDate});

                var response = new { rows = r, count = count };

                data = JsonConvert.SerializeObject(response);

            }


            return Content(data, "application/json");
        }
    }

    public class MultiSort
    {
        public string field { get; set; }
        public int order { get; set; }
    }
}