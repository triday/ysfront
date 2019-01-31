$(function () {

    $.fn.hightlight = function (text) {
        return this.each(function (index, element) {
            var old = $(element).html();
            var formatted = old.replaceAll(text, "<span class='highlight'>" + text + "</span>");
            $(element).html(formatted);
        });
    };
});