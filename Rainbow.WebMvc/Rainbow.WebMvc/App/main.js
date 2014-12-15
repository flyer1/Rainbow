
(function () {
    var root = this;
    if (root.isLoaded) {
        return;
    }

    configureRequireJS();
    definePlugIns();
    root.isLoaded = true;

    function configureRequireJS() {
        require.config({
            baseUrl: "/app",
        });
    }

    // Plug-ins are automatically loaded here and therefore don't ever need to be requested as a required module - they are just added to the item they are extending
    function definePlugIns() {
        requirejs(['databinding/ko.custom.binding.handlers'], boot);
    }

    function boot() {
    }
})();