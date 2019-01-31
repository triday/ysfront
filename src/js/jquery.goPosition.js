; (function ($) {
    "use strict";
    $.fn.goPosition = function (postion, speed,callback) {
        var _default = {
            position: 0,
            speed: 'normal'
        };
        var op = $.extend({}, _default, { position: postion, speed: speed });
        return this.each(function (index, element) {
            $((this === document || this === window) ? document.body : this).animate({ scrollTop: op.position }, op.speed,callback);
        });
    }
    $.fn.goTarget = function (target, speed,callback) {
        return this.each(function (index, element) {
            //if($(target).length>0){}
            
            var top =$(target).length>0? $(target).position().top:0;//- $(this).offset().top;
            $(this).goPosition(top, speed, callback);
        });
    }
    $.fn.smoothAnchor = function (speed) {
        var self = this;
        $(this).on('click', "a[href^='#']", function (e) {
            var id = $(this).attr('href').substring(1);
            if (id === '') {
                $(self).goPosition();
                e.preventDefault();
                return;
            } else {
                var dom = document.getElementById(id);
                if (dom) {
                    $(self).goTarget(dom, speed, function () {
                        location.hash = '#' + id;
                    });
                    e.preventDefault();
                };
            }
        })
        return this;
    }
    $.fn.goTop = function (speed, callback) {
        return this.goPosition(0, speed, callback);
    }
    $.fn.goBottom = function (speed, callback) {
        return this.each(function (index, element) {
            $(element).goPosition($(element).outerHeight(), speed, callback);
        });
    }
})(jQuery)