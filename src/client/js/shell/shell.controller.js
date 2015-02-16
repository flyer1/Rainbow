(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['datacontext', '$state'];

    function ShellController(datacontext, $state) {
        var vm = this;

        $state.go('home');
        
    }
})();