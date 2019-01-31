+function ($) {
    "use strict";
    $.fn.switchClass = function (name1, name2) {
        return this.each(function () {
            if ($(this).hasClass(name1)) {
                $(this).removeClass(name2).addClass(name1);
            } else {
                $(this).removeClass(name1).addClass(name2);
            }
        });
    }
    //加载元素的值
    $.fn.loadValue = function (url, params, callback) {
        var type, response,
            self = this;
        // If it's a function
        if (jQuery.isFunction(params)) {

            // We assume that it's the callback
            callback = params;
            params = undefined;

            // Otherwise, build a param string
        } else if (params && typeof params === "object") {
            type = "POST";
        }

        // If we have elements to modify, make the request
        if (self.length > 0) {
            jQuery.ajax({
                url: url,

                // If "type" variable is undefined, then "GET" method will be used.
                // Make value of this field explicit since
                // user can override it through ajaxSetup method
                type: type || "GET",
                dataType: "json",
                data: params
            }).done(function (data) {

                // Save response for use in complete callback
                response = arguments;

                self.find('[data-prop]').add(self).each(function (index, element) {
                    var prop = ($(element).attr('data-prop') || '').trim();
                    if (prop) {

                        $(element).html(eval('data' + ((prop.charAt(0) == '.' || prop.charAt(0) == '[') ? '' : '.') + prop));
                    }

                })


                // If the request succeeds, this function gets "data", "status", "jqXHR"
                // but they are ignored because response was set above.
                // If it fails, this function gets "jqXHR", "status", "error"
            }).always(callback && function (jqXHR, status) {
                self.each(function () {
                    callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
                });
            });
        }

        return this;
    };
}(jQuery);