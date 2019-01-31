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
    }

};
