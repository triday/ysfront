+function ($) {
    "use strict";

    $.fn.tab = function () {
        return this.each(function (index, element) {
            var $element = $(element);
            if (!$(element).hasClass('tab')) return;
            var tabaction = $element.attr('data-tab-action') || 'click';
            var $tabheader = $element.children('.tab-header:first');
            if ($tabheader.length == 0) return;//说明没有tab-header
          
            if (tabaction == 'click') {
                $tabheader.find('li>a').on('click', function () {
                   return !actiontab($(this).parent());
                });
                inittab($tabheader);//初始化active或者第一个
            } else if (tabaction == 'hover') {
                $tabheader.find('li>a').hover(function () {
                    actiontab($(this).parent());
                }).on('click', function () {
                    return false;
                });
                inittab($tabheader);//初始化active或者第一个
            } else if (tabaction == 'hash') {//锚定的变化更换选项卡
                $(window).on('hashchange', function () {
                    inithash($tabheader);
                });
                inithash($tabheader) || inittab($tabheader);
            }
        });
    }
    function inithash($tabheader) {
        if (window.location.hash && window.location.hash !== '#') {
            var $li = $tabheader.find('li>a[href="' + window.location.hash + '"]').first().parent('li');
            if ($li.length > 0) {
                actiontab($li);
                return true;
            }
        }
        return false;
    }
    function inittab($tabheader) {
        var $active = $tabheader.find('li.active:first');
        if ($active.length > 0) {
            actiontab($active);
        } else {
            var $first = $tabheader.find('li:first');
            if ($first.length > 0) {
                actiontab($first);
            }
        }
    }
    function actiontab($headerli) {
        $headerli.addClass('active').siblings().removeClass('active');
        var tab = getTabItem($headerli);
        if (tab && tab.length > 0) {
            if (tab.data('hasshow')) {
                tab.addClass('active').trigger('show-tab-body', $headerli).siblings().removeClass('active');
            } else {
                tab.addClass('active').data('hasshow', true).trigger('show-tab-body-first', $headerli).trigger('show-tab-body', $headerli).siblings().removeClass('active');
            }
            return true;
        }
        return false;
    }
    function getTabItem($headerli) {
        var target = $headerli.children('a').attr('href') || '#';
        if(target.startsWith('#')){
            var idOrNum = target.substring(1);
            if (idOrNum === '') {
                return $headerli.parents('.tab').find('.tab-body>*>li').eq($headerli.index());
            } else if (/\d+/.test(idOrNum)) {
                return $headerli.parents('.tab').find('.tab-body>*>li').eq(idOrNum);
            }
            else {
                return $headerli.parents('.tab').find('.tab-body>*>li').filter(target);
            }
        }
       
    }
    $.fn.activeTab = function (indexOrElement) {
        if (typeof indexOrElement === 'undefined') {//get
            return this.find('>ul>li.active');
        } else {//set
            return this.each(function () {
                if (!isNaN(indexOrElement)) {
                    var li = $(this).find('>ul>li').eq(indexOrElement);
                    if (li.length > 0) actiontab(li[0]);
                } else {
                    var li = $(indexOrElement)
                    if (li.length > 0) actiontab(li[0]);
                }
            });
        }
    }
    $.fn.getActiveItem = function () {//在tab上调用
        var tab = this.activeTab();
        return getTabItem(tab);
    }
    $.fn.getRelationTabItem = function () {//在li上调用
        return getTabItem(this);
    }

}($);