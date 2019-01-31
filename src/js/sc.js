

//P5
function forEach(array, action) {
    for (var i = 0; i < array.length; i++) {
        action(array[i]);
    }
}
//函数求反
function negate(func) {
    return function () {
        return !func.apply(null, arguments)
    }
}
//归约函数
function reduce(combine, base, array) {
    forEach(array, function (element) {
        base = combine(base, element);
    });
    return base;
}
//映射函数
function map(func, array) {
    var result = [];
    forEach(array, function (element) {
        result.push(func(element));
    });
    return result;
}
var op = {
    "+": function (a, b) { return a + b; },
    "-": function (a, b) { return a - b; },
    "==": function (a, b) { return a == b; },
    "===": function (a, b) { return a == b; },
    "!": function (a) { return !a; },
};
//分布应用函数
function partial(func) {
    var knowArgs = arguments;
    return function () {
        var realArgs = [];
        for (var i = 1; i < knowArgs.length; i++) {
            realArgs.push(knowArgs[i]);
        }
        return func.apply(null, realArgs);
    };
}
function compose(f1, f2) {
    return function () {
        return f1(f2.apply(null, arguments));
    }
}


//P6
function forEachIn(object, action) {
    for (var property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property))
            action(property, object[property]);
    }
}


/*

*/



//P10

function isTextNode(node) {
    return node.nodeType == 3;
}
function isImageNode(node) {
    return !isTextNode(node) && node.nodeName == "IMG";
}

function dom(name, attributes /*,children*/) {
    var node = document.createElement(name);
    if (attributes) {
        forEachIn(attributes, function (name, value) {
            node.setAttribute(name, value);
        });
    }
    for (var i = 2; i < arguments.length; i++) {
        var child = arguments[i];
        if (typeof child == "string")
            child = document.createTextNode(child);
        node.appendChild(child);
    }
    return node;
}
function removeNode(node) {
    node.ParentNode.removeChild(node);
}
function insertBefore(newNode, node) {
    node.ParentNode.insertBefore(newNode, node);
}



//var output = dom("DIV", { id: "printOutput" }, dom("H1", null, "Print Output:"));
//document.body.appendChild(output);
//function print() {
//    var result = [];
//    forEach(arguments, function (arg) { result.push(String(arg)); });
//    output.appendChild(dom("PRE", null, result.join("")));
//}

//P11
function registerEventHandler(node, event, handler) {
    if (typeof node.addEventListener == "function")
        node.addEventListener(event, handler, false);
    else
        node.attachEvent("on" + event, handler);
}
function unregisterEventHandler(node, event, handler) {
    if (typeof node.removeEventListener == "function")
        node.removeEventListener(event, handler, false);
    else
        node.detachEvent("on" + event, handler);
}
//事件对象正规化
function normalizeEvent(event) {
    if (!event.stopPropagation) {
        event.stopPropagation = function () { this.cancelBubble = true; };
        event.preventDefault = function () { this.returnValue = false; };
    }
    if (!event.stop)
        event.stop = function () {
            this.stopPropagation();
            this.preventDefault();
        };
    if (event.srcElement && !event.target)
        event.target = event.srcElement;

    if ((event.toElement || event.fromElement) && !event.relatedTarget)
        event.relatedTarget = event.toElement || event.fromElement;
    if (event.clientX != undefined && event.pageX == undefined) {
        event.pageX = event.clientX + document.body.scrollLeft;
        event.PageY = event.clientY + document.body.scrollTop;
    }
    if (event.type == "keypress")
        event.character = String.fromCharCode(event.charCode || event.keyCode);
    return event;
}

function addHandler(node, type, handler) {
    function wrapHandler(event) {
        handler(normalizeEvent(event || window.event));
    }
    registerEventHandler(node, type, wrapHandler);
    return { node: node, type: type, handler: wrapHandler };
}
function removeHandler(object) {
    unregisterEventHandler(object.node, object.type, object.handler);
}


//P12
function requestObject() {
    if (window.XMLHttpRequest)
        return new XMLHttpRequest();
    else if (window.ActiveXObject)
        return new ActiveXObject("Msxml2.XMLHTTP");
    else
        throw new Error("Could not create Http request object.");
}
function httpRequest(method, url, success, failure) {
    var request = requestObject();
    request.open(method, url, true);//只封装异步的情况
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200 || !failure)
                success(request.responseText);
            else if (failure) {
                failure(request.status, request.statusText);
            }
        }
    }
    request.send(null);
}

//自定义命名空间
; (function (namespace) {
    var host = defineNamespace(namespace);
    
})("system");

function defineNamespace(namespace,host) {
    namespace = namespace || "";
    var array = namespace.split(".");
    var currentdomain = host|| window;
    forEach(array, function (path) {
        if (path in currentdomain)
            currentdomain = currentdomain[path];
        else
            currentdomain = currentdomain[path] = {};
    });
    return currentdomain;
}

function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}

function toggleClass(obj, cls) {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls);
    } else {
        addClass(obj, cls);
    }
}
//指定this的对象执行js代码
function evalInContext(js, context) {
    //# Return the results of the in-line anonymous function we .call with the passed context
    return function () { return eval(js); }.call(context);
}
//复制克隆arguments对象
function cloneArguments(args, skip) {
    if (typeof skip === 'undefined') skip = 0;
    var res = [];
    for (var i = skip; i < args.length; i++) {
        res.push(args[i]);
    }
    return res;
}