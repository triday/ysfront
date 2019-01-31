window.wechat = {
    //隐藏右上角菜单
    hideTopRightButton: function () {
        function onBridgeReady() {
            WeixinJSBridge.call('hideOptionMenu');
        }
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
    },
    //显示右上角菜单
    showTopRightButton: function () {
        function onBridgeReady() {
            WeixinJSBridge.call('showOptionMenu');
        }

        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
    },
    goWechat: function () {
        if (typeof WeixinJSBridge != "undefined") {
            WeixinJSBridge.invoke('closeWindow', {}, function (res) {
            });
        }
    },
    goBack: function () {
        if (history.length > 1) {
            history.go(-1);
        } else if (typeof WeixinJSBridge != "undefined") {
            WeixinJSBridge.invoke('closeWindow', {}, function (res) {
            });
        }
    },
    //设置标题
    setTitle: function (title) {
        title = title || '';
        if (document.title != title) {
            var body = document.getElementsByTagName('body')[0];
            document.title = title;
            var iframe = document.createElement("iframe");
            iframe.style.display = 'none';
            iframe.setAttribute("src", "/favicon.ico");
            iframe.addEventListener('load', function () {
                setTimeout(function () {
                    iframe.removeEventListener('load');
                    document.body.removeChild(iframe);
                }, 0);
            });
            document.body.appendChild(iframe);
        }
    },
    //// 防止过分拉动
    //preventMove: function (e) {
    //    // 高位表示向上滚动, 底位表示向下滚动: 1容许 0禁止
    //    var status = '11',
    //        e = e || window.event, // 使用 || 运算取得event对象
    //        ele = this,
    //        currentY = e.touches[0].clientY,
    //        startY = startMoveYmap[ele.id],
    //        scrollTop = ele.scrollTop,
    //        offsetHeight = ele.offsetHeight,
    //        scrollHeight = ele.scrollHeight;

    //    if (scrollTop === 0) {
    //        // 如果内容小于容器则同时禁止上下滚动
    //        status = offsetHeight >= scrollHeight ? '00' : '01';
    //    } else if (scrollTop + offsetHeight >= scrollHeight) {
    //        // 已经滚到底部了只能向上滚动
    //        status = '10';
    //    }
    //    if (status != '11') {
    //        // 判断当前的滚动方向
    //        var direction = currentY - startY > 0 ? '10' : '01';
    //        // console.log(direction);
    //        // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
    //        if (!(parseInt(status, 2) & parseInt(direction, 2))) {
    //            e.preventDefault();
    //            e.stopPropagation();
    //            return;
    //        }
    //    }
    //},
    //阻止向下拉动出现顶部域名
    simpleHookTouchDown: function () {
        var maxscroll = 0;
        var startpos;
        document.body.addEventListener('touchstart', function (e) {
            startpos = e.touches[0];
            maxscroll = document.body.scrollTop;
        });
        document.body.addEventListener('touchmove', function (e) {
            var current = e.touches[0];
            if (current.clientY - startpos.pageY > maxscroll) {
                e.preventDefault();
            }
        });
    }
};
