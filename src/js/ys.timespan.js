function Timespan(milliseconds) {
    this.value = isNaN(milliseconds) ? 0 : milliseconds;
    //return {
    //    Empty: {
    //        TotalMilliseconds: 0,
    //        TotalSeconds: 0,
    //        TotalMinutes: 0,
    //        TotalHours: 0,
    //        TotalDays: 0,
    //        Millisecond: 0,
    //        Seconds: 0,
    //        Minute: 0,
    //        Hour: 0,
    //        Day: 0,
    //    }
    //}
}

Timespan.prototype.addMilliseconds = function (val) {
    if (!isNaN(val)) this.value += val;
    return this;
}
Timespan.prototype.addSeconds = function (val) {
    return this.addMilliseconds(val * 1000);
}
Timespan.prototype.addMinutes = function (val) {
    return this.addSeconds(val * 60);
}
Timespan.prototype.addHours = function (val) {
    return this.addMinutes(val * 60);
}
Timespan.prototype.addDays = function (val) {
    return this.addHours(val * 24);
}

Timespan.prototype.getTotalMilliseconds = function () {
    return this.value;
}
Timespan.prototype.getTotalSeconds = function () {
    return this.getTotalMilliseconds() / 1000;
}
Timespan.prototype.getTotalMinutes = function () {
    return this.getTotalSeconds() / 60;
}
Timespan.prototype.getTotalHours = function () {
    return this.getTotalMinutes() / 60;
}
Timespan.prototype.getTotalDays = function () {
    return this.getTotalHours() / 24;
}

Timespan.prototype.getMillisecond = function () {
    return Math.floor(this.getTotalMilliseconds() % 1000);
}
Timespan.prototype.getSeconds = function () {
    return Math.floor(this.getTotalSeconds() % 60);
}
Timespan.prototype.getMinute = function () {
    return Math.floor(this.getTotalMinutes() % 60);
}
Timespan.prototype.getHour = function () {
    return Math.floor(this.getTotalHours() % 24);
}
Timespan.prototype.getDay = function () {
    return Math.floor(this.getTotalDays());
}

Timespan.prototype.getSpan = function () {
    var res = {
        TotalMilliseconds: this.value,
    }
    res.TotalSeconds = res.TotalMilliseconds / 1000;
    res.TotalMinutes = res.TotalSeconds / 60;
    res.TotalHours = res.TotalMinutes / 60;
    res.TotalDays = res.TotalHours / 24;
    res.Millisecond = Math.floor(res.TotalMilliseconds % 1000);
    res.Seconds = Math.floor(res.TotalSeconds % 60);
    res.Minute = Math.floor(res.TotalMinutes % 60);
    res.Hour = Math.floor(res.TotalHours % 24);
    res.Day = Math.floor(res.TotalDays);
    return res;
}
Timespan.prototype.getValue = function () {
    return this.value;
}