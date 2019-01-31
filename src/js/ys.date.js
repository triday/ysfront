//时间格式化
Date.prototype.Format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
//求两个时间毫秒差
Date.prototype.DiffMilliseconds = function (date) {
    var date1 = this;
    if (date != undefined) {
        var milliseconds = Math.abs(date1.getTime() - Date.parse(date));
        return milliseconds;
    }
    else
        return null;
}
//求两个时间秒差
Date.prototype.DiffSeconds = function (date) {
    var date1 = this;
    if (date != undefined) {
        var milliseconds = date1.DiffMilliseconds(date);
        return milliseconds / 1000;//+ (milliseconds % 1000 > 0) ? 1 : 0
    }
    else
        return null;
}
//求两个时间分钟差
Date.prototype.DiffMinutes = function (date) {
    var date1 = this;
    if (date != undefined) {
        var milliseconds = date1.DiffMilliseconds(date);
        return milliseconds / (1000 * 60);//+ (milliseconds % (1000 * 60*60) > 0) ? 1 : 0
    }
    else
        return null;
}
//求两个时间小时差
Date.prototype.DiffHours = function (date) {
    var date1 = this;
    if (date != undefined) {
        var milliseconds = date1.DiffMilliseconds(date);
        return milliseconds / (1000 * 60 * 60);//+ (milliseconds % (1000 * 60 * 60*60) > 0) ? 1 : 0
    }
    else
        return null;
}
//求两个时间天数差
Date.prototype.DiffDays = function (date) {
    var date1 = this;
    if (date != undefined) {
        var milliseconds = date1.DiffMilliseconds(date);
        return milliseconds / (1000 * 60 * 60 * 24);//+ (milliseconds % (1000 * 60 * 60 * 60*24) > 0) ? 1 : 0
    }
    else
        return null;
}