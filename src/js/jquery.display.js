
+function ($) {
    "use strict";

    //$.fn.displayToggle = function () {
    //    return this.each(function () {
    //        var displayInfo = $(this).data();
    //        displayInfo = $.extend(
    //             {
    //                 displayTarget: '',
    //                 displayAnimation: 'slide'
    //             }, displayInfo);
    //        var displayContext = ($(this).hasClass('display-open') || $(this).hasClass('display-close')) ? $(this) : $(this).parents('.display-open,.display-close');

    //        if (displayContext.length == 0) return;

    //        if (displayInfo.displayTarget) {
    //            if (displayInfo.displayAnimation === 'slide') {
    //                $(displayInfo.displayTarget, displayContext).stop(true, true).slideToggle();
    //            } else if (displayInfo.displayAnimation === 'fade') {
    //                $(displayInfo.displayTarget, displayContext).stop(true, true).fadeToggle();
    //            } else if (displayInfo.displayAnimation === 'zoom') {
    //                //左右动画
    //                $(displayInfo.displayTarget, displayContext).stop(true, true).animate({
    //                    'width': 'toggle',
    //                    'padding-left': 'toggle',
    //                    'padding-right': 'toggle',
    //                    'margin-left': 'toggle',
    //                    'margin-right': 'toggle'
    //                });
    //            } else {
    //                $(displayInfo.displayTarget, displayContext).stop(true, true).toggle();
    //            }
    //        }
    //        if (displayContext.hasClass('display-open')) {
    //            displayContext.removeClass('display-open').addClass('display-close');
    //        } else {
    //            displayContext.removeClass('display-close').addClass('display-open');
    //        }
    //    });
    //}
    //$.fn.displayOpen = function () {

    //}
    //$.fn.displayClose = function () {

    //}
    //$(function () {
    //    $('[data-display-target]').each(function () {
    //        var displayInfo = $(this).data();
    //        displayInfo = $.extend(
    //             {
    //                 displayAction: 'click',
    //             }, displayInfo);
    //        if (displayInfo.displayAction === 'click') {
    //            $(this).on('click', function () { $(this).displayToggle(); })
    //        } else if (displayInfo.displayAction === 'hover') {//hover
    //            $(this).on('mouseenter mouseleave', function () {
    //                $(this).displayToggle();
    //            })
    //        }
    //    });
    //})
    function displayTargetToggle($btn, options) {
        var displayContext = ($btn.hasClass('display-open') || $btn.hasClass('display-close')) ? $btn : $btn.parents('.display-open,.display-close');

        if (displayContext.length == 0) return;

        var target = $btn.attr('data-display-target');

        if (target) {
            if (options.displayAnimation === 'slide') {
                $(target, displayContext).stop(true, true).slideToggle(options.displaySpeed);
            } else if (options.displayAnimation === 'fade') {
                $(target, displayContext).stop(true, true).fadeToggle(options.displaySpeed);
            } else if (options.displayAnimation === 'zoom') {
                //左右动画
                $(target, displayContext).stop(true, true).animate({
                    'width': 'toggle',
                    'padding-left': 'toggle',
                    'padding-right': 'toggle',
                    'margin-left': 'toggle',
                    'margin-right': 'toggle'
                }, options.displaySpeed);
            } else {
                $(target, displayContext).stop(true, true).toggle();
            }
        }

        if (displayContext.hasClass('display-open')) {
            displayContext.removeClass('display-open').addClass('display-close');
        } else {
            displayContext.removeClass('display-close').addClass('display-open');
        }
    }
    function displayTargetShow($btn, options) {
        var displayContext = ($btn.hasClass('display-open') || $btn.hasClass('display-close')) ? $btn : $btn.parents('.display-open,.display-close');

        if (displayContext.length == 0) return;

        if (displayContext.hasClass('display-open')) return;

        var target = $btn.attr('data-display-target');

        if (target) {
            if (options.displayAnimation === 'slide') {
                $(target, displayContext).stop(true, true).slideDown(options.displaySpeed);
            } else if (options.displayAnimation === 'fade') {
                $(target, displayContext).stop(true, true).fadeIn(options.displaySpeed);
            } else if (options.displayAnimation === 'zoom') {
                //左右动画
                $(target, displayContext).stop(true, true).animate({
                    'width': 'show',
                    'padding-left': 'show',
                    'padding-right': 'show',
                    'margin-left': 'show',
                    'margin-right': 'show'
                }, options.displaySpeed);
            } else {
                $(target, displayContext).stop(true, true).show();
            }
        }
        displayContext.removeClass('display-close').addClass('display-open');
        //隐藏其它兄弟元素
        displayContext.siblings('.display-open').each(function () {
            var target = $(this).attr('data-display-target') || $(this).find('[data-display-target]').attr('data-display-target');
            if (target) {
                if (options.displayAnimation === 'slide') {
                    $(target, this).stop(true, true).slideUp(options.displaySpeed);
                } else if (options.displayAnimation === 'fade') {
                    $(target, this).stop(true, true).fadeOut(options.displaySpeed);
                } else if (options.displayAnimation === 'zoom') {
                    //左右动画
                    $(target, this).stop(true, true).animate({
                        'width': 'hide',
                        'padding-left': 'hide',
                        'padding-right': 'hide',
                        'margin-left': 'hide',
                        'margin-right': 'hide'
                    }, options.displaySpeed);
                } else {
                    $(target, this).stop(true, true).hide();
                }
            }

            $(this).removeClass('display-open').addClass('display-close');
        });
    }
    $.fn.display = function (options) {
        var _default = {
            displayAnimation: "slide",//fade,slide,none,zoom
            displayAction: "click",//click,hover
            displayKind: "multiple",//single,multiple
            displaySpeed: 'normal'
        }
        return this.each(function (index, element) {
            initDisplayState(element)
            var op = $.extend({}, _default, $(element).data(), options);
            if (op.displayAction === "click") {

                $(element).on('click', '[data-display-target]', function () {
                    op.displayKind === "single" ? displayTargetShow($(this), op) : displayTargetToggle($(this), op);
                });

            } else if (op.displayAction === "hover") {
                $(element).on('mouseenter mouseleave', '[data-display-target]', function (e) {
                    op.displayKind === "single" ? displayTargetShow($(this), op) : displayTargetToggle($(this), op);
                })
            }
        });
        function initDisplayState(element) {
            $(element).find('.display-close').add(element).filter('.display-close').each(function () {
                $($(this).find('[data-display-target]').attr('data-display-target'), this).css({ display: 'none' });
            });//隐藏默认为close的元素
            //$(element).find('.display-open').add(element).each(function () { });
        }
    }
}(jQuery);
