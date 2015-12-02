/* Set the background-image URL using inline styles (this is done in a directive such that the network call for the image doesn't happen until after the databinding is ready) */
(function () {
    'use strict';

    angular
      .module('app.directives')
      .directive('rdcBackgroundImage', function () {
          return function (scope, element, attrs) {
              attrs.$observe('rdcBackgroundImage', function (value) {
                  element.css({
                      'background-image': 'url(\'' + value + '\')'
                  });
              });
          };
      });

})();
