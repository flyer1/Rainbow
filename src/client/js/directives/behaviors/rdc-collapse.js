(function () {
    'use strict';
    angular
        .module('app.directives')
        .directive('rdcCollapse', rdcCollapse);

    function rdcCollapse() {
        var directive = {
            restrict: 'A',
            scope: false,
            link: link,
        };

        return directive;
        ///////////////// IMPLEMENTATION //////////////
        function link(scope, element, attrs) {
            scope.$watch(attrs.rdcCollapse, function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (newValue) {
                        element.collapse('show');
                    } else {
                        element.collapse('hide');
                    }
                }
            });
        }
    }
})();
