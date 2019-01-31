

function countElements() {
    function appendName(data, nodeName) {
        if (!nodeName) return;
        nodeName = nodeName.toLowerCase();
        if (nodeName in data) {
            data[nodeName] = data[nodeName] + 1;
        } else {
            data[nodeName] = 1;
        }
    }
    function countNode(data, node) {
        if (!node) return;
        appendName(data,node.nodeName)
        if (!node.childNodes) return;
        for (var i = 0; i < node.childNodes.length; i++) {
            countNode(data, node.childNodes[i]);
        }
    }
    var result = {};
    countNode(result, document.getRootNode());
    return result;
}