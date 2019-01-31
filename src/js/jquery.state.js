+function ($, undefined) {
    "use strict";
    $.fn.state = function (value) {
        if (value === undefined) {
            var stateList = $(this).getStateList();
            var currentstate = [];
            var $self=$(this).first();
            stateList.forEach(function (val) {
                if ($self.hasClass(val)) {
                    currentstate.push(val);
                }
            })
            return currentstate.join(' ');
        } else {
            this.clearState();
            return this.addState(value);
        }
    }
    $.fn.hasState = function (state) {
        return this.hasClass(state) && $.inArray(state, this.getStateList());
    }

    $.fn.addState = function (value) {
        return this.each(function (index, element) {
            $(element).addClass(value).children('.state-'+value).show();
        });
    }
    $.fn.removeState = function (value) {
        return this.each(function (index, element) {
            $(element).removeClass(value).children('.state-'+value).hide();
        });
    }
    $.fn.clearState = function () {
        return this.each(function (index, element) {
            var statelist = $(element).getStateList();
            for (var i = 0; i < statelist.length; i++) {
                $(element).removeClass(statelist[i]).children('.state-' + statelist[i]).hide();
            }
        });
    }
    $.fn.getStateList = function () {
        var statelist = [];
        $(this).children('[class|="state"]').each(function (i, e) {
            var arr = $(e).attr('class').split(' ');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].startsWith('state-')) {
                    statelist.push(arr[i].substring(6));
                }
            }
        });
        return statelist;
    }
}($);