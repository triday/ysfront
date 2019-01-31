/*表示自动执行的函数*/
+function ($) {
    //"use strict";
    $(function () {
        $('[data-autoinit]').each(function (index, element) {
            try {
                var code = $(element).attr('data-autoinit');
                if (!code) return true;
                eval(code);
            }
            catch (e) {
                console.error('autorun 执行错误:' + e.message);
                return true;
            }
        });
    })
}($);