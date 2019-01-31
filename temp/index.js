$(function () {
    var box = document.querySelector('.drag');
    box.onmousedown = function (e) {

        let toplayer = document.createElement('div');
        toplayer.style.zIndex = 99;
        toplayer.style.position = "fixed";
        toplayer.style.top = 0;
        toplayer.style.bottom = 0;
        toplayer.style.left = 0;
        toplayer.style.right = 0;
        toplayer.startX=e.clientX;
        toplayer.startY=e.clientY;
        document.body.appendChild(toplayer);
        let dragNode = e.target.cloneNode();
        dragNode.style.backgroundColor = 'green';
        dragNode.style.position = 'absolute'
        dragNode.style.left = e.target.offsetLeft + 'px';
        dragNode.style.top = e.target.offsetTop + 'px';
        dragNode.style.width = e.target.clientWidth + 'px';
        dragNode.style.height = e.target.clientHeight + 'px';
        toplayer.startOffsetX=e.target.offsetLeft;
        toplayer.startOffsetY=e.target.offsetTop;
        toplayer.appendChild(dragNode);
        toplayer.addEventListener('mouseup', (e) => {
            //toplayer.style.backgroundColor='rgba(0,0,255,.2)';
            document.body.removeChild(toplayer);
        });
        toplayer.addEventListener('mousemove', (e) => {
           var offsetX= e.clientX-toplayer.startX;
           var offsetY=e.clientY-toplayer.startY;
           dragNode.style.left=(toplayer.startOffsetX+offsetX)+'px';
        });
    }

    //正在拖拽时(拖拽时不断触发)
    box.ondrag = function (e) {
        console.log("drag");
        var node = e.target.cloneNode();

    }

    //当拖拽结束时
    box.ondragend = function (e) {
        console.log("end");
    }


});
