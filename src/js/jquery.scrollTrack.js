
+function ($) {
    "use strict";
    $.fn.scrollTrack = function (options) {
        var _default = {
            container: '',
            accuracyHeight: 30
        };
        var op = $.extend({}, _default, options);
        return this.each(function (index, element) {
            $(op.container || document).on('scroll resize', function () {
                var top = $(this).scrollTop();
                var nearDom = { distanceY: -Infinity, ele: null };
                $(element).find('li>a').each(function () {
                    var target = $($(this).attr('href'));
                    if (target.length == 0) return true;
                    var distance = target.offset().top - top;
                    if (!isNaN(distance)) {
                        if (distance <= op.accuracyHeight && distance > nearDom.distanceY) {
                            nearDom.distanceY = distance;
                            nearDom.ele = $(this).parent();
                        }
                    }
                });
                if (nearDom.ele) {//找到了最近的元素
                    $(element).find('li').each(function (index, ele) {
                        if ($(ele).has(nearDom.ele).length > 0 || $(ele)[0] === nearDom.ele[0]) {
                            $(ele).addClass('active');
                        } else {
                            $(ele).removeClass('active');
                        }
                    });
                } else {//清空所有的活动状态
                    $(element).find('li').each(function (index, ele) {
                        $(ele).removeClass('active');
                    });
                }
            });
        });
    };
    //$.fn.initTrack = function (options) {
    //    var _option = {
    //        container: '',
    //        parentIdHander: function (id) {
    //            var array = i.split('-');
    //            if (array.length > 1) {
    //                array.pop();
    //                return array.join('-');
    //            }
    //        },
    //        textHander: function (dom) {
    //            return $(dom).text();
    //        }
    //    }
    //    var op = $.extend({}, _option, options);
    //    return this.each(function (index, element) {
    //        $(op.container || document).find('[id]').each(function () {
    //            //TOTO.....未完成
    //        });
    //    });
    //};
}(jQuery);