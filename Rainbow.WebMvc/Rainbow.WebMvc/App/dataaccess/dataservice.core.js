define('dataaccess/dataservice.core',
    //['services/messenger'],
    function () {

        // #region Core (low-level) Data Methods - only available within this module
        function getJSON(url, data, successCallback, badRequestCallback, generalErrorCallback) {
            // successCallback is called on a success status (ie: 200s)
            // badRequestCallback (if provided) is called only on a 400 (bad request) - typically used for custom handling of validation errors
            // generalErrorCallback (if provided) is called on any other error status - this should rarely be provided
            return $.Deferred(function (def) {
                $.getJSON(url, data)
                      .done(function (result) {
                          successCallback(result);
                          def.resolve(result);
                      })
                      .fail(function (xhr, status, error) {
                          onError(xhr, status, error, badRequestCallback, generalErrorCallback);
                          def.reject(status);
                      });
            }).promise();
        }

        // #endregion

        // #region Support Methods

        // =======================
        // Error handling  
        function onError(xhr, textStatus, errorThrown, badRequestCallback, generalErrorCallback) {
            // badRequestCallback (if provided) is called only on a 400 (bad request) - typically used for custom handling of validation errors
            // generalErrorCallback (if provided) is called on any other error status - this should rarely be provided

            var handled;
            if (badRequestCallback && (xhr.status >= 400 && xhr.status <= 499)) {
                handled = badRequestCallback(xhr, textStatus, errorThrown);
                if (!handled) onErrorDefaultHandling(xhr, textStatus, errorThrown);
            } else if (generalErrorCallback) {
                handled = generalErrorCallback(xhr, textStatus, errorThrown);
                if (!handled) onErrorDefaultHandling(xhr, textStatus, errorThrown);
            } else
                onErrorDefaultHandling(xhr, textStatus, errorThrown);
        }

        function onErrorDefaultHandling(xhr, textStatus, errorThrown) {
            var message;

            if (xhr.status === 403) {
                // a 403 means that the user likely hasn't touched their PC in a long time, and their login cookie expired.
                // invoke the session timeout message, which will force the user to log back in after acknowledging the message.
                messenger.sessionTimeout();
                return;
            }

            if (xhr.responseJSON && xhr.responseJSON.statusDescription) {
                // all errors coming back from our server should already be encoded into an ErrorResponse object;
                message = xhr.responseJSON.statusDescription;
                console.log(xhr.responseJSON.exceptionInfo);
                console.log(xhr.responseJSON.stackTrace);
            } else {
                message = 'An unexpected error has occurred.';
            }

            if (xhr.status >= 400 && xhr.status <= 499)
                messenger.warningMessage(message, 'Attention');
            else
                messenger.errorMessage(message, 'Error Occurred');
        }
        // #endregion

        return {
            getJSON: getJSON,
        };
    });

