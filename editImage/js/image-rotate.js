(function ($) {

    // 裁剪移动
    var movesrotate = false;
    var movesrotatenum = 0;
    var pageX = 0;
    var pageY = 0;
    // $('.e-border').
    /*整体移动*/
    $('#freeRotate .e-border,#freeRotate .rotate').mousedown(function (e) {
        var event = event || window.event;
        //如果事件对象存在
        movesrotate =true;
        movesrotatenum = 1;/*裁剪框移动*/
        pageX = event.clientX;
        pageY = event.clientY;
    });
    // 裁剪框移動
    $(document).mousemove(function (e) {
        if(movesrotate){
            var bl  = parseFloat($('#label_main_hb').attr('scale'));
            var width = parseFloat($('#freeRotate #rselect_style').css('width'));
            var height = parseFloat($('#freeRotate #rselect_style').css('height'));
            switch (movesrotatenum){
                case 1:/*裁剪框移动*/
                    var x = (e.pageX - pageX)/bl;
                    var y = (e.pageY - pageY)/bl;
                    drowImgW(width,height,x,y);
                    pageX = e.pageX;
                    pageY = e.pageY;
                    break;
            }
        }
    });

    $(document).mouseup(function() {
        // 结束
        movesrotate =false;
        movesrotatenum = 0;/*裁剪框移动*/
        $('.cursor_move_text').hide()
    });

    function drowImgW(width,height,x,y) {
        /* 获取图片宽高*/
        const oldwidth = parseFloat($('#freeRotate').css('width'));
        const oldheight = parseFloat($('#freeRotate').css('height'));
        var top = parseFloat($('#freeRotate #rselect_style').css('top'));
        var left = parseFloat($('#freeRotate #rselect_style').css('left'));
        top = top+y;
        left = left+x;
        if(top<0){
            top = 0;
        }else if(top+height>oldheight){
            top = oldheight-height;
        }
        if(left<0){
            left = 0;
        }else if(left+width>oldwidth){
            left = oldwidth-width;
        }

        var css = {
            'width':width+'px',
            'height':height+'px',
            'left':left+'px',
            'top':top+'px',
        };
        parent.oldp = {
            'width':width,
            'height':height,
            'left':left,
            'top':top,
        };
        $('#freeRotate #rselect_style').css(css);
        var cssi = {
            'width':width+'px',
            'height':height+'px',
            'x':left+'px',
            'y':top+'px',
        };
        $('#freeRotate .t-guider #tGuider').css(cssi);
        $('#freeRotate .t-guider #tGuiderRect').attr('width',oldwidth);
        $('#freeRotate .t-guider #tGuiderRect').attr('height',oldheight);
        showTextRotate(pageX,pageY);
    }
    init();

})(window.jQuery);

// 定义一个Rect
var p = {
    x: '',
    y: '',
    height: '',
    width: '',
    rotate: 0,
    status:0
};
var boxr, rotateHandler, resizeHandlersrotate;
function init() {
    boxr = document.querySelector('#rselect_style');
    resizeHandlersrotate = Array.prototype.slice.call(document.querySelectorAll('#rselect_style span'), 0);
    resizeHandlersrotate.map(function(handler) {
        bindResizeEventsR(handler);
    });
    var rect = boxr.getBoundingClientRect();
    p={
        x: rect.left,
        y: rect.top,
        height: rect.height,
        width: rect.width,
        oldheight: rect.height,
        oldwidth: rect.width,
        rotate:0,
        status:1
    };
}
/**
 * 重绘视图
 * @return {[type]} [description]
 */
function drawr(pageX,pageY) {
    var oldwidth = parseFloat($('#freeRotate').css('width'));
    var oldheight = parseFloat($('#freeRotate').css('height'));
    // var oldleft = parseFloat($('#freeRotate').css('left'));
    // var oldtop = parseFloat($('#freeRotate').css('top'));
    var rectold = document.getElementById('freeRotate').getBoundingClientRect();
    // oldleft
    var oldleft = rectold.left;
    var oldtop = rectold.top;
    var rect = boxr.getBoundingClientRect();
    var bl  = parseFloat($('#label_main_hb').attr('scale'));
    p.x=(p.x-oldleft)/bl;
    p.y=(p.y-oldtop)/bl;
    p.width = p.width/bl;
    p.height = p.height/bl;
    p.status = 1;
    if(p.y+p.height>oldheight){
        p.height = oldheight-p.y;
        p.status = 2;
    }
    if(p.y+p.height==oldheight){
        p.height = oldheight-p.y;
    }
    if(p.y<0){
        p.height = p.height+p.y;
        p.y = 0;
    }
    if(p.x+p.width>oldwidth){
        p.width = oldwidth-p.x;
        p.status = 2;
    }
    if(p.x+p.width==oldwidth){
        p.width = oldwidth-p.x;
    }
    if(p.x<0){
        p.width = p.width+p.x;
        p.x = 0;
    }
    // 判断宽高
    if(p.width<20){
        p.x = rect.left-oldleft;
        p.width = 20;
    }
    if(p.height<20){
        p.y = rect.top-oldtop;
        p.height = 20;
    }
    p.width = parseInt(p.width);
    p.height = parseInt(p.height);
    var css = {
        'width':p.width+'px',
        'height':p.height+'px',
        'left':p.x+'px',
        'top':p.y+'px',
    };
    parent.oldp = {
        'width':p.width,
        'height':p.height,
        'left':p.x,
        'top':p.y,
    };
    $('#freeRotate #rselect_style').css(css);
    var cssi = {
        'width':p.width+'px',
        'height':p.height+'px',
        'x':p.x+'px',
        'y':p.y+'px',
    };
    $('#freeRotate .t-guider #tGuider').css(cssi);
    $('#freeRotate .t-guider #tGuiderRect').attr('width',oldwidth);
    $('#freeRotate .t-guider #tGuiderRect').attr('height',oldheight);
    showTextRotate(pageX,pageY);
}
function showTextRotate(pageX,pageY) {
    const xswidth = parseFloat($('#freeRotate #rselect_style').css('width'));
    const xsheight = parseFloat($('#freeRotate #rselect_style').css('height'));
    // 显示尺寸
    var text_w = "宽： "+xswidth+" px";
    var text_h = "高： "+xsheight+" px";
    $('#cursor_move_w').text(text_w);
    $('#cursor_move_h').text(text_h);
    // 设置跟随光标移动显示图标
    $('.cursor_move_text').show();
    var cursor_css={
        'top':pageY+10+'px',
        'left':pageX+10+'px'
    };
    $('.cursor_move_text').css(cursor_css);
}
function bindResizeEventsR(node) {
    node.onmousedown = function() {
        // var bl  = parseFloat($('#label_main_hb').attr('scale'));
        status = 2;
        var rect = boxr.getBoundingClientRect();
        p={
            x: rect.left,
            y: rect.top,
            height: rect.height,
            width: rect.width,
            oldheight: rect.height,
            oldwidth: rect.width,
            rotate:0,
            status:1
        };


        // p={
        //     x: (parseFloat($('#freeRotate #rselect_style').css('left'))+parseFloat($('#label_main_hb').css('left'))),
        //     y: (parseFloat($('#freeRotate #rselect_style').css('top'))+parseFloat($('#label_main_hb').css('top'))),
        //     height: parseFloat($('#freeRotate #rselect_style').css('height')),
        //     width: parseFloat($('#freeRotate #rselect_style').css('width')),
        //     rotate:0
        // };

        // 缩放开始
        var event = window.event;
        event.preventDefault();
        var { x, y, width, height, rotate } = p;
        var ex = event.pageX;
        var ey = event.pageY;
        // 计算初始状态旋转后的rect
        var transformedRect = transform({
            x,
            y,
            width,
            height
        }, rotate);
        // 取得旋转后的8点坐标
        var { point } = transformedRect;

        // 获取当前点和对角线点
        var pointAndOpposite = getPointAndOpposite(point, ex, ey);

        var { opposite } = pointAndOpposite;

        // 对角线点的索引即为缩放基点索引
        var baseIndex = opposite.index;

        var oppositeX = opposite.point.x;
        var oppositeY = opposite.point.y;

        // 鼠标释放点距离当前点对角线点的偏移量
        var offsetWidth = Math.abs(ex - oppositeX);
        var offsetHeight = Math.abs(ey - oppositeY);

        // 记录最原始的状态
        var oPoint = {
            x,
            y,
            width,
            height,
            rotate
        };

        document.onmousemove = function() {
            var event = window.event;

            var nex = event.pageX;
            var ney = event.pageY;

            var scale = {
                x: 1,
                y: 1
            };
            var realScale = 1;

            // 判断是根据x方向的偏移量来计算缩放比还是y方向的来计算
            if (offsetWidth > offsetHeight) {
                realScale = Math.abs(nex - oppositeX) / offsetWidth;
            } else {
                realScale = Math.abs(ney - oppositeY) / offsetHeight;
            }

            if ([0, 2, 4, 6].indexOf(baseIndex)>=0) {
                scale.x = scale.y = realScale;
            } else if([1, 5].indexOf(baseIndex)>=0) {
                scale.y = realScale;
            } else if([3, 7].indexOf(baseIndex)>=0) {
                scale.x = realScale;
            }
            var newRect = getNewRect(oPoint, scale, transformedRect, baseIndex);

            if(p.status == 1){
                p.x = parseFloat(newRect.x.toFixed(3));
                p.y = parseFloat(newRect.y.toFixed(3));
                p.width = parseFloat(newRect.width.toFixed(3));
                p.height = parseFloat(newRect.height.toFixed(3));
                p.status = 2;
                drawr(nex,ney);
            }else{
                // var oldleft = parseFloat($('#label_main_hb').css('left'));
                // var oldtop = parseFloat($('#label_main_hb').css('top'));
                // var oldwidth = parseFloat($('#label_main_hb #svg_now').attr('width'));
                // var oldheight = parseFloat($('#label_main_hb #svg_now').attr('height'));
                // var bl  = parseFloat($('#label_main_hb').attr('scale'));
                // // console.log(p)
                // p.x=(p.x-oldleft)/bl;
                // p.y=(p.y-oldtop)/bl;
                // p.width = p.width/bl;
                // p.height = p.height/bl;
                // if(p.y+p.height<oldheight){
                //     draw();
                // }else if(p.x+p.width<oldwidth){
                //     draw();
                // }
            }







        };
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
            p.status = 0;
            status = 0;
            $('.cursor_move_text').hide()
        }
    }
}
function css(node, ops) {
    for (var index in ops) {
        node['style'][index] = ops[index];
    }
    // var main_top = parseFloat($('#label_main_hb').css('top'));
    // var main_left = parseFloat($('#label_main_hb').css('left'));
    // p.x =p.x +main_left;
    // p.y =p.y +main_top;
    // changLables();
}
function getScaledRect(params, baseIndex) {
    var { x, y, width, height, scale } = params;
    var offset = {
        x: 0,
        y: 0
    };
    var deltaXScale = scale.x - 1;
    var deltaYScale = scale.y - 1;
    var deltaWidth = width * deltaXScale;
    var deltaHeight = height * deltaYScale;
    var newWidth = width + deltaWidth;
    var newHeight = height + deltaHeight;
    var newX = x - deltaWidth / 2;
    var newY = y - deltaHeight / 2;
    if (baseIndex) {
        var points = [{x, y}, {x: x+ width, y}, {x: x + width, y: y+ height}, {x, y: y+ height}];
        var newPoints = [{x: newX, y: newY}, {x: newX+ newWidth, y: newY}, {x: newX + newWidth, y: newY+ newHeight}, {x: newX, y: newY+ newHeight}];
        offset.x = points[baseIndex].x - newPoints[baseIndex].x;
        offset.y = points[baseIndex].y - newPoints[baseIndex].y;
    }
    return {
        x: newX + offset.x,
        y: newY + offset.y,
        width: newWidth,
        height: newHeight
    }
}
function setCursorStyle(degree) {
    var top = document.querySelector('.mt_ng-star-inserted'),
            topRight = document.querySelector('.tr'),
            right = document.querySelector('.mr_ng-star-inserted'),
            bottomRight = document.querySelector('.br'),
            bottom = document.querySelector('.mb_ng-star-inserted'),
            bottomLeft = document.querySelector('.bl'),
            left = document.querySelector('.ml_ng-star-inserted'),
            topLeft = document.querySelector('.tl'),
            cursorStyle = getNewCursorArray(degree);
    css(top, { 'cursor': cursorStyle[0] });
    css(topRight, { 'cursor': cursorStyle[1] });
    css(right, { 'cursor': cursorStyle[2] });
    css(bottomRight, { 'cursor': cursorStyle[3] });
    css(bottom, { 'cursor': cursorStyle[4] });
    css(bottomLeft, { 'cursor': cursorStyle[5] });
    css(left, { 'cursor': cursorStyle[6] });
    css(topLeft, { 'cursor': cursorStyle[7] });
}
/**
 * 获取点的鼠标手势
 * @param  {[type]} degree [description]
 * @return {[type]}        [description]
 */
function getNewCursorArray(degree) {
    const cursorStyleArray = ['ns-resize', 'nesw-resize', 'ew-resize', 'nwse-resize', 'ns-resize', 'nesw-resize', 'ew-resize', 'nwse-resize'];

    const ARR_LENGTH = 8;
    const STEP = 45;

    let startIndex = 0;

    if (degree) {
        startIndex = Math.floor(degree / STEP);
        if (degree % STEP > (STEP / 2)) {
            startIndex += 1;
        }
    }

    if (startIndex > 1) {
        const len = ARR_LENGTH - startIndex;
        return (cursorStyleArray.slice(startIndex, startIndex + len))
                .concat(cursorStyleArray.slice(0, startIndex));
    }

    return cursorStyleArray;
}
function transform(options, angle) {
    var x = options.x;
    var y = options.y;
    var width = options.width;
    var height = options.height;

    var r = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2;
    var a = Math.round(Math.atan(height / width) * 180 / Math.PI);
    var tlbra = 180 - angle - a;
    var trbla = a - angle;
    var ta = 90 - angle;
    var ra = angle;

    var halfWidth = width / 2;
    var halfHeight = height / 2;

    var middleX = x + halfWidth;
    var middleY = y + halfHeight;

    var topLeft = {
        x: middleX + r * Math.cos(tlbra * Math.PI / 180),
        y: middleY - r * Math.sin(tlbra * Math.PI / 180)
    };
    var top = {
        x: middleX + halfHeight * Math.cos(ta * Math.PI / 180),
        y: middleY - halfHeight * Math.sin(ta * Math.PI / 180),
    };
    var topRight = {
        x: middleX + r * Math.cos(trbla * Math.PI / 180),
        y: middleY - r * Math.sin(trbla * Math.PI / 180)
    };
    var right = {
        x: middleX + halfWidth * Math.cos(ra * Math.PI / 180),
        y: middleY + halfWidth * Math.sin(ra * Math.PI / 180),
    };
    var bottomRight = {
        x: middleX - r * Math.cos(tlbra * Math.PI / 180),
        y: middleY + r * Math.sin(tlbra * Math.PI / 180)
    };
    var bottom = {
        x: middleX - halfHeight * Math.sin(ra * Math.PI / 180),
        y: middleY + halfHeight * Math.cos(ra * Math.PI / 180),
    };
    var bottomLeft = {
        x: middleX - r * Math.cos(trbla * Math.PI / 180),
        y: middleY + r * Math.sin(trbla * Math.PI / 180)
    };
    var left = {
        x: middleX - halfWidth * Math.cos(ra * Math.PI / 180),
        y: middleY - halfWidth * Math.sin(ra * Math.PI / 180),
    };
    var minX = Math.min(topLeft.x, topRight.x, bottomRight.x, bottomLeft.x);
    var maxX = Math.max(topLeft.x, topRight.x, bottomRight.x, bottomLeft.x);
    var minY = Math.min(topLeft.y, topRight.y, bottomRight.y, bottomLeft.y);
    var maxY = Math.max(topLeft.y, topRight.y, bottomRight.y, bottomLeft.y);
    return {
        point: [topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left],
        width: maxX - minX,
        height: maxY - minY,
        left: minX,
        right: maxX,
        top: minY,
        bottom: maxY
    }
}
/**
 * 取得鼠标释放点在rect8点坐标中的对应点及其对角线点
 * @param  {[type]} point [description]
 * @param  {[type]} ex    [description]
 * @param  {[type]} ey    [description]
 */
function getPointAndOpposite(point, ex, ey) {
    let oppositePoint = {};
    let currentPoint = {};

    let minDelta = 1000;
    let currentIndex = 0;
    let oppositeIndex = 0;

    point.forEach((p, index) => {
        const delta = Math.sqrt(Math.pow(p.x-ex, 2) + Math.pow(p.y-ey, 2));
        if (delta < minDelta) {
            currentPoint = p;
            currentIndex = index;
            minDelta = delta;
            // 对角线点index相差4
            let offset = 4;
            let oIndex = index - offset;
            if (oIndex < 0) {
                oIndex = index + offset;
            }
            // 取对角线点坐标
            oppositePoint = point.slice(oIndex, oIndex + 1)[0];
            oppositeIndex = oIndex;
        }
    });

    return {
        current: {
            index: currentIndex,
            point: currentPoint
        },
        opposite: {
            index: oppositeIndex,
            point: oppositePoint
        }
    };
}
/**
 * 根据缩放基点和缩放比例取得新的rect
 * @param  {[type]} oPoint               [description]
 * @param  {[type]} scale            [description]
 * @param  {[type]} oTransformedRect [description]
 * @param  {[type]} baseIndex        [description]
 * @return {[type]}                  [description]
 */
function getNewRect(oPoint, scale, oTransformedRect, baseIndex) {
    var scaledRect = getScaledRect({
        x: oPoint.x,
        y: oPoint.y,
        width: oPoint.width,
        height: oPoint.height,
        scale: scale
    });
    var transformedRotateRect = transform(scaledRect, oPoint.rotate);
    // 计算到平移后的新坐标
    var translatedX = oTransformedRect.point[baseIndex].x - transformedRotateRect.point[baseIndex].x + transformedRotateRect.left;
    var translatedY = oTransformedRect.point[baseIndex].y - transformedRotateRect.point[baseIndex].y + transformedRotateRect.top;

    // 计算平移后元素左上角的坐标
    var newX = translatedX + transformedRotateRect.width / 2 - scaledRect.width / 2;
    var newY = translatedY + transformedRotateRect.height / 2 - scaledRect.height / 2;

    // 缩放后元素的高宽
    var newWidth = scaledRect.width;
    var newHeight = scaledRect.height;

    return {
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight
    };
}
