$(function () {

    // 左侧字体选择框
    var move = false;
    var pageX = 0;
    var pageY = 0;
    var status = 0;
    /**1:旋转 2：右移动 3：*/
    var mouse = {};         // 鼠标当前位置


    // 禁用鼠标右键
    document.oncontextmenu = function (e) {
        if (window.event) e = window.event;
        return false;
    };
    // 预览图片时添加图片
    $('#filePicker3').on('click',function () {
        var isUpload = $('#isUpload').val();//验证文件是否已经上传
        if(isUpload==0){
            $('#uploader .queueList input').click();
        }else{
            layer.confirm('本操作会清空当前已经处理的图片，是否继续？', {
                btn: ['继续', '取消'],closeBtn:1 //按钮
            }, function (index) {
                layer.close(index);
                $('#uploader .btns .resetBtn').click();
                $('#uploader .queueList input').click();
            }, function () {
            });
        }
    });
    // // 点击新建画布
    // $('#addCanvas').on('click',function () {
    //     // 判断是否是ie
    //     function isIE(id_iframe = 'zt_iframe') { //ie?
    //         if (!!window.ActiveXObject || "ActiveXObject" in window)
    //             return parent.frames[id_iframe].document;
    //         else
    //             return parent.frames[id_iframe].contentWindow.document;
    //     }
    //     parent.$("#left-Hui-aside dl[data-classtype='zt']").click();
    //     $(isIE()).find('#btn_close').attr('value','yst');
    //     $(isIE()).find('#addCanvas').click();
    // });

    // 缩放图片
    // 初始化鼠标点击监听器滚动放大


    $(document).mousemove(function (e) {
        if (move) {
            if (!mouse.x) {
                mouse.x = e.pageX;
            }
            if (!mouse.y) {
                mouse.y = e.pageY;
            }
            var oldelect_top = parseFloat($('#label_main_hb').offset().top);
            var oldelect_left = parseFloat($('#label_main_hb').offset().left);
            var left = oldelect_left + e.pageX - mouse.x;
            var top = oldelect_top + e.pageY - mouse.y;

            mouse.x = e.pageX;
            mouse.y = e.pageY;
            var css = {
                'top': top + 'px',
                'left': left + 'px',
            };
            $('#label_main_hb').css(css);
        } else {
            mouse.x = e.pageX;
            mouse.y = e.pageY;
        }
    });

    $(document).mouseup(function () {
        // 结束
        move = false;
    });

    $(document).bind('mousewheel', function (event, delta) {
        var _con = $('#label_right_div');  // 设置目标区域
        let isuploader = $('#uploader').css('display');
        if(!_con.is(event.target) && _con.has(event.target).length === 0&&isuploader=='none'){ // Mark 1
            let rate = 0.1;//缩放速度
            var oldscale = parseFloat($('#label_main_hb').attr('scale'));
            var offset_top = parseFloat($('#label_main_hb').offset().top);
            var offset_left = parseFloat($('#label_main_hb').offset().left);
            var width = parseFloat($('#label_main_hb').attr('width'));
            var height = parseFloat($('#label_main_hb').attr('height'));

            var left_bl = (mouse.x - offset_left) / (width * oldscale);
            var top_bl = (mouse.y - offset_top) / (height * oldscale);

            if (delta > 0) {//放大
                var newscale = (oldscale + rate).toFixed(2);
                var top = offset_top - top_bl * height * rate;
                var left = offset_left - left_bl * width * rate;
            } else {//缩小
                var newscale = (oldscale - rate).toFixed(2);
                var top = offset_top + top_bl * height * rate;
                var left = offset_left + left_bl * width * rate;
            }
            var transform = "scale(" + newscale + ")";
            if (newscale > 0 && newscale <= 5) {
                // 设置缩放中心点
                var css = {
                    'transform': transform,
                    'top': top + 'px',
                    'left': left + 'px',
                    'transform-origin': '0% 0% 0',
                };
                $('#label_main_hb').css(css);
                $('#label_main_hb').attr('scale', newscale);
                $('.t-stage-tool_bl').text(parseInt(newscale * 100) + '%');
                var showTool = $('.t-stage-tool_bl').css('display');
                if (showTool == 'none') {
                    $('.t-stage-tool_bl').fadeIn();
                    setTimeout(function () {
                        $('.t-stage-tool_bl').fadeOut();
                    }, 2000);
                };
                parent.rotateSuoFangBli();

            };
            return false;
        }
    });


    $(document).mousedown(function (e) {
        parent.$('body').click();
        parent.checkColpick();
        //如果事件对象存在
        var event = event || window.event;
        var typeclass = event.target.getAttribute('class');
        var class_id = event.target.getAttribute('class_id');
        var cid = event.target.getAttribute('id');
        if (class_id == 'img_bj' || cid == 'freeRotate') {
            move = true;
        }
    });


    /*右边图片切换图片*/
    $("body").delegate("#label_right_div_ul ul", "click", function (e) {
        let now_id = $(this).attr('id');
        let old_id = $('#label_right_div').attr('lay-imgid');
        if (now_id != old_id) {
            $('#label_right_div').attr('lay-imgid', now_id);
            $(this).find('li .editing').show();
            $('#label_right_div #label_right_div_ul #' + old_id + ' .editing').hide();

            let now_width = $(this).find('img').attr('oldwidth');
            let now_height = $(this).find('img').attr('oldheight');
            let now_src = $(this).find('img').attr('src');
            _initialize(now_width, now_height, now_src);
        }
        // parent.overAllHandle();
        /* 阻止冒泡事件*/
        e.stopPropagation();
    });



});

// 移入底部显示操作框
function bqover(obj) {
    var content = $(obj).attr('content');
    var le = 0;
    if (content.length > 3) {
        le = content.length * 25 / 7;
    }
    var left = $(obj).offset().left - le + 'px';
    var html = "<div id='move_bq_move' style='z-index:50;left:" + left + "' class='bq_move'>" + content + "<b class='bottom'><i class='bottom-arrow1'></i><i class='bottom-arrow2'></i></b></div>";
    $('body').append(html);
}

// 移出底部移除操作框
function bqout() {
    $('#move_bq_move').remove();
}

// 操作底部标签框
function bqMoveZoom(obj) {
    var placement = $(obj).attr('placement');
    var bl = 100;
    var rate = 0.05;
    switch (placement) {
        case 'zoom_in'://背景放大
            var scale = parseFloat($('#label_main_hb').attr('scale'));
            scale = scale + rate;
            break;
        case 'zoom_out'://背景缩小
            var scale = parseFloat($('#label_main_hb').attr('scale'));
            scale = scale - rate;
            break;
        case 'zoom_sf'://缩放至当前操作框
            var scale = parseFloat($('#label_main_hb').attr('oldscale'));
            break;
        case 'zoom_ys'://原始比例1：1
            var scale = 1;
            break;
        default :
            // $('#label_right_div #label_right_div_ul').empty();
            $('#uploader').show();
            $('.label_main').hide();
            break;
    }
    if (bl > 0 && scale <= 5 && scale > 0.01) {

        let bsl = 1/parseFloat(scale);
        let csscao = {
            'transform': 'scale(' + bsl + ',' + bsl + ')'
        };
        $('.rotate,.mb_ng-star-inserted,.mt_ng-star-inserted,.ml_ng-star-inserted,.mr_ng-star-inserted,.ng-star-inserted').css(csscao);
        // // 画布原始参数
        $('#label_main_hb').attr('scale', scale);
        bl = parseInt(scale * 100);
        var oldwidth = parseFloat($('#label_main_hb').attr('width'));
        var oldheight = parseFloat($('#label_main_hb').attr('height'));
        // 可操作距离宽高
        var width = parseFloat($('.label_main_div').width());
        var height = parseFloat($('.label_main_div').height());
        oldwidth = oldwidth * scale;
        oldheight = oldheight * scale;
        var left = (width - oldwidth) / 2;
        var top = (height - oldheight) / 2;
        var css = {
            'transform': 'scale(' + scale + ')',
            'top': top + 'px',
            'left': left + 'px',
            'transform-origin': '0% 0% 0'
        }
        $('#label_main_hb_h').css(css);
        $('#label_main_hb').css(css);

        $('.t-stage-tool_bl').text(bl + '%');
        var showTool = $('.t-stage-tool_bl').css('display');
        if (showTool == 'none') {
            $('.t-stage-tool_bl').fadeIn();
            setTimeout(function () {
                $('.t-stage-tool_bl').fadeOut();
            }, 2000);
        }

    }

}


// 初始化编辑框
function _initialize(now_width, now_height, now_src) {
// 当前编辑框
    $('#label_main_hb').attr('width', now_width);
    $('#label_main_hb').attr('height', now_height);
    var viewBox = '0,0,' + now_width + ',' + now_height;
    document.querySelector('#label_main_hb #svg_now').setAttribute("viewBox", viewBox);


    $('#label_main_hb #svg_now').attr('width', now_width);
    $('#label_main_hb #svg_now').attr('height', now_height);

    $('#label_main_hb #svg_now').find('#ytimg').attr('xlink:href', now_src);
    $('#label_main_hb #svg_now').find('#ytimg').attr('width', now_width);
    $('#label_main_hb #svg_now').find('#ytimg').attr('height', now_height);


    // 可操作距离宽高
    var width = parseFloat($('.label_main_div').width());
    var height = parseFloat($('.label_main_div').height());
    // 图片放入操作框缩放后宽高
    var cw = parseFloat(now_width);
    var ch = parseFloat(now_height);

    var m_w = width - 100;
    var m_h = height - 140;
    var bl = 1;

    if (cw > m_w || ch > m_h) {
        // 超过适应
        if (cw > m_w && ch <= m_h) {
            bl = m_w / cw;
            ch = m_w * ch / cw;
            cw = m_w;
        } else if (cw <= m_w && ch > m_h) {
            bl = m_h / ch;
            cw = m_h * cw / ch;
            ch = m_h;
        } else {
            if (cw / ch > m_w / m_h) {
                bl = m_w / cw;
                ch = m_w * ch / cw;
                cw = m_w;
            } else {
                bl = m_h / ch;
                cw = m_h * cw / ch;
                ch = m_h;
            }
        }
    }

    var left = (width - cw) / 2;
    var top = (height - ch) / 2;
    var css = {
        'transform': 'scale(' + bl + ')',
        'top': top + 'px',
        'left': left + 'px',
        'width': now_width + 'px',
        'height': now_height + 'px',
        'transform-origin': '0% 0% 0px'
    };
    $('#label_main_hb').css(css);
    $('#label_main_hb').attr('scale', bl);
    $('#label_main_hb').attr('oldscale', bl);
    var isele = parent.$("#imgRight dl dt[lay-id='imgCropDt']").attr('class');
    if(isele=='selected'){
        parent.intCropImg();
    }
    var iseles = parent.$("#imgRight dl dt[lay-id='imgRotate']").attr('class');
    if(iseles=='selected'){
        parent.intxuanzhuanImg();
    }


}




