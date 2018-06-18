using MkoForms;
using MkoForms.ControlMetadata;
using MkoForms.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace McvAngularTest2.Models
{
    public class MyFormMetadata
    {
        public static FormMetadata GetMetadata()
        {
            UrlHelper Url = new UrlHelper(HttpContext.Current.Request.RequestContext);

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

            FormGroupMetadata extraPersonMetadata = new FormGroupMetadata()
            {
                label = "Dodatkowa osoba",
                help = "Podaj tutaj dane dodatkowej osoby.",
                isRequired = true
            };

            extraPersonMetadata.controls.Add("firstName", new StringControlMetadata()
            {
                label = "Imię",
                placeholder = "Imię",
                isRequired = true,
                maxLength = 20,
                minLength = 2
            });

            extraPersonMetadata.controls.Add("lastName", new StringControlMetadata()
            {
                label = "Nazwisko",
                placeholder = "Nazwisko",
                isRequired = true,
                maxLength = 20,
                minLength = 2
            });

            fd.controls.Add("extraPerson", extraPersonMetadata);

            fd.controls.Add("recipients", new FormArrayMetadata()
            {
                label = "Odbiorcy",
                help = "Wpisz tutaj odbiorców powiadomień, w każdej linii odrębnie.",
                itemMetadata = new StringControlMetadata()
                {
                    label = "Odbiorca",
                    placeholder = "odbiorca",
                    isRequired = true,
                    minLength = 2,
                    maxLength = 50
                }
            });


            return fd;
        }
    }
}