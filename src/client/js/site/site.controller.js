(function() {
    'use strict';

    angular
        .module('app.site')
        .controller('SiteController', SiteController);

    SiteController.$inject = ['datacontext'];

    function SiteController(datacontext) {
        var vm = this;
        return vm;
    }
})();