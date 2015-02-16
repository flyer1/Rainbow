(function () {
    'use strict';

    angular
        .module('app')
        .controller('NavController', NavController);

    NavController.$inject = ['datacontext'];

    function NavController(datacontext) {
        var vm = this;

        var siteRepo = datacontext.getSiteRepository();
        debugger;
        
        //var logger = common.logger;

//        vm.busyMessage = 'Please wait ...';
//        vm.isBusy = true;
//        vm.showSplash = true;

        
        
        function activate() {
//            logger.success('CodeCamper loaded!', null);
////            TODO: Using a resolver on all routes or datacontext.ready in every controller
////            return datacontext.ready([]).then(hideSplash);
//            hideSplash();
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            //common.$timeout(function () {
            //    vm.showSplash = false;
            //}, 1000);
        }
    }
})();