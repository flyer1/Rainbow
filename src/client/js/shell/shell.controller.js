(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$state'];
    
    function ShellController($state) {
        var vm = this;
        
        //$state.go('home');
    }
})();