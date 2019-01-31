; (function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define(["jquery"], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {
    $.fn.popup = function (options, bindEvents, disposeCallback) {
        var _options = {
            'background-color': 'rgba(0,0,0,.2)',
            autoClose: true,
            classNames: '',
            autoClone: true,
            overflowBody: true,
            fixedBody:true,
        }
        $.extend(_options, options);
        var $body = $(document.body);
        if (_options.overflowBody) {
            $body.css('overflow', 'hidden');
        }
        if (_options.fixedBody) {
            $body.css('position', 'fixed');
        }
        var currentzindex = findMaxZIndex();
        var $popup = $('<div/>').addClass('popup').addClass(_options.classNames).css({
            'z-index': currentzindex,
            'background-color': _options['background-color']
        }).wrapInner((_options.autoClone) ? this.clone() : this).appendTo($body);
        if (bindEvents) {
            bindEvents($popup);
        }

        if (_options.autoClose) {
            $popup.one('click', function () {
                $popup.closePopup(disposeCallback);
            });
        }
        return $popup;
        function findMaxZIndex() {
            var zindex = 0;
            $('body').children().each(function () {
                var current = $(this).css('z-index');
                if (!isNaN(current) && current > zindex) {
                    zindex = current
                }
            });
            return zindex;
        }
    }
    $.fn.closePopup = function (disposeCallback) {
        if (disposeCallback) {
            disposeCallback(this);
        }
        this.remove();
        $(document.body).css('overflow', '').css('position','');
    };
    $.fn.findPopup = function () {
        if (this.hasClass('popup')) return this;
        return this.parents('div.popup');
    }
    $.dialog = function (headcontent, bodycontent, buttons, bindEvents, classNames) {
        var $popup = $('<div class="dialog" />');
        var $head = $('<div class="header" />');
        var $body = $('<div class="body" />');
        var $footer = $('<div class="footer"/>');

        if (headcontent instanceof jQuery) {
            $head.append(headcontent.clone());
        } else if (headcontent != null) {
            $head.html(headcontent);
        } else {
            $head = null;
        }

        if (bodycontent instanceof jQuery) {
            $body.append(bodycontent.clone());
        } else if (bodycontent != null) {
            $body.html(bodycontent);
        } else {
            $body = null;
        }
        if (classNames) {
            $popup.addClass(classNames);
        }
        $.each(buttons || [], function (index, element) {
            var $btn = $('<a/>').addClass('btn').addClass(element.classNames).attr('href', element.href || 'javascript:;').html(element.text);
            $btn.on('click', function () {
                if (element.handler) {
                    element.handler($popup);
                }
                if (element.autoClose) {
                    $(this).findPopup().closePopup();
                }
            });
            $footer.append($btn);
        });
        return $popup.append($head).append($body).append($footer).popup({ autoClose: false, autoClone: false }, bindEvents);
    }
    $.alert = function (headcontent, bodycontent, classNames) {
        return $.dialog(headcontent, bodycontent,
            [{
                text: '确定',
                autoClose: true,
            }], classNames);
    }
    $.info = function (headercontent, classNames) {
        return $.alert(headercontent, null, classNames);
    }
    $.toast = function (text, iconClassNames) {
        var $wrap = $('<div class="toast"/>');
        var $icon = $('<i aria-hidden="true"></i>').addClass('icon').addClass(iconClassNames);
        var $text = $('<p/>').addClass('content').html(text);
        return $wrap.append($icon).append($text).popup({ autoClose: false, autoClone: false, 'background-color': 'rgba(0,0,0,.0)', 'overflowBody': false });
    }
    $.toastDelay = function (text, iconClassNames, delaytime, callback) {
        var $toast = $.toast(text, iconClassNames);
        $toast.fadeOut(delaytime, function () {
            $toast.closePopup();
            if (callback) {
                callback($toast);
            }
        });
        return $toast;
    }
    $.select = function (buttons,classNames) {
        var $select = $('<ul class="select" />').addClass(classNames);
        $.each(buttons || [], function (index, element) {
            var $btn = $('<a/>').attr('href', element.href || 'javascript:;').html(element.text);
            var $li = $btn.wrap('<li class="item"></li>').parent();
            $li.addClass(element.classNames);
            $li.on('click', function () {
                if (element.handler) {
                    element.handler($li);
                }
            });
            $select.append($li);
        });
       return $select.popup({ autoClose: true, autoClone: false });
    }
    $.fn.select = function () {
        return this.each(function (index, element) {
            var target = $(this).data('select-target');
            if (target) {
                $(target).on('click', function () {
                    $(element).trigger('click');
                });
            }
            $(this).on('click', function () {
                show($(this));
            });

        });
        function show($select) {
            var items = [];
            $select.find('option').each(function (index, element) {
                var classname=this.attributes['class']||'';
                if(this.selected) classname+=' active';
                items.push({
                    text: this.text,
                    val:this.value,
                    classNames: classname.trim(),
                    handler: function ($item) {
                        $item.removeClass('active').siblings().removeClass('active');
                        $select.val(element.value);
                    }
                });
            });
            var $popup = $.select(items);
            var $active = $popup.find('.active');
            if ($active.length > 0) {
                var $ul = $active.parent();
                setTimeout(function () {
                    $ul.animate({
                        scrollTop: $active.position().top - $ul.offset().top - ($ul.height() - $active.height()) / 2
                    });
                }, 100)
               
            }
        }
    }
    $.page = function (content, closebutton, bindEvents, classNames) {

    }
}));