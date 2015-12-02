(function () {
    'use strict';

    angular
        .module('app.core')
        .provider('routerConfig', routerConfig)
        .factory('router', router);


    /********************* RouterConfig Provider *********************/
    function routerConfig() {
        /* jshint validthis:true */
        this.config = {
            // The following properties are setup within the app.module.js file during the initial app configuration.
            //      $stateProvider: undefined
            //      resolveAlways: {ready: function(){ } }
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }

    /********************** Router Service **********************/

    router.$inject = ['$rootScope'];

    function router($rootScope) {

        var stateWatchers = [];

        var service = {
            registerStateChangedListener: registerStateChangedListener,
            subscribeStateChange: subscribeStateChange,
            unsubscribeStateChange: unsubscribeStateChange
        };

        init();

        return service;

        /*************************** IMPLEMENTATION ***************************/

        function init() {
            $rootScope.$on('$stateChangeStart', onStateChangeStart);
            $rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);
        }

        // #region STATE CHANGE WATCHERS 
        // Let views be notified when the user is about to navigate away or to a given state (page)
        function subscribeStateChange(stateName, leavingCallback, enteringCallback) {
            var foundIndex = _.indexOf(stateWatchers, _.findWhere(stateWatchers, { stateName: stateName }));
            var newWatcher = null;

            if (foundIndex >= 0) {
                console.warn('Warning: state name has already been subscribed (' + stateName + ')');
                return;
            }

            newWatcher = {
                stateName: stateName,
                leavingCallback: leavingCallback,
                enteringCallback: enteringCallback
            };

            stateWatchers.push(newWatcher);
        }

        function unsubscribeStateChange(stateName) {
            var foundIndex = _.indexOf(stateWatchers, _.findWhere(stateWatchers, { stateName: stateName }));
            if (foundIndex >= 0) {
                stateWatchers.splice(foundIndex, 1);
            }
        }
        // #endregion

        function onStateChangeSuccess(event, toState, toParams, fromState, fromParams) {
            // Unfortunately, bootstraps tooltips can get stuck. At least clear them when the user navigates.
            clearAllTooltips();
        }

        function clearAllTooltips() {
            // When an item is removed from the DOM that has a tooltip, the tooltip can get stuck and never go away. 
            // See https://github.com/twbs/bootstrap/issues/3084
            // But I find that there are other ways in which toolstips can get stuck. This one liner ensures all are turned off.
            $('.tooltip.in').remove();
        }
      
        function registerStateChangedListener(callback) {
            $rootScope.$on('$stateChangeSuccess', callback);
        }

        function onStateChangeStart(event, toState, toParams, fromState, fromParams) {
            stateWatchers.forEach(function (stateWatcher) {
                var stateChange = null;
                // Does the state change match the current watcher?
                if (stateWatcher.stateName === toState.name || new RegExp(stateWatcher.stateName, 'i').test(toState.name)) {
                    stateChange = 'entering';
                } else if (stateWatcher.stateName === fromState.name || new RegExp(stateWatcher.stateName, 'i').test(fromState.name)) {
                    stateChange = 'leaving';
                }

                if (stateChange) {
                    var callback = null;
                    var arg = null;
                    if (stateChange === 'entering') {
                        callback = stateWatcher.enteringCallback;
                        arg = toState;
                    } else {
                        callback = stateWatcher.leavingCallback;
                        arg = fromState;
                    }

                    if (callback && callback(arg) === false) {
                        event.preventDefault();
                    }
                }
            });
        }
        // #endregion
    }
})();