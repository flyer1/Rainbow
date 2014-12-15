using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Rainbow.WebMvc.Controllers
{
    public class ContactController : Controller
    {
        //
        // GET: /Site/

        public ActionResult Index()
        {
            return View("ContactUs");
        }

    }
}
