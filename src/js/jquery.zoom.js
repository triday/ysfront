/*滚动加载*/
+function ($) {
    "use strict";
    $.fn.zoomToggle = function (options) {
        return this.animate({
            'width': 'toggle',
            'padding-left': 'toggle',
            'padding-right': 'toggle',
            'margin-left': 'toggle',
            'margin-right': 'toggle'
        }, options);
    }
    $.fn.zoomExpand = function (options) {
        return this.animate({
            'width': 'show',
            'padding-left': 'show',
            'padding-right': 'show',
            'margin-left': 'show',
            'margin-right': 'show'
        }, options);
    }
    $.fn.zoomCollapse = function (options) {
        return this.animate({
            'width': 'hide',
            'padding-left': 'hide',
            'padding-right': 'hide',
            'margin-left': 'hide',
            'margin-right': 'hide'
        }, options);
    }
}($);