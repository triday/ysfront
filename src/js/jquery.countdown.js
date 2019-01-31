; $(function () {
    setInterval(function () {
        $('.time[data-sec]').each(function () {
            var remaining = $(this).attr('data-sec');
            remaining = remaining - 1;
            if (remaining < 0) remaining = 0;
            var sec = Math.floor(remaining % 60);
            var min = Math.floor((remaining / 60) % 60);
            var hour = Math.floor((remaining / 3600));
            $(this).find('.hour').text(zeroPad(hour, 2));
            $(this).find('.minute').text(zeroPad(min, 2));
            $(this).find('.second').text(zeroPad(sec, 2));
            $(this).attr('data-sec', remaining);
        });
    }, 1000);
    function zeroPad(number, width) {
        var string = String(Math.round(number));
        while (string.length < width) {
            string = '0' + string;
        }
        return string;
    }
});