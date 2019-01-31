+function ($) {
    "use strict";

    $.fn.dragmove = function () {
        return this.each(function () {
            drag($(this));
        });
    }
    function drag($dom) {
        var startpos, imgpos;
        $dom.on('touchmove ', function (e) {
            var curpos = e.originalEvent.touches[0];
            var halfwidth = $(this).width() / 2;
            var halfheight = $(this).height() / 2;

            var left = curpos.pageX - startpos.pageX + imgpos.left;
            var top = curpos.pageY - startpos.pageY + imgpos.top;

            left = between(left,
                document.body.scrollLeft - halfwidth,
                document.body.scrollLeft + document.documentElement.clientWidth - halfwidth);
            top = between(top,
                document.body.scrollTop-halfheight,
                document.body.scrollTop + document.documentElement.clientHeight - halfheight);
            $dom.offset({ left: left, top: top });
            e.preventDefault();

        });
        $dom.on('touchstart', function (e) {
            var pos = e.originalEvent.touches[0];
            startpos = {
                pageX: pos.pageX,
                pageY: pos.pageY,
                clientX: pos.clientX,
                clientY: pos.clientY
            }
            imgpos = $dom.offset();
        });
        function between(val, min, max) {
            if (val < min) val = min;
            if (val > max) val = max;
            return val;
        }
    };

}($);