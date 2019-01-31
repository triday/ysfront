+function ($) {
    "use strict";

    var support = (function () {
        var support = {
            touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch)
        };
        return support;
    })();
    var eventtype = support.touch ? 'touchstart' : 'mousedown';
    $.fn.numInput = function () {
        return this.each(function (index, element) {



            $(element).next('.add').on(eventtype, function () { changeValue('add') });
            $(element).prev('.add').on(eventtype, function () { changeValue('add') });
            $(element).next('.sub').on(eventtype, function () { changeValue('sub') });
            $(element).prev('.sub').on(eventtype, function () { changeValue('sub') });
            var self = $(element);
            function changeValue(type) {
                var curVal = Number(self.val());
                if (type == 'add') {
                    curVal += Number(self.attr('step') || '1');
                    self.val(Math.min(curVal, self.attr('max') || '99999999'));
                    self.trigger('change');
                } else {
                    curVal -= Number(self.prop('step') || '1');
                    self.val(Math.max(curVal, self.attr('min') || '1'));
                    self.trigger('change');
                }
            }
            (function init() {
                var current = Number(self.val());
                if (isNaN(current) || current < self.attr('min')) {
                    self.val(self.attr('min'));
                }
            })();
        });
        
    };
}($);