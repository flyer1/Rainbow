using System.Web;
using System.Web.Optimization;

namespace Rainbow.WebMvc
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            // IMPORTANT:
            //      Ensure that bundles contain files that are all in the *same* folder (path) as the bundle's name.
            //      Think of each bundle's name as a FILE, not a FOLDER.  You need to give it a name that is within the same containing
            //      folder as all the files it is bundling.
            //
            // Remember to test you bundles by temporarily enabling optimations below.

            // Temporarily uncomment this line to test bundling even when running in debug mode.
            //BundleTable.EnableOptimizations = true;

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.

            bundles.Add(new ScriptBundle("~/scripts/lib").Include(
                        "~/Scripts/bootstrap.js",
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery-unobtrusive-ajax.js",
                        "~/Scripts/knockout-{version}.debug.js",
                        "~/Scripts/knockout.mapping-latest.js",
                        "~/Scripts/underscore.js",
                        "~/Scripts/require.js"  // Load require last b/c many third party libs support AMD's (asynchronous module definitions) if and AMD like require is loaded. 
                        ));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/scripts/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/scripts/custom").Include(
                        "~/App/dataaccess/dataservice.js",
                        "~/App/dataaccess/dataservice.core.js",

                        "~/App/databinding/ko.custom.binding.handlers.js",

                        "~/App/viewmodels/vm.home.js",
                        "~/App/viewmodels/vm.sites.js",
                        
                        "~/App/widgets/kenburns.effect.js"
                      ));

            bundles.Add(new StyleBundle("~/Content/css/site").Include(
                "~/Content/site/site.css"));

            bundles.Add(new StyleBundle("~/Content/css/ThirdParty").Include(
               "~/Content/font-awesome.css"
           ));
        }
    }
}