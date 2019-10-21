// 记录参数
var imghandle = {
    rotate:'0,1,1,0',
    handleimg:'',
    watermark:[100,100,0,0,0,0,0],
    svg:{},
    isChange:0,
    funs:'',
    width:0,
    height:0,
    imgcrop:'0,0,0,0,0,0,0,0,0,0,0,0',
    bjcolor:'',
};
/*
* rotate:旋转角度
* handleimg：操作名称
*watermark:水印调节名称
* */

function reStroCs(lay_error,type='1') {
    imghandle.handleimg = '';
    switch (lay_error){
        case 'watermark'://水印调节
            $('.slider-sy-tmd-input').jRange('setValue', 100);//透明度
            $('.slider-sy-dx-input').jRange('setValue', 100);//大小
            $('.slider-sy-jj-input').jRange('setValue', 0);//间距
            $('.slider-sy-jd-input').jRange('setValue', 0);//角度
            document.getElementById('shuiyin_text').value='水印文字';
            watermarkBalance('0');
            break;
        case 'qxcrop'://图片裁剪取消
            var imgcrop = imghandle.imgcrop;
            var imgcropArr = imgcrop.split(",");
            const oldwidth = parseFloat(imgcropArr[10]);
            const oldheight = parseFloat(imgcropArr[11]);
            imgcrop = "0,0,0,1,0,0,0,0,0,0,"+oldwidth+","+oldheight;
            imghandle.imgcrop = imgcrop;
            $("#cropImgIndex dl dd[lay-value='|']").click();

            if(type == '1') {
                $(isIE('image_iframe')).find("#label_main_hb #imgCjk").hide();
                $("#imgRight dl dt[lay-id='imgCropDt']").click();
            }
            break;
        case 'xiugaicicun'://修改尺寸
            imgSizeHandle(types='',0);
            if(type == '1') {
                $("#imgRight dl dt[lay-id='saveImgSize']").click();
            }
            break;
        case 'tupianxuanzhuan'://图片旋转
            imghandle.rotate = "0,1,1,0";
            $('.slider-xuanzhuan-input').jRange('setValue', 0);//归零
            imgRotate(0);
            // $('#imgbjcolor').colpickSetColor('#FFFFFF');
            if(type == '1') {
                $("#imgRight dl dt[lay-id='imgRotate']").click();
            }
            break;
    }
    // 处理完成恢复居中
    $(isIE('image_iframe')).find(".t-stage-tool div[placement='zoom_sf']").click();
    $(isIE('image_iframe')).find("#label_main_hb").css('background','');

}
function jicode(){
    var lay_imgid = windowImgId;
    var obj = {};
    var objsvg = {};
    objsvg.width =$(isIE('image_iframe')).find("#uploader ul.material .women img")[0].naturalWidth;
    objsvg.height =$(isIE('image_iframe')).find("#uploader ul.material .women img")[0].naturalHeight;
    objsvg.svg =imghandle.svg.svg;
    objsvg.url =$(isIE('image_iframe')).find("#uploader ul.material .women img").attr('src');
    obj.svg = objsvg;
    obj.isChange = imghandle.isChange;
    var htmlsvg = obj;
    imgsaveKz(1,htmlsvg)
}
function imgsaveKz(sta=1, htmlsvg) {
    if (sta == 0) {
        imgqjArr = [];
        imgkzArr = []
    }
    if (JSON.stringify(imgkzArr) === '[]') {
        var strobj = {};
        strobj.index = imgkzArr.length;
        strobj.html = htmlsvg;
        imgkzArr.push(strobj);
        if (imgkzArr.length > 10) {
            imgkzArr.splice(0, 1)
        }
        ;
    } else {
        var length = imgkzArr.length;
        var oldhtml = imgkzArr[length - 1].html;
        if (imghandle != oldhtml) {
            var strobj = {};
            strobj.index = imgkzArr.length;
            strobj.html = htmlsvg;
            imgkzArr.push(strobj);
            if (imgkzArr.length > 10) {
                imgkzArr.splice(0, 1)
            }
        }
    };
    imgshow()
}
// 调节确认
$('.jichutiaojie .success').on('click',function () {
    jicode();
    var lay_success = $(this).attr('lay-success');
    var shuiyinimg = $('.js_logoBox').attr('src');
    if(shuiyinimg=='https://www.yasuotu.com/yasuotu/images/shuiyin.png'){
        window.URL = window.URL || window.webkitURL;
        var xhr = new XMLHttpRequest();
        xhr.open("get", shuiyinimg, true);
        // 至关重要
        xhr.responseType = "blob";
        xhr.onload = function () {
            if (this.status == 200) {
                //得到一个blob对象
                var blob = this.response;
                // 至关重要
                let oFileReader = new FileReader();
                oFileReader.onloadend = function (e) {
                    let base64 = e.target.result;
                    $('.js_logoBox').attr('src',base64);
                    btnsuccess(lay_success,'1');
                    $(isIE('image_iframe')).find('#label_main_hb #svg_now #pattern-image image').attr('xlink:href',base64);
                };
                oFileReader.readAsDataURL(blob);

            }
        };
        xhr.send();
    }else{
        btnsuccess(lay_success,'1');
    }
});
// 确认修改
function btnsuccess(lay_success,types='1') {
    var type=1;
    var $arr = [];
    switch (lay_success){
        case 'watermark'://水印调节确定
            const watermark = imghandle.watermark;
            const watermarkcs = imghandle.watermarkcs;
            handleImg(type,lay_success,types,0);
            addimgfuns('watermark');
            break;
        case 'qxcrop'://图片裁剪确认
            var cwidth = parseFloat(document.getElementById('yasuo_crop_width').value);
            var cheight = parseFloat(document.getElementById('yasuo_crop_height').value);
            var left =parseFloat($(isIE('image_iframe')).find('#imgCjk #select_style').css('left'));
            var top =parseFloat($(isIE('image_iframe')).find('#imgCjk #select_style').css('top'));
            var x = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('x'));
            var y = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('y'));

            var width = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('width'));
            var height = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('height'));

            var oldwidth = parseFloat($(isIE('image_iframe')).find('#label_main_hb #imgCjk #select_style').css('width'));
            var oldheight = parseFloat($(isIE('image_iframe')).find('#label_main_hb #imgCjk #select_style').css('height'));


            var now_id = $(isIE('image_iframe')).find('#label_right_div').attr('lay-imgid');
            var imgcrop = imghandle.imgcrop;
            var imgcropArr = imgcrop.split(",");/*4,5,6,7*/


            /*根据设定比例判断缩放值*/
            var cjbl = $('#cropImgIndex').attr('bl');
            var cjblarr = cjbl.split(',');
            var blx = parseFloat(cjblarr[0]);
            var bly = parseFloat(cjblarr[1]);
            var fbl = 1;

            if(blx>17){/*按固定尺寸调节*/
                if(cwidth>oldwidth || cheight>oldheight){
                    /*获取可操作框宽高*/
                    fbl = cwidth/oldwidth;
                    var css={
                        'width':width*fbl,
                        'height':height*fbl
                    };
                    $(isIE('image_iframe')).find('#label_main_hb').css(css);
                    _initializeo(width*fbl,height*fbl)
                    $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('width',cwidth);
                    $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('height',cheight);
                }
            }
            // console.log(fbl);
            x = -left*fbl;
            y = -top*fbl;
            var css ={
                'border-top-left-radius':parseFloat(imgcropArr[4])*fbl+'px',
                'border-top-right-radius':parseFloat(imgcropArr[5])*fbl+'px',
                'border-bottom-left-radius':parseFloat(imgcropArr[6])*fbl+'px',
                'border-bottom-right-radius':parseFloat(imgcropArr[7])*fbl+'px',
                'background':'#FFFFFF'
            };
            if(imgcropArr[13]=='1'){
                imghandle.bjcolor = '';
            }else{
                imghandle.bjcolor = imgcropArr[12];
            }
            $(isIE('image_iframe')).find('#label_main_hb #svg_now').css(css);
            $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('x',x);
            $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('y',y);
            $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('width',width*fbl);
            $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('height',height*fbl);
            $(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('width',cwidth);
            $(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('height',cheight);

            var viewBox = '0,0,' + cwidth + ',' + cheight;
            document.getElementById('image_iframe').contentWindow.document.querySelector('#label_main_hb #svg_now').setAttribute("viewBox", viewBox);

            // type = 3;
            addimgfuns('qxcrop');
            handleImg(type,lay_success,types,0);
            break;
        case 'tupianxuanzhuan'://图片旋转
            var rotate = imghandle.rotate;
            var rotateArr = rotate.split(",");
            // if(rotateArr[3]>0) {
            type = 2;
            // }
            handleImg(type,lay_success,types,0);
            addimgfuns('tupianxuanzhuan');
            break;
        case 'xiugaicicun'://修改尺寸
            if(num>1){
                layer.confirm('是否将当前操作应用于全部图片？', {
                    btn: ['应用全部', '应用当前'],closeBtn:1 //按钮
                }, function (index) {
                    layer.close(index);
                    for(let idx in imghandle) {
                        if(idx!=now_id){
                            addimgfuns(idx,'xiugaicicun');
                            $arr.push(idx);
                            nums++;
                        }
                    }
                    handleImg(type,lay_success,types,1);
                }, function () {
                    handleImg(type,lay_success,types,0);
                });
            }else{
                handleImg(type,lay_success,types,0);
            }
            addimgfuns(now_id,'xiugaicicun');
            break;
    }
}
// 添加方法
function addimgfuns(fun){
    var funs = imghandle.funs;
    if(funs == ''){
        funs = fun;
    }else{
        funs = funs+','+fun;
    }
    imghandle.funs = funs;
    parent.imghandle = imghandle;
}
// 判断当前操作是否正在处理
var isMoreHandleImg=0;
// 显示正在处理
/*sta:1 处理  2：处理完成  3：全部处理完成*/
function showNowHandleIng(sta=1) {
    switch (sta) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            $(this).find('.editing').show();
            $(this).find('.editing span').text('正在编辑');
            break;
    }
}
/*//处理当前修改图片*/
function handleImg(type,lay_error,types,ispl=0) {
    if(ispl==1){
        $('#topImgGun').css('width','10%');
    }else{
        $('#topImgGun').css('width','90%');
    }
    showNowHandleIng(1);
    changeImg();
    /*type:1,2:修改尺寸*/
    var canvas = document.createElement("canvas");
    if(type == 2){
        var leftx = -parseFloat($(isIE('image_iframe')).find('#freeRotate #rselect_style').css('left'));
        var topx = -parseFloat($(isIE('image_iframe')).find('#freeRotate #rselect_style').css('top'));

        // 获取图片高度
        let now_id = $(isIE('image_iframe')).find('#label_right_div').attr('lay-imgid');
        var rotate = imghandle.rotate;
        var rotateArr = rotate.split(",");
        var rotate ="translate(" + leftx + "px," + topx + "px)"+" scale(" + rotateArr[1] + "," + rotateArr[2] + ")";

        var css = {
            'transform': rotate,
            '-ms-transform': rotate, /* IE 9 */
            '-moz-transform': rotate, /* Firefox */
            '-webkit-transform': rotate, /* Safari 和 Chrome */
            '-o-transform': rotate,
        };
        $(isIE('image_iframe')).find("#label_main_hb #svg_now").css(css);
    }
    var serializer = new XMLSerializer();
    let background = imghandle.bjcolor;
    if(background==''){
        background = $(isIE('image_iframe')).find('#label_main_hb').css('background');
    }
    $(isIE('image_iframe')).find("#label_main_hb #svg_now").css('background',background);
    var svg = document.getElementById('image_iframe').contentWindow.document.getElementById('svg_now');
    var source = serializer.serializeToString(svg); //DOM字符串
    source = '<?xml version = "1.0" standalone = "no"?>\r\n' + source;
    var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
    var width = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('width'));
    var height = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('height'));
    if(type == 2){
        var rotate = "scale(" + rotateArr[1] + "," + rotateArr[2] + ")";
        var css = {
            'transform': rotate,
            '-ms-transform': rotate, /* IE 9 */
            '-moz-transform': rotate, /* Firefox */
            '-webkit-transform': rotate, /* Safari 和 Chrome */
            '-o-transform': rotate,
            'background': 'rgb(255, 255, 255,0)',
        };
        $(isIE('image_iframe')).find("#label_main_hb #svg_now").css(css);

        width = parseFloat($(isIE('image_iframe')).find('#freeRotate #rselect_style').css('width'));
        height = parseFloat($(isIE('image_iframe')).find('#freeRotate #rselect_style').css('height'));
    }
    canvas.width = width;
    canvas.height = height;
    imghandle.svg.width = width;
    imghandle.svg.height = height;
    var context = canvas.getContext("2d");
    var image = new Image;
    image.src = url;
    image.crossOrigin = '';
    image.onload = function () {
        context.drawImage(image, 0, 0);
        var base64 = canvas.toDataURL("image/png", 1);
        imghandle.svg.url = base64;
        const viewBox ='0,0,'+width+','+height;
        // 重置svg
        var html ='<svg id="svg_now" xl="1" xb="1" style="background: rgba(255, 255, 255,0); border-radius: 0px; transform: scale(1, 1); transform-origin: 50% 50% 0px;" height="'+height+'" width="'+width+'" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="'+viewBox+'">\n' +
                '                        <defs>\n' +
                '                        <pattern id="pattern-image" x="0" y="0" width="50" height="50"\n' +
                '                                 patternUnits="userSpaceOnUse">\n' +
                '                            <image xlink:href="" x="0" y="0"\n' +
                '                                   width="50"\n' +
                '                                   height="50"></image>\n' +
                '                        </pattern>\n' +
                '                        <clipPath id="c-two-grap">\n' +
                '                            <rect x="0" y="0" width="50" height="50" />\n' +
                '                        </clipPath>\n' +
                '                    </defs>\n' +
                '                    <image transform="rotate(0,0,0)" clip-path="" x="0" y="0" id="ytimg" filter="" class_id="img_bj" width="'+width+'"\n' +
                '                           height="'+height+'" preserveAspectRatio="none"\n' +
                '                           xlink:href="'+base64+'" fill-rule="inherit"></image>\n' +
                '                    <line style="border-right: 10px solid red;" x1="0" x2="319" y1="0" y2="0"></line>\n' +
                '                    <rect style="transform: rotate(10deg);transform-origin: 50% 50% 0;" class_id="img_bj" x="0"\n' +
                '                          y="0" width="0" height="0" fill="" fill-opacity="1"/>\n' +
                '                    <line id="line-top" x1="0" y1="0" x2="319" y2="0" style="stroke:#25AAD6;stroke-width:0;stroke-dasharray"/>\n' +
                '                    <line id="line-left" x1="0" y1="0" x2="0" y2="213"\n' +
                '                          style="stroke:#25AAD6;stroke-width:0;stroke-dasharray"/>\n' +
                '                    <line id="line-right" x1="0" y1="213" x2="319" y2="213"\n' +
                '                          style="stroke:#25AAD6;stroke-width:0;stroke-dasharray" />\n' +
                '                    <line id="line-bottom" x1="319" y1="0" x2="319" y2="213" style="stroke:#25AAD6;stroke-width:0;stroke-dasharray"/></svg>';
        $(isIE('image_iframe')).find('#label_main_hb #svg_div').empty().append(html);
        $(isIE('image_iframe')).find('#label_main_hb').attr('width',width);
        $(isIE('image_iframe')).find('#label_main_hb').attr('height',height);
        $(isIE('image_iframe')).find('#label_main_hb').css('width',width);
        $(isIE('image_iframe')).find('#label_main_hb').css('height',height);
        $(isIE('image_iframe')).find("#uploader ul.material .women img").attr('src',base64);
        $(isIE('image_iframe')).find("#uploader ul.material .women img").attr('oldwidth',width);
        $(isIE('image_iframe')).find("#uploader ul.material .women img").attr('oldheight',height);
        $(isIE('image_iframe')).find("#uploader ul.material .women img").attr('size',saveBaseSize(base64));
        $(isIE('image_iframe')).find("#label_main_hb").css('background','');
        imghandle.handleimg = '';
        if(ispl==0){
            $('#topImgGun').css('width','0%');
            reStroCs(lay_error,types);
            layer.closeAll();
            layer.msg("处理完成");
            showNowHandleIng(3);
            isMoreHandleImg = 0;
        }else{
            showNowHandleIng(2);
        }
        imghandle.svg.svg = $(isIE('image_iframe')).find('#label_main_hb #svg_now').prop('outerHTML');
        /* 图片修改后隐藏显示框*/
        $(isIE('image_iframe')).find('#uploader .filelist').hide();
        $(isIE('image_iframe')).find('#uploader .material').show();
        $(isIE('image_iframe')).find('.statusBar .info p').html('');
        $(isIE('image_iframe')).find('.statusBar .info a').remove();
        var isele = $("#imgRight dl dt[lay-id='imgCropDt']").attr('class');
        if(isele=='selected'){
            intCropImg();
        }
        // 处理完成恢复居中
        $(isIE('image_iframe')).find(".t-stage-tool div[placement='zoom_sf']").click();
        // return false;
    };
    isMoreHandleImg = 0
};
// 修改过文件后处理
function changeImg() {
    imghandle.isChange=1;
    $(isIE('image_iframe')).find('#isUpload').attr('lay-qiqan','1');
    return false;
}
/*计算图片大小*/
function saveBaseSize(dataURL) {
    var strLen = dataURL.length;
    var fileSize = strLen-(strLen/8)*2;
    return fileSize;
}
// 初始化编辑框
function _initializeo(now_width,now_height){
// 当前编辑框
    $(isIE('image_iframe')).find('#label_main_hb').attr('width',now_width);
    $(isIE('image_iframe')).find('#label_main_hb').attr('height',now_height);

    // 可操作距离宽高
    var width = parseFloat($(isIE('image_iframe')).find('.label_main_div').width());
    var height = parseFloat($(isIE('image_iframe')).find('.label_main_div').height())-40;
    // 图片放入操作框缩放后宽高
    var cw = parseFloat(now_width);
    var ch = parseFloat(now_height);
    var bl = 0;
    // 判断用户设置的宽高是否查过当前视图 900*750

    var m_w = width-100;
    var m_h = height-100;
    var bl = 1;

    if(cw>m_w||ch>m_h){
        // 超过适应
        if(cw>m_w&&ch<=m_h){
            bl = m_w/cw;
            ch = m_w*ch/cw;
            cw = m_w;
        }else if(cw<=m_w&&ch>m_h){
            bl = m_h/ch;
            cw = m_h*cw/ch;
            ch = m_h;
        }else{
            if(cw/ch>m_w/m_h){
                bl = m_w/cw;
                ch = m_w*ch/cw;
                cw = m_w;
            }else{
                bl = m_h/ch;
                cw = m_h*cw/ch;
                ch = m_h;
            }
        }
    }

    var left = (width - cw) / 2;
    var top = (height - ch) / 2;
    var css = {
        'transform':'scale('+bl+')',
        'top': top+'px',
        'left': left+'px',
    }
    $('#label_main_hb').css(css);
    $('#label_main_hb').attr('scale',bl);
    $('#label_main_hb').attr('oldscale',bl);

}
// 水印调节
function watermarkHandle(types,val) {
   var watermarkArr = imghandle.watermark;
    imghandle.handleimg = 'watermark'
        switch (types){
            case 'tmd'://透明度
                watermarkArr[0] = val;
                break;
            case 'dx'://大小
                watermarkArr[1] = val;
                break;
            case 'jj'://间距
                watermarkArr[2] = val;
                break;
            case 'jd'://角度
                watermarkArr[3] = val;
                break;
            case 'left'://rgb
                watermarkArr[5] = val;
                break;
            case 'top'://rgb
                watermarkArr[6] = val;
                break;
        }
        imghandle.watermark = watermarkArr;
        watermarkBalance();
}
// 水印调节
function watermarkBalance(classif='1') {
    // (0 色相,0 红,0 绿,0 蓝)
    var watermarkArr = imghandle.watermark;
    // 透明度
    var tmd = parseInt(watermarkArr[0]);
    // 获取图片原始x y
    var width = parseFloat($(isIE('image_iframe')).find("#label_main_hb").attr('width'));
    var height = parseFloat($(isIE('image_iframe')).find("#label_main_hb").attr('height'));
    // 大小
    var dx = parseInt(watermarkArr[1]);
    // 角度
    var jd = parseInt(watermarkArr[3]);
    // 距离
    var jj = parseInt(watermarkArr[2]);
    // 左右距离
    var jjleft = parseInt(watermarkArr[5]);
    // 上下距离
    var jjtop = parseInt(watermarkArr[6]);
    var val = $('#tab_shuiyin').attr('value');
    var obj={};
    if(val == '1'){//文字
        var text = document.getElementById('shuiyin_text').value;
        // 获取文字宽高·
        var shuiyinwidth = parseFloat($(isIE('image_iframe')).find('#text_span').width());
        var shuiyinheight = parseFloat($(isIE('image_iframe')).find('#text_span').height());
        var objdx = {};
        objdx.w =shuiyinwidth;
        objdx.h =shuiyinheight;
        watermarkArr[7] = 1;
        if(text!='水印文字'){
            imghandle.handleimg='watermark';
        }else{
            imghandle.handleimg='';
        }
    }else{//图片
        var shuiyinbl = parseFloat(dx/100).toFixed(2);
        var shuiyinimg = $('.js_logoBox').attr('src');
        var shuiyinwidth = $('.js_logoBox').attr('width');
        var shuiyinheight = $('.js_logoBox').attr('height');
        var objdx = {};
        objdx.w = parseFloat(shuiyinwidth)*shuiyinbl;
        objdx.h = parseFloat(shuiyinheight)*shuiyinbl;
        obj.src = shuiyinimg;
        obj.width = shuiyinwidth;
        obj.height = shuiyinheight;
        watermarkArr[7] = 0;
        obj.text = '';
        obj.font_family = '';
        obj.font_color = '';
        obj.font_size = '';
    }
    var from_shuiyin_fx = $('#from_shuiyin_fx').attr('value') || 'northwest'; //文字水印位置 或者铺满 默认左上
    var objectBoundingBox = 'objectBoundingBox';
    // 间距
    var objdxs = imgdbl(shuiyinwidth,shuiyinheight,jj,jj);//60 22 0 0
    var jwidth ="1.0";
    var jheight = "1.0";
    var dxwidth = objdx.w;
    var dxheight = objdx.h;
    var pmleft = 0;
    var pmtop = 0;
    var ispm = 0,left=0,top=0;
    // 水印位置
    switch (from_shuiyin_fx){
        case 'northwest'://左上
           left = 10+objdxs.w+jjleft;
           top = 10+objdxs.h+jjtop;
            $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").css('transform-origin','0% 0% 0px');
            break;
        case 'north'://顶部
           left = (width-dxwidth)/2+jjleft;
            top = 10+objdxs.h+jjtop;
            $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").css('transform-origin','50% 0% 0px');
            break;
        case 'northeast'://右上
            left = (width-dxwidth-10)-objdxs.w+jjleft;
            top = 10+objdxs.h+jjtop;
            $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").css('transform-origin','100% 0% 0px');
            break;
        case 'west'://左侧
            left = 10+objdxs.w+jjleft;
            top = (height-dxheight)/2-10+jjtop;
            $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").css('transform-origin','0% 50% 0px');
            break;
        case 'east'://右侧
            left = (width-dxwidth-10)-objdxs.w+jjleft;
           top = (height-dxheight)/2-10+jjtop;
            $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").css('transform-origin','100% 50% 0px');
            break;
        case 'southwest'://左下
            left = 10+objdxs.w+jjleft;
            top = height-dxheight-10-objdxs.h+jjtop;
            $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").css('transform-origin','100% 0% 0px');
            break;
        case 'south'://底部
            left = (width-dxwidth)/2+jjleft;
            top = height-dxheight-10-objdxs.h+jjtop;
            $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").css('transform-origin','50% 100% 0px');
            break;
        case 'southeast'://右下
            left = (width-dxwidth-10)-objdxs.w+jjleft;
            top = (height-dxheight-10)-objdxs.h+jjtop;
            $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").css('transform-origin','100% 100% 0px');
            break;
        case 'selected'://正中
            left = (width-dxwidth)/2+jjleft;
            top = (height-dxheight)/2+jjtop;
            $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").css('transform-origin','50% 50% 0px');
            break;
        default://铺满
            pmleft = jjleft;
            pmtop = jjtop;
            // 三角函数 求斜边长度 向上取整数
            dxwidth=dxheight=hypotenuseLength(parseFloat(width),parseFloat(height));
            left = -(dxwidth-width)/2;
            top = -(dxwidth-height)/2;
            ispm = 1;
            jwidth =objdx.w+objdxs.w;
            jheight = objdx.h+objdxs.h;
            objectBoundingBox = 'userSpaceOnUse';
            $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").css('transform','');
            $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").attr('transform','rotate('+jd+',0,0)');
            break;
    }
    if(classif=='0'){
        dxwidth = 0;
        dxheight = 0;
        isMoreHandleImg = 0
    }
    tmd = tmd/100;
    $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").attr('x',left);
    $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").attr('y',top);
    $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").attr('width',dxwidth);
    $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").attr('height',dxheight);
    $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").attr('fill',"url(#pattern-image)");
    $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").attr('fill-opacity',tmd);
    if(ispm === 0){
        $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").attr('transform','');
        $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now rect").css('transform','rotate('+jd+'deg)');
    }
    $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now defs #pattern-image").remove();
    var html = $(isIE('image_iframe')).find("#label_main_hb  #svg_div #svg_now defs filter").prop('outerHTML');
    // 字体
    if(val == '1'){
        var font_family = $('#from_shuiyin_font_family').attr('value');
        var font_color = $('#shuiyinColor').attr('value');
        var font_size = $(isIE('image_iframe')).find('#text_span').attr('value');
        obj.text = text;
        obj.font_family = font_family;
        obj.font_color = font_color;
        obj.font_size = font_size;
        obj.src = '';
        obj.width = '';
        obj.height = '';
        html += '<pattern id="pattern-image" x="'+pmleft+'" y="'+pmtop+'" width="'+jwidth+'" height="'+jheight+'"\n' +
                '                                 patternUnits="'+objectBoundingBox+'">\n' +
                '                            <text font-family="'+font_family+'" letter-spacing="0px" dominant-baseline="text-before-edge" x="0" y="0" color="" fill="'+font_color+'" font-size="'+font_size+'">'+text+'</text>\n' +
                '                        </pattern>';
    }else{
        html += '<pattern id="pattern-image" x="'+pmleft+'" y="'+pmtop+'" width="'+jwidth+'" height="'+jheight+'"\n' +
                '                                 patternUnits="'+objectBoundingBox+'">\n' +
                '                            <image xlink:href="'+shuiyinimg+'" x="0" y="0" width="'+objdx.w+'" height="'+objdx.h+'"></image>\n' +
                '                        </pattern>';
    }
    imghandle.watermark = watermarkArr;
    imghandle.watermarkcs = obj;
    // 更新状态
    $(isIE('image_iframe')).find("#label_main_hb #svg_div #svg_now defs").html(html);
}
// 图片旋转操作
function imgRotateCan(classtype,val) {
// 获取当前编辑的图片id
    var rotate = imghandle.rotate;
    var rotateArr = rotate.split(",");
    switch (classtype){
        case 'leftR'://向左旋转
            rotateArr[0] = 360+parseFloat(rotateArr[0])-90;
            if(rotateArr[0]>=360){
                rotateArr[0] = rotateArr[0]%360;
            }
            break;
        case 'rightR'://向右旋转
            rotateArr[0] = parseFloat(rotateArr[0])+90;
            if(rotateArr[0]>=360){
                rotateArr[0] = rotateArr[0]%360;
            }
            break;
        case 'leftF'://左右翻转
            rotateArr[1] = -parseFloat(rotateArr[1]);
            break;
        case 'topF'://上下翻转
            rotateArr[2] = -parseFloat(rotateArr[2]);
            break;
        case 'ry'://自由旋转
            // 图片任意旋转
            if(val == 0){
                $(isIE('image_iframe')).find('#freeRotate').hide();
                $('#xuanzhuangBjColor').hide();
                $(isIE('image_iframe')).find("#label_main_hb #svg_now").css('background','rgba(255,255,255,0)');
            }else{
                $(isIE('image_iframe')).find('#freeRotate').show();
                $('#xuanzhuangBjColor').show();
                $(isIE('image_iframe')).find("#label_main_hb #svg_now").css('background',imghandle.bjcolor);
            }
            rotateArr[3] = val;
            break;
        case 'bjcolor':/*背景颜色*/
            imghandle.bjcolor = val;
            break;
    }
    rotate = rotateArr.join(",");
    imghandle.rotate = rotate;
    var basesrc = $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('xlink:href');
    if(basesrc){
        imgRotate();
    }

}
var oldp=[];
// 图片旋转
function imgRotate(sta=1) {
    var rotate = imghandle.rotate;
    if(rotate!='0,1,1,0'){
        imghandle.handleimg='tupianxuanzhuan';
    }
    var rotateArr = rotate.split(",");
    var rotates = parseFloat(rotateArr[0])+parseFloat(rotateArr[3]);
    if(rotates>=360){
        rotates = rotates%360;
    }
    var oldwidth = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('width'));
    var oldheight = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('height'));

    let stas = 1;
    var oldval = parseFloat($(isIE('image_iframe')).find('#freeRotate').css('width'));
    var x= oldwidth/2;
    var y= oldheight/2;
    var now_x_width = oldwidth;
    var now_x_height = oldheight;
    var isc = 1;
    var x1=y1=x2=y2=x_left=x_top=0;
    x=y=oldval/2;

    x1 = (oldval-oldwidth)/2;
    y1 = (oldval-oldheight)/2;
    let bjcolor = 'rgba(255,255,255,0)';
    if(rotates == 90||rotates == 270){
        now_x_width = oldheight;
        now_x_height = oldwidth;
    }else if(rotates!=0 && rotates!=180){
        now_x_width =now_x_height= oldval;
        stas=2;
        bjcolor = imghandle.bjcolor;
    }

    x_left = (oldval-now_x_width)/2;
    x_top = (oldval-now_x_height)/2;
// 原始
    let hobj = {
        'width':now_x_width,
        'height':now_x_height,
        'top':x_top,
        'left':x_left,
    };
    var viewBox = '0,0,' + oldval + ',' + oldval;
    if(sta == 0){
        $(isIE('image_iframe')).find('#label_main_hb').attr('width',oldwidth);
        $(isIE('image_iframe')).find('#label_main_hb').attr('height',oldheight);
        var cssh = {
            'width':oldwidth,
            'height':oldheight
        };
        $(isIE('image_iframe')).find('#label_main_hb').css(cssh);
        viewBox = '0,0,' + oldwidth + ',' + oldheight;
        stas = 2;
        x1 = y1 =0;
        $(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('width',oldwidth);
        $(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('height',oldheight);
    }else{
        $(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('width',oldval);
        $(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('height',oldval);
    }

    hfcs(stas,hobj);

    $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('x',x1);
    $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('y',y1);
    document.getElementById('image_iframe').contentWindow.document.querySelector('#label_main_hb #svg_now').setAttribute("viewBox", viewBox);
    var transform="rotate("+rotates+","+x+","+y+")";
    $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('transform',transform);

    // var rotate ="rotate("+rotates+"deg)"+" scale("+rotateArr[1]+","+rotateArr[2]+")";
    var rotate ="scale("+rotateArr[1]+","+rotateArr[2]+")";
    var css ={
        'transform':rotate,
        '-ms-transform':rotate, 	/* IE 9 */
        '-moz-transform':rotate, 	/* Firefox */
        '-webkit-transform':rotate, /* Safari 和 Chrome */
        '-o-transform':rotate,
        'transform-origin':'50% 50% 0px',
        '-ms-transform-origin':'50% 50% 0px', 	/* IE 9 */
        '-moz-transform-origin':'50% 50% 0px', 	/* Firefox */
        '-webkit-transform-origin':'50% 50% 0px', /* Safari 和 Chrome */
        '-o-transform-origin':'50% 50% 0px',
        'background':bjcolor,
    };

    $(isIE('image_iframe')).find("#label_main_hb #svg_now").css(css);
    return false;

}
/*sta
* 1:不是任意旋转
* 2：是任意旋转
* */
function hfcs(sta=1,hobj) {
    var css = '';
    if(sta==1){
        css = {
            'width':hobj.width+'px',
            'height':hobj.height+'px',
            'left':hobj.left+'px',
            'top':hobj.top+'px',
        };
    }else{
        if(!isEmptyObject(oldp)){
            css = {
                'width':oldp.width+'px',
                'height':oldp.height+'px',
                'left':oldp.left+'px',
                'top':oldp.top+'px',
            };
        }
    }
    if(css!=''){
        $(isIE('image_iframe')).find('#freeRotate #rselect_style').css(css);
    }




}
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0;
}
// 图片修改尺寸
function imgSize(types,val) {
    let now_id = $(isIE('image_iframe')).find('#label_right_div').attr('lay-imgid');
    var imgsize = imghandle.imgsize;
    var imgsizeArr = imgsize.split(",");
    switch (types){
        case 'isimg'://是否允许变形2：不允许 1：允许
            imgsizeArr[0] = val;
            break;
        case 'classif'://尺寸类型
            imgsizeArr[1] = val;
            break;
        case 'width'://上边边框宽度
            imgsizeArr[6] = 'width';
            if(imgsizeArr[1].indexOf("set") >= 0){/*自定义*/
                if(val==''||val==0){
                    imgsizeArr[2] = '-1';
                }else{
                    imgsizeArr[2] = val;
                }
                let heightold = document.getElementById('yasuo_height_size').value;
                if(heightold==''){
                    imgsizeArr[3] = '-1';/*原比例*/
                }
            }else{
                if(imgsizeArr[0] == '2'){
                    imgsizeArr[2] = parseFloat(val);
                    imgsizeArr[3] = parseInt(parseFloat(imgsizeArr[2])*parseFloat(imgsizeArr[5])/parseFloat(imgsizeArr[4]));
                }else{
                    imgsizeArr[2] = val;
                }
            }
            break;
        case 'height'://下边边框宽度
            imgsizeArr[6] = 'height';
            if(imgsizeArr[1].indexOf("set") >= 0){/*自定义*/
                if(val==''||val==0){
                    imgsizeArr[3] = '-1';
                }else{
                    imgsizeArr[3] = val;
                }

                let widthold = document.getElementById('yasuo_width_size').value;
                if(widthold==''){
                    imgsizeArr[2] = '-1';/*原比例*/
                }
            }else{
                if(imgsizeArr[0] == '2'){
                    imgsizeArr[3] = parseFloat(val);
                    imgsizeArr[2] = parseInt(parseFloat(imgsizeArr[3])*parseFloat(imgsizeArr[4])/parseFloat(imgsizeArr[5]));
                }else{
                    imgsizeArr[3] = val;
                }
            }

            break;
    }
    imgsize = imgsizeArr.join(",");
    imghandle.imgsize = imgsize;
    var basesrc = $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('xlink:href');
    if(basesrc){
        imgSizeHandle(now_id,types);
    }

}
function imgSizeHandle(types='',stass='1') {
    var imgsize = imghandle.imgsize;
    var imgsizeArr = imgsize.split(",");
    if(imgsizeArr[0]!='2'&&imgsizeArr[2]!=imgsizeArr[4]&&imgsizeArr[3]!=imgsizeArr[5]&&stass!='0'){
        imghandle.handleimg='xiugaicicun';
    }
    // 裁剪后尺寸
    var imagecs = imghandle.imagecs;
    var imagecsArr = imagecs.split(",");
    var now_s_width = imgsizeArr[2],now_s_height = imgsizeArr[3];
    var oldwidth = parseFloat(imgsizeArr[4]);
    var oldheight = parseFloat(imgsizeArr[5]);

    if(stass=='0'){/*取消编辑*/
        imgsizeArr[0] = '2';
        imgsizeArr[1] = 'set';
        imgsizeArr[2] = imgsizeArr[4];
        imgsizeArr[3] = imgsizeArr[5];
    }
    var x_width = 0;
    var y_height = 0;
    var type_id = 2;
    let w_iskong = 2,h_iskong = 2;
    $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('x',0);
    $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('y',0);
    if (imgsizeArr[1].indexOf("1024") >= 0) {//保持电脑尺寸
        imgsizeArr[2] = 1024;
        if(imgsizeArr[0] == '2'){//不允许变形
            imgsizeArr[3] = parseInt(imgsizeArr[2]*oldheight/oldwidth);
        }else{
            imgsizeArr[3] = oldheight;
        }
    }else if(imgsizeArr[1].indexOf("480") >= 0){//适合手机
        imgsizeArr[2] = 480;
        if(imgsizeArr[0] == '2'){//不允许变形
            imgsizeArr[3] = parseInt(imgsizeArr[2]*oldheight/oldwidth);
        }else{
            imgsizeArr[3] = oldheight;
        }
    }else if(imgsizeArr[1].indexOf("200") >= 0){//适合微信表情
        imgsizeArr[2] = 200;
        if(imgsizeArr[0] == '2'){//不允许变形
            imgsizeArr[3] = parseInt(imgsizeArr[2]*oldheight/oldwidth);
        }else{
            imgsizeArr[3] = oldheight;
        }
    }else if(imgsizeArr[1].indexOf("140") >= 0){//适合微信表情尺寸
        imgsizeArr[2] = 140;
        if(imgsizeArr[0] == '2'){//不允许变形
            imgsizeArr[3] = parseInt(imgsizeArr[2]*oldheight/oldwidth);
        }else{
            imgsizeArr[3] = oldheight;
        }
    }else if(imgsizeArr[1].indexOf("295") >= 0){//1寸
        if(imgsizeArr[0] == '2'){//不允许变形

            if(oldwidth/oldheight<295/413){
                var width = 295;
                var height = parseInt(295*oldheight/oldwidth);
                var x = 0;
                var y = -(height-413)/2;

                $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('y',y);
                $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('x',0);
            }else{
                var width = parseInt(413*oldwidth/oldheight);
                var height = 413;
                var x = -(width-295)/2;
                var y = 0;
                $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('x',x);
                $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('y',0);
            }
            x_width = 295;
            y_height = 413;
            type_id = 1;
            // $(isIE('image_iframe')).find("#label_main_hb svg defs #c-two-grap rect").attr('x',x);
            // $(isIE('image_iframe')).find("#label_main_hb svg defs #c-two-grap rect").attr('y',y);
            // $(isIE('image_iframe')).find("#label_main_hb svg defs #c-two-grap rect").attr('width',295);
            // $(isIE('image_iframe')).find("#label_main_hb svg defs #c-two-grap rect").attr('height',413);
            // $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('clip-path','url(#c-two-grap)');
            imgsizeArr[2] = width;
            imgsizeArr[3] = height;
        }else{
            imgsizeArr[2] = 295;
            imgsizeArr[3] = 413;
        }
        // 需要做居中裁剪
    }else if(imgsizeArr[1].indexOf("413") >= 0){//2寸
        if(imgsizeArr[0] == '2'){//不允许变形
            if(oldwidth/oldheight<413/626){
                var width = 413;
                var height = parseInt(413*oldheight/oldwidth);
                var x = 0;
                var y = -(height-626)/2;
                $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('y',y);
                $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('x',0);
            }else{
                var width = parseInt(626*oldwidth/oldheight);
                var height = 626;
                var x = -(width-413)/2;
                var y = 0;
                $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('x',x);
                $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('y',0);
            }
            x_width = 413;
            y_height = 626;
            type_id = 1;
            // $(isIE('image_iframe')).find("#label_main_hb svg defs #c-two-grap rect").attr('x',x);
            // $(isIE('image_iframe')).find("#label_main_hb svg defs #c-two-grap rect").attr('y',y);
            // $(isIE('image_iframe')).find("#label_main_hb svg defs #c-two-grap rect").attr('width',295);
            // $(isIE('image_iframe')).find("#label_main_hb svg defs #c-two-grap rect").attr('height',413);
            // $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('clip-path','url(#c-two-grap)');
            imgsizeArr[2] = width;
            imgsizeArr[3] = height;


        }else{
            imgsizeArr[2] = 413;
            imgsizeArr[3] = 626;
            $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('x',x);
        }
        // 需要做居中裁剪
    }else if(imgsizeArr[1].indexOf("set") >= 0){/*自定义裁剪*/
        var now_width = oldwidth;
        var now_height = oldheight;

        if(imgsizeArr[0] == '1'){/*允许变形进行裁剪*/

            if(imgsizeArr[2]=='-1'&&imgsizeArr[3]=='-1'){
                imgsizeArr[2] = oldwidth;
                imgsizeArr[3] = oldheight;
                w_iskong=h_iskong=1;
            }else{
                if(imgsizeArr[2] == '-1'){
                    imgsizeArr[2] = oldwidth;
                    w_iskong=1;
                }
                if(imgsizeArr[3] == '-1'){
                    imgsizeArr[3] = oldheight;
                    h_iskong=1;
                }
            }

        }else{/*不允许变形*/
            if(imgsizeArr[2]=='-1'&&imgsizeArr[3]=='-1'){
                imgsizeArr[2] = oldwidth;
                imgsizeArr[3] = oldheight;
                w_iskong=h_iskong=1;
            }else{
                if(imgsizeArr[2] == '-1'){
                    w_iskong=1;
                    imgsizeArr[2] = parseInt(parseFloat(imgsizeArr[3])*parseFloat(imgsizeArr[4])/parseFloat(imgsizeArr[5]));
                }
                if(imgsizeArr[3] == '-1'){
                    h_iskong=1;
                    imgsizeArr[3] = parseInt(parseFloat(imgsizeArr[2])*parseFloat(imgsizeArr[5])/parseFloat(imgsizeArr[4]));
                }
            }
        }

        if(parseFloat(imgsizeArr[2])>oldwidth||parseFloat(imgsizeArr[3])>oldheight){
            if(parseFloat(imgsizeArr[2])/parseFloat(imgsizeArr[3])>oldwidth/oldheight){
                now_height= parseInt(imgsizeArr[2]*oldheight/oldwidth);
                now_width = imgsizeArr[2];
            }else{
                now_width = parseInt(imgsizeArr[3]*oldwidth/oldheight);
                now_height = imgsizeArr[3];
            }
        }

        if(imgsizeArr[0] == '1'){/*允许变形进行裁剪*/

        }else{/*不允许变形*/
            type_id = 3;
            imgx = -(parseFloat(now_width)-parseFloat(imgsizeArr[2]))/2;
            imgy = -(parseFloat(now_height)-parseFloat(imgsizeArr[3]))/2;
        }
    }
    var width = parseFloat(imgsizeArr[2]);
    var height = parseFloat(imgsizeArr[3]);
    if(isNaN(width)){
        width = 0;
    }
    if(isNaN(height)){
        height = 0;
    }

    $(isIE('image_iframe')).find("#label_main_hb").attr('width',width);
    $(isIE('image_iframe')).find("#label_main_hb").attr('height',height);

    var imgsize = imghandle.imgsize;
    var imgsizeArr = imgsize.split(",");
    var now_s1_w =width,now_s1_h=height;
    if(type_id == 1){
        now_s1_w =x_width;
        now_s1_h=y_height;
    }else if(type_id == 3){
        $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('x',imgx);
        $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('y',imgy);
    }
    $(isIE('image_iframe')).find("#label_main_hb #svg_now").attr('width',width);
    $(isIE('image_iframe')).find("#label_main_hb #svg_now").attr('height',height);
    if(w_iskong==1){
        document.getElementById('yasuo_width_size').value='';
        imgsizeArr[2] = '-1';
        imagecsArr[2]='-1';
    }else{
        document.getElementById('yasuo_width_size').value=now_s1_w;
        imgsizeArr[2] = now_s1_w;
        imagecsArr[2]=now_s1_w;
    }

    if(h_iskong==1){
        document.getElementById('yasuo_height_size').value='';
        imgsizeArr[3] = '-1';
        imagecsArr[3]='-1';
    }else{
        document.getElementById('yasuo_height_size').value=now_s1_h;
        imgsizeArr[3] = now_s1_h;
        imagecsArr[3]=now_s1_h;
    }
    var viewBox = '0,0,' + now_s1_w + ',' + now_s1_h;


    imagecsArr[0]=$(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('x');
    imagecsArr[1]=$(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('y');

    imghandle.imagecs = imagecsArr.join(",");
    imghandle.imgsize = imgsizeArr.join(",");
    document.getElementById('image_iframe').contentWindow.document.querySelector('#label_main_hb #svg_now').setAttribute("viewBox", viewBox);
    if(type_id == 3){
        $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('width',now_width);
        $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('height',now_height);
    }else{
        $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('width',width);
        $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('height',height);
    }

    __initialize(width,height);
}
// 图片裁剪
function imgCrop(types,val) {
    var imgcrop = imghandle.imgcrop;
    var imgcropArr = imgcrop.split(",");
    switch (types){
        case 'bordertl'://左上圆角
            if(val == ''){
                val = 0;
            }
            imgcropArr[4] = val;
            break;
        case 'bordertr'://右上圆角
            if(val == ''){
                val = 0;
            }
            imgcropArr[5] = val;
            break;
        case 'borderbl'://左下圆角
            if(val == ''){
                val = 0;
            }
            imgcropArr[6] = val;
            break;
        case 'borderbr'://右下圆角
            if(val == ''){
                val = 0;
            }
            imgcropArr[7] = val;
            break;
        case 'borderbf'://圆角百分比
            //"0,0,0,1,0,0,0,0,0,0"+oldwidth+","+oldheight;//图片裁剪  裁剪类型，x1 x2 锁定裁剪比例 圆角百分比 四个圆角 图片裁剪比例 图片原始宽高
            const oldwidth = parseFloat(imgcropArr[10]);
            const oldheight = parseFloat(imgcropArr[11]);
            var yjval = 0;
            if(oldwidth>oldheight){
                yjval = parseInt(oldheight*val/200);
            }else{
                yjval = parseInt(oldwidth*val/200);
            }
            imgcropArr[4]=imgcropArr[5]=imgcropArr[6]=imgcropArr[7]=yjval;
            document.getElementById('yasuo_bottom_right_border').value=yjval;
            document.getElementById('yasuo_bottom_left_border').value=yjval;
            document.getElementById('yasuo_top_right_border').value=yjval;
            document.getElementById('yasuo_top_left_border').value=yjval;

            break;
        case 'yuanjiaocolor'://圆角颜色
            imgcropArr[12] = val;
            break;
        case 'istouming'://是否透明
            imgcropArr[13] = val;
            break;
    }
    imgcrop = imgcropArr.join(",");
    imghandle.imgcrop = imgcrop;
    var basesrc = $(isIE('image_iframe')).find("#label_main_hb svg #ytimg").attr('xlink:href');
    if(basesrc){
        imgCropHandle();
    }

}
function imgCropHandle() {
    var imgcrop = imghandle.imgcrop;
    var imgcropArr = imgcrop.split(",");
    if(imgcropArr[4]==0&&imgcropArr[5]==0&&imgcropArr[6]==0&&imgcropArr[7]==0){
        $('#yuanjiaoBjColor').hide();
        imgcropArr[12] = 'rgba(0,0,0,.5)';
    }else{
        if(imgcropArr[13] == '1'){
            imgcropArr[12] = 'rgba(0,0,0,0.5)';
            $('#imgYjColor').css('opacity','0');
        }else{
            $('#imgYjColor').css('opacity','1');
        }
        $('#yuanjiaoBjColor').show();
    }
    // 图片圆角
    var css ={
        'border-top-left-radius':imgcropArr[4]+'px',
        'border-top-right-radius':imgcropArr[5]+'px',
        'border-bottom-left-radius':imgcropArr[6]+'px',
        'border-bottom-right-radius':imgcropArr[7]+'px',
    };
    $(isIE('image_iframe')).find("#label_main_hb #imgCjk #select_style").css('background-color',imgcropArr[12]);
    $(isIE('image_iframe')).find("#label_main_hb #imgCjk .e-border").css(css);
}
// 图片居中显示
function __initialize(now_width,now_height) {
    // 可操作距离宽高
    let width = parseFloat($(isIE('image_iframe')).find('.label_main_div').width());
    let height = parseFloat($(isIE('image_iframe')).find('.label_main_div').height())-40;
    // 图片放入操作框缩放后宽高
    let cw = parseFloat(now_width);
    let ch = parseFloat(now_height);
    // 判断用户设置的宽高是否查过当前视图 900*750
    let m_w = width-100;
    let m_h = height-100;
    let bl = 1;

    if(cw>m_w||ch>m_h){
        // 超过适应
        if(cw>m_w&&ch<=m_h){
            bl = m_w/cw;
            ch = m_w*ch/cw;
            cw = m_w;
        }else if(cw<=m_w&&ch>m_h){
            bl = m_h/ch;
            cw = m_h*cw/ch;
            ch = m_h;
        }else{
            if(cw/ch>m_w/m_h){
                bl = m_w/cw;
                ch = m_w*ch/cw;
                cw = m_w;
            }else{
                bl = m_h/ch;
                cw = m_h*cw/ch;
                ch = m_h;
            }
        }
    }

    let left = (width - cw) / 2;
    let top = (height - ch) / 2;
    let css = {
        'transform':'scale('+bl+')',
        'top': top+'px',
        'left': left+'px',
        'width': now_width+'px',
        'height': now_height+'px',
        'transform-origin': '0% 0% 0px'
    };
    $(isIE('image_iframe')).find('#label_main_hb').css(css);
    $(isIE('image_iframe')).find('#label_main_hb').attr('scale',bl);
    $(isIE('image_iframe')).find('#label_main_hb').attr('oldscale',bl);

    // // 图片居中
    // let img_lef = (now_width-parseFloat($(isIE('image_iframe')).find('#label_main_hb svg #ytimg').attr('width')))/2;
    // let img_top = (now_height-parseFloat($(isIE('image_iframe')).find('#label_main_hb svg #ytimg').attr('height')))/2;
    // $(isIE('image_iframe')).find('#label_main_hb svg #ytimg').attr('x',img_lef);
    // $(isIE('image_iframe')).find('#label_main_hb svg #ytimg').attr('y',img_top);
    rotateSuoFangBli();
}
// 旋转底图居中显示
function __initializeDt(cw,ch) {

    var css = {
        'top': 0+'px',
        'left': 0+'px',
        'width': cw+'px',
        'height': ch+'px',
    };
    $(isIE('image_iframe')).find('#freeRotate').css(css);

    // 遮罩层
    var z_width = cw/3;
    var z_height = ch/3;
    var z_top = ch/3;
    var z_left = cw/3;
    var css = {
        'width':z_width+'px',
        'height':z_height+'px',
        'left':z_left+'px',
        'top':z_top+'px',
    };
    $(isIE('image_iframe')).find('#freeRotate #rselect_style').css(css);
    var cssi = {
        'width':z_width+'px',
        'height':z_height+'px',
        'x':z_left+'px',
        'y':z_top+'px',
    };
    $(isIE('image_iframe')).find('#freeRotate .t-guider #tGuider').css(cssi);
    $(isIE('image_iframe')).find('#freeRotate .t-guider #tGuiderRect').attr('width',cw);
    $(isIE('image_iframe')).find('#freeRotate .t-guider #tGuiderRect').attr('height',ch);
    oldp = {
        'width':z_width,
        'height':z_height,
        'left':z_left,
        'top':z_top,
    };
    imgRotate()
}
// 水印等比例
/*
 * 水印原始宽度width
 * 水印原始高度height
 * 设置后水印原始宽度w
 * 设置水印原始高度h*/
function imgdbl(width,height,w,h) {
    // 宽高 //60 22 0 0
    var now_w = 0;
    var now_h = 0;
    var w = parseFloat(w);
    var h = parseFloat(h);
    var width = parseFloat(width);
    var height = parseFloat(height);
    var bl = width/height;
    if(bl == 1){
        now_w = w;
        now_h = h;
    }else if(bl<1){//高度大于宽度
        now_h = h;
        now_w = (h * width / height).toFixed(3); //四舍五入三位
    }else{
        now_w = w;
        now_h = (w * height / width).toFixed(3);
    }
    var obj = {};
    obj.w = parseFloat(now_w);
    obj.h = parseFloat(now_h);
    return obj;
}
// 修改尺寸
function xiugaiImg(){

}
