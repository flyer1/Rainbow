define('databinding/ko.custom.binding.handlers',
  function () {
      // Custom binding to wire up bootstrap tooltips
      ko.bindingHandlers.tooltip = {
          init: function (element, valueAccessor) {
              var local = ko.utils.unwrapObservable(valueAccessor()),
               options = {};

              ko.utils.extend(options, ko.bindingHandlers.tooltip.options);
              ko.utils.extend(options, local);

              $(element).tooltip(options);
          },
          options: {
              placement: "top",
              trigger: "hover",
              container: "body" // This helps in the positioning of tooltips over top of other elements.
          }
      };

  });



