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
                },
                minLength = 3,
                maxLength = 5
            });

            /*
             * An array of contacts
             */

            FormGroupMetadata contactMetadata = new FormGroupMetadata()
            {
                label = "Osoba kontaktowa",
                isRequired = true
            };

            contactMetadata.controls.Add("firstName", new StringControlMetadata()
            {
                label = "Imię",
                placeholder = "Imię",
                isRequired = true,
                maxLength = 20,
                minLength = 2
            });

            contactMetadata.controls.Add("lastName", new StringControlMetadata()
            {
                label = "Nazwisko",
                placeholder = "Nazwisko",
                isRequired = true,
                maxLength = 20,
                minLength = 2
            });

            fd.controls.Add("contacts", new FormArrayMetadata()
            {
                label = "Kontakty",
                help = "Wpisz tutaj kontakty, w każdej odrębnie jedną osobę. Musisz podać zarówno imię, jak i nazwisko.",
                itemMetadata = contactMetadata,
                minLength = 1,
                maxLength = 4
            });

            fd.controls.Add("address", AddressMetadata());

            return fd;
        }

        public static FormGroupMetadata AddressMetadata()
        {
            FormGroupMetadata addressMetadata = new FormGroupMetadata()
            {
                label = "Adres",
                help = "Podaj tutaj adres kontaktowy.",
                isRequired = true
            };

            addressMetadata.controls.Add("address1", new StringControlMetadata()
            {
                label = "Adres 1",
                placeholder = "Adres 1",
                isRequired = true,
                maxLength = 50,
                minLength = 2
            });

            addressMetadata.controls.Add("address2", new StringControlMetadata()
            {
                label = "Adres 2",
                placeholder = "Adres 2",
                isRequired = false,
                maxLength = 50
            });

            addressMetadata.controls.Add("zip", new StringControlMetadata()
            {
                label = "Kod pocztowy",
                placeholder = "Kod",
                isRequired = false,
                maxLength = 10,
                minLength = 3
            });

            addressMetadata.controls.Add("city", new StringControlMetadata()
            {
                label = "Miasto",
                placeholder = "Miasto",
                isRequired = false,
                maxLength = 30,
                minLength = 2
            });

            return addressMetadata;
        }
    }
}