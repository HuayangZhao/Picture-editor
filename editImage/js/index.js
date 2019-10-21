var kzArr=[];
var qjArr=[];
var imgkzArr = [];
var imgqjArr = [];
function imgretreat() {
    if (imgkzArr.length > 0) {
        const htmlsvg = [];
        $(isIE('image_iframe')).find('#label_right_div ul').each(function() {
            var lay_imgid = $(this).attr('id');
            var obj = {};
            var objsvg = {};
            objsvg.width = $(this).find('img').attr('oldwidth');
            objsvg.height = $(this).find('img').attr('oldheight');
            objsvg.ext = $(this).find('img').attr('oldext');
            objsvg.type = $(this).find('img').attr('oldtype');
            objsvg.svg = imghandle.svg.svg;
            objsvg.url = $(this).find('img').attr('src');
            obj.svg = objsvg;
            obj.isChange = imghandle.isChange;
            htmlsvg[lay_imgid] = obj
        });
        var strobj = {};
        strobj.index = imgqjArr.length;
        strobj.html = htmlsvg;
        imgqjArr.push(strobj);
        var length = imgkzArr.length;
        var html = imgkzArr[length - 1].html;
        imgkzArr.splice(length - 1, 1);
        hangdelImgcz(html)
    }
    imgshow()
}
function imgadvance() {
    if (JSON.stringify(imgqjArr) !== '[]') {
        const htmlsvg = [];
        $(isIE('image_iframe')).find('#label_right_div ul').each(function() {
            var lay_imgid = $(this).attr('id');
            var obj = {};
            var objsvg = {};
            objsvg.width = $(this).find('img').attr('oldwidth');
            objsvg.height = $(this).find('img').attr('oldheight');
            objsvg.ext = $(this).find('img').attr('oldext');
            objsvg.type = $(this).find('img').attr('oldtype');
            objsvg.svg = imghandle.svg.svg;
            objsvg.url = $(this).find('img').attr('src');
            obj.svg = objsvg;
            obj.isChange = imghandle.isChange;
            htmlsvg[lay_imgid] = obj
        });
        var strobj = {};
        strobj.index = imgqjArr.length;
        strobj.html = htmlsvg;
        imgkzArr.push(strobj);
        var length = imgqjArr.length;
        var html = imgqjArr[length - 1].html;
        imgqjArr.splice(length - 1, 1);
        hangdelImgcz(html)
    }
    imgshow()
}
function hangdelImgcz(html) {
    for (index in html) {
        imghandle.isChange = html[index].isChange;
        imghandle.svg.width = html[index].svg.width;
        imghandle.svg.height = html[index].svg.height;
        imghandle.svg.ext = html[index].svg.ext;
        imghandle.svg.type = html[index].svg.type;
        imghandle.svg.svg = html[index].svg.svg;
        imghandle.svg.url = html[index].svg.url;
        var pnow_id = index.replace('img', '');
        var now_width = html[index].svg.width;
        var now_height = html[index].svg.height;
        var url = html[index].svg.url;
        $(isIE('image_iframe')).find('#label_right_div ul#' + index + ' img').attr('oldwidth', now_width);
        $(isIE('image_iframe')).find('#label_right_div ul#' + index + ' img').attr('oldheight', now_height);
        $(isIE('image_iframe')).find('#label_right_div ul#' + index + ' img').attr('oldtype', html[index].svg.type);
        $(isIE('image_iframe')).find('#label_right_div ul#' + index + ' img').attr('oldext', html[index].svg.ext);
        $(isIE('image_iframe')).find('#label_right_div ul#' + index + ' img').attr('src', url);
        $(isIE('image_iframe')).find('#uploader ul.filelist li#' + pnow_id + ' img').attr('oldwidth', now_width);
        $(isIE('image_iframe')).find('#uploader ul.filelist li#' + pnow_id + ' img').attr('oldheight', now_height);
        $(isIE('image_iframe')).find('#uploader ul.filelist li#' + pnow_id + ' img').attr('src', url);
        $(isIE('image_iframe')).find('#uploader ul.material li#' + pnow_id + ' img').attr('oldwidth', now_width);
        $(isIE('image_iframe')).find('#uploader ul.material li#' + pnow_id + ' img').attr('oldheight', now_height);
        $(isIE('image_iframe')).find('#uploader ul.material li#' + pnow_id + ' img').attr('src', url);
        var old_id = $(isIE('image_iframe')).find('#label_right_div').attr('lay-imgid');
        if (index == old_id) {
            if (index) {
                $("#label_right_div #label_right_div_ul ul[id='" + index + "'] .editing").hide()
            }
            $(isIE('image_iframe')).find('#label_main_hb').attr('width', now_width);
            $(isIE('image_iframe')).find('#label_main_hb').attr('height', now_height);
            var viewBox = '0,0,' + now_width + ',' + now_height;
            document.getElementById('image_iframe').contentWindow.document.querySelector('#label_main_hb #svg_now').setAttribute("viewBox", viewBox);
            $(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('width', now_width);
            $(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('height', now_height);
            $(isIE('image_iframe')).find('#label_main_hb #svg_now').find('#ytimg').attr('xlink:href', url);
            $(isIE('image_iframe')).find('#label_main_hb #svg_now').find('#ytimg').attr('width', now_width);
            $(isIE('image_iframe')).find('#label_main_hb #svg_now').find('#ytimg').attr('height', now_height);
            $(isIE('image_iframe')).find("#label_right_div #label_right_div_ul ul[id='" + index + "'] .editing").show();
            const dis = $(isIE('image_iframe')).find('.label_main').css('display');
            if (dis != 'none') {
                initialize(now_width, now_height)
            }
        }
    }
}
function initialize(now_width, now_height) {
    var width = parseFloat($(isIE('image_iframe')).find('.label_main_div').width());
    var height = parseFloat($(isIE('image_iframe')).find('.label_main_div').height());
    var cw = parseFloat(now_width);
    var ch = parseFloat(now_height);
    var m_w = width - 100;
    var m_h = height - 100;
    var bl = 1;
    if (cw > m_w || ch > m_h) {
        if (cw > m_w && ch <= m_h) {
            bl = m_w / cw;
            ch = m_w * ch / cw;
            cw = m_w
        } else if (cw <= m_w && ch > m_h) {
            bl = m_h / ch;
            cw = m_h * cw / ch;
            ch = m_h
        } else {
            if (cw / ch > m_w / m_h) {
                bl = m_w / cw;
                ch = m_w * ch / cw;
                cw = m_w
            } else {
                bl = m_h / ch;
                cw = m_h * cw / ch;
                ch = m_h
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
    $(isIE('image_iframe')).find('#label_main_hb').css(css);
    $(isIE('image_iframe')).find('#label_main_hb').attr('scale', bl);
    $(isIE('image_iframe')).find('#label_main_hb').attr('oldscale', bl)
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
    }
    ;imgshow()
}
function imgreSet() {
    imgkzArr = [];
    imgqjArr = [];
    imgshow();
}
function imgshow() {
    if (imgkzArr.length < 1) {
        var cssz = {
            'pointer-events': 'none',
            'color': '#909090',
        }
    } else {
        var cssz = {
            'pointer-events': '',
            'color': '#000000',
        }
    }
    $('#two_dh li[lay-data="5"]').css(cssz);
    if (JSON.stringify(imgqjArr) === '[]') {
        var cssz = {
            'pointer-events': 'none',
            'color': '#909090',
        }
    } else {
        var cssz = {
            'pointer-events': '',
            'color': '#000000',
        }
    }
    ;$('#two_dh li[lay-data="6"]').css(cssz)
}
// 计算水印图片
function imgdbl_shuiyin(width,height,w,h) {
    // 宽高
    var now_w = 0;
    var now_h = 0;
    var w = parseFloat(w);
    var h = parseFloat(h);
    var width = parseFloat(width);
    var height = parseFloat(height);
    var bl = width/height;
    var oldbl = w/h;
    if(bl>oldbl){
        now_w = w;
        now_h = (w * height / width).toFixed(3);
    }else{
        now_h = h;
        now_w = (h * width / height).toFixed(3);
    }

    var obj = {};
    obj.w = parseFloat(now_w);
    obj.h = parseFloat(now_h);
    return obj;
}
// 后退
function retreat() {
    if(kzArr.length>1){
        var nowhtml = JSON.stringify($(isIE()).find("#label_main_hb").prop("outerHTML"));
        var isright = $("#rightMoreXuanXiangka").css('display');
        var righthtml = JSON.stringify(1);
        if(isright!='none'){
            righthtml = JSON.stringify($("#rightMoreXuanXiangka").prop("outerHTML"));
        }
        let oldbackhandle = [];

        for (index in backhandle) {
            let obj = {};
            obj.base64 = backhandle[index].base64;
            obj.font_face = backhandle[index].font_face;
            obj.height = backhandle[index].height;
            obj.html = backhandle[index].html;
            obj.isChange = backhandle[index].isChange;
            obj.isSave = backhandle[index].isSave;
            obj.num = backhandle[index].num;
            obj.templateid = backhandle[index].templateid;
            obj.width = backhandle[index].width;
            oldbackhandle[index] = obj;
        };
        var strobj = {};
        strobj.index=qjArr.length;
        strobj.html=nowhtml;
        strobj.righthtml=righthtml;
        strobj.backhandleArr=oldbackhandle;
        qjArr.push(strobj);
        // if(qjArr.length>10){
        //     qjArr.splice(0,1);
        // };
        var length = kzArr.length;
        var html=JSON.parse(kzArr[length-2].html);
        var righthtml=JSON.parse(kzArr[length-2].righthtml);

        backhandle = kzArr[length-2].backhandleArr;
        var css = {
            'z-index': 9999999,
            'display': 'none',
            'transform-origin':'',
        };
        $(isIE()).find('#select_style').css(css);
        $(isIE()).find('#label_main_hb_h').hide();
        $(isIE()).find("#label_main_hb").remove();
        $(isIE()).find(".label_main_div").append(html);
        if(righthtml!='1'){
            $('#rightMoreXuanXiangka').remove();
            $('#wrapper .bk_3').append(righthtml);
        }
        kzArr.splice(length-1,1);
    }
    $(isIE()).find("#thHtml .label_main .label_main_div .t-stage-tool div[placement='zoom_sf']").click();
    genXinBaoCun(0);
    show();
}
// 前进
function advance() {
    if(qjArr!='') {
        var length = qjArr.length;
        var html=JSON.parse(qjArr[length-1].html);
        var righthtml=JSON.parse(qjArr[length-1].righthtml);
        var css = {
            'z-index': 9999999,
            'display': 'none',
            'transform-origin': '',
        };
        $(isIE()).find('#select_style').css(css);
        $(isIE()).find('#label_main_hb_h').hide();
        $(isIE()).find("#label_main_hb").remove();
        $(isIE()).find(".label_main_div").append(html);
        backhandle = qjArr[length-1].backhandleArr;
        if(righthtml!='1'){
            $('#rightMoreXuanXiangka').remove();
            $('#wrapper .bk_3').append(righthtml);
        }
        kzArr.push(qjArr[length-1]);
        qjArr.splice(length-1, 1);
        // if(kzArr.length>10){
        //     kzArr.splice(0,1);
        // };
    }
    $(isIE()).find("#thHtml .label_main .label_main_div .t-stage-tool div[placement='zoom_sf']").click();
    genXinBaoCun(0);
    show();

}
// 记录快照
/*sta 0重置记录 1添加记录  */
function saveKz(sta=1,issta=0) {
    // console.log('jilu')
    if(sta==0){
        qjArr=[];
        kzArr=[];
    }
    var html = JSON.stringify($(isIE()).find("#label_main_hb").prop("outerHTML"));
    var isright = $("#rightMoreXuanXiangka").css('display');
    var righthtml = JSON.stringify(1);
    if(isright!='none'){
        righthtml = JSON.stringify($("#rightMoreXuanXiangka").prop("outerHTML"));
    }

    let oldbackhandle = [];
    for (index in backhandle) {
        let obj = {};
        obj.base64 = backhandle[index].base64;
        obj.font_face = backhandle[index].font_face;
        obj.height = backhandle[index].height;
        obj.html = backhandle[index].html;
        obj.isChange = backhandle[index].isChange;
        obj.isSave = backhandle[index].isSave;
        obj.num = backhandle[index].num;
        obj.templateid = backhandle[index].templateid;
        obj.width = backhandle[index].width;
        oldbackhandle[index] = obj;
    }
    if(kzArr!=''){
        var length = kzArr.length;
        var oldhtml=kzArr[length-1].html;
        var oldrighthtml=kzArr[length-1].righthtml;
        if(html!=oldhtml){
            var strobj = {};
            strobj.index=kzArr.length;
            strobj.html=html;
            strobj.righthtml=righthtml;
            strobj.backhandleArr = oldbackhandle;
            kzArr.push(strobj);
            if(kzArr.length>10){
                kzArr.splice(0,1);
            };
            // console.log('记录快照',kzArr);
        }else if(oldrighthtml!=righthtml&&righthtml!=1){
            var strobj = {};
            strobj.index=kzArr.length;
            strobj.html=html;
            strobj.righthtml=righthtml;
            strobj.backhandleArr = oldbackhandle;
            kzArr.push(strobj);
            if(kzArr.length>10){
                kzArr.splice(0,1);
            };
        }else{
            // console.log('已记录快照',kzArr);
        };
    }else{
        var strobj = {};
        strobj.index=kzArr.length;
        strobj.html=html;
        strobj.righthtml=righthtml;
        strobj.backhandleArr = oldbackhandle;
        kzArr.push(strobj);
        if(kzArr.length>10){
            kzArr.splice(0,1);
        };
        // console.log('记录快照',kzArr);
    };

    genXinBaoCun(issta);
    show();
}
// 重置
function reSet() {
    kzArr=[];
    qjArr=[];
    show();
    $('#zt_iframe').attr('lay-templateid','');
    document.getElementById('zt_iframe').contentWindow.location.reload(true);
}
// 保存前进行的步数，超过10条保存
var saveStep = 0;
// 有跟新元素时跟新,保存
function genXinBaoCun(issta=0) {
    if(issta==0){
        var indexs = $('#rightMoreXuanXiangka').attr('data-index');
        if(indexs&&indexs!='undefined'){
            if(backhandle[indexs]){
                backhandle[indexs].isSave=0;
                backhandle[indexs].isChange=1;
            }
        };
    }
    saveStep++;
    // if(saveStep>20){
    //     saveUserHuabuCaoZuo();
    // }
}

function show() {
    if(kzArr.length<2){
        var cssz={
            'pointer-events':'none',
            'color':'#909090',
        };
    }else{
        var cssz={
            'pointer-events':'',
            'color':'',
        };
    }
    $('#two_dh li[lay-data="5"]').css(cssz);
    if(qjArr==''){
        var cssz={
            'pointer-events':'none',
            'color':'#909090',
        };
    }else{
        var cssz={
            'pointer-events':'',
            'color':'',
        };
    };
    $('#two_dh li[lay-data="6"]').css(cssz);

}

// 判断是否是ie
function isIE() { //ie?
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return frames["image_iframe"].document;
    else
        return frames["image_iframe"].contentWindow.document;
}
function getBrowserInfo(){
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var re =/(msie|firefox|chrome|opera|version).*?([\d.]+)/;
    var m = ua.match(re);
    Sys.browser = m[1].replace(/version/, "'safari");
    Sys.ver = m[2];
    return Sys;
}
// 判断浏览器
function checkBrowser() {
    var sys = getBrowserInfo();
    switch (sys.browser) {
        case 'firefox':
            checkBrowserShow();
            break;
        case 'chrome':
            let version = sys.ver.split('.');
            if(parseFloat(version[0])<30){
                checkBrowserShow();
            }
            break;
        default:
            if(isBrowser==1){
                checkBrowserShow();
            }
            break;
    }
}
function checkBrowserShow(){
    let top = ($(document).height()-580/2)/2;
    $('#checkBrowser .ant-modal').css('top',top+'px');
    $('#checkBrowser').fadeIn(200);
}
// 判断浏览器
function checkBrowserHide() {
    $('#checkBrowser').fadeOut(200);
}
// 三角函数 求斜边长度 向上取整数
function hypotenuseLength($a,$b){
    return Math.ceil(Math.sqrt($a*$a+$b*$b));
}
// 检测颜色选择器，点击空白处确认
function checkColpick() {
    $('.colpick_rgbhex').each(function (e) {
        let disp = $(this).css('display');
        if(disp=='block'){
            $(this).find('.colpick_submit').click();
        }
    })
}
/*RGB颜色转换为16进制*/
function colorHexZt(that){
    // var that = this;
    if(/^(rgb|RGB)/.test(that)){
        var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
        var strHex = "#";
        for(var i=0; i<aColor.length; i++){
            var hex = Number(aColor[i]).toString(16);
            if(hex === "0"){
                hex += hex;
            }
            strHex += hex;
        }
        if(strHex.length !== 7){
            strHex = that;
        }
        return strHex;
    }else if(reg.test(that)){
        var aNum = that.replace(/#/,"").split("");
        if(aNum.length === 6){
            return that;
        }else if(aNum.length === 3){
            var numHex = "#";
            for(var i=0; i<aNum.length; i+=1){
                numHex += (aNum[i]+aNum[i]);
            }
            return numHex;
        }
    }else{
        return that;
    }
};

(function ($) {
    // 左右翻转
    $("body").delegate("#changYongCaoZuo #tool-bar-reverse-wrap .tool-bar-lr", "click", function (e) {
        var now_id = $(isIE()).find("#now_page_select_id").attr('now_id');
        if (now_id) {
            var transform = $(isIE()).find('#' + now_id + ' div').eq(0).css('transform');
            var newtransform = 'scale(-1,1)';
            if (transform != 'none') {
                transform = transform.replace('matrix(', '').replace(')', '').split(',');
                if (transform[0].replace(/\s+/g, "") != '0') {
                    transform[0] = -parseFloat(transform[0].replace(/\s+/g, ""));
                }
                if (transform[1].replace(/\s+/g, "") != '0') {
                    transform[1] = -parseFloat(transform[1].replace(/\s+/g, ""));
                }
                newtransform = 'matrix(' + transform.join(',') + ')';
            }

            $(isIE()).find('#' + now_id + ' div').eq(0).css('transform', newtransform);
            saveKz();
        }
    });
    // 上下翻转
    $("body").delegate("#changYongCaoZuo #tool-bar-reverse-wrap .tool-bar-tb", "click", function (e) {
        var now_id = $(isIE()).find("#now_page_select_id").attr('now_id');
        if (now_id) {
            var transform = $(isIE()).find('#' + now_id + ' div').eq(0).css('transform');
            // var transform = $(isIE()).find('#'+now_id+' div').eq(0).css('transform').replace('matrix(','').replace(')','').split(',');
            var newtransform = 'scale(1,-1)';
            if (transform != 'none') {
                transform = transform.replace('matrix(', '').replace(')', '').split(',');
                if (transform[2].replace(/\s+/g, "") != '0') {
                    transform[2] = -parseFloat(transform[2].replace(/\s+/g, ""));
                }
                if (transform[3].replace(/\s+/g, "") != '0') {
                    transform[3] = -parseFloat(transform[3].replace(/\s+/g, ""));
                }
                newtransform = 'matrix(' + transform.join(',') + ')';
            }

            $(isIE()).find('#' + now_id + ' div').eq(0).css('transform', newtransform);
            saveKz();
        }
    });

    // 修改形状参数
    function changFrom(now_id, type, value, isSave = 1, ids = '') {
        if (now_id.indexOf("form") >= 0) {//形状
            switch (type) {
                case 'fromcolor'://形状颜色
                    let lay_id = $('#' + ids).attr('lay-id');
                    let finds = "path#" + lay_id + ",rect#" + lay_id + ",line#" + lay_id + ",polygon#" + lay_id + ",circle#" + lay_id;
                    $(isIE()).find('#' + now_id + ' svg').find(finds).attr('fill', value);
                    $(isIE()).find('#' + now_id + ' svg').find(finds).css('fill', value);
                    break;
                case 'fromtmd'://形状透明度
                    $(isIE()).find('#' + now_id + ' svg').find("path,rect,line,polygon,circle,ellipse").attr('fill-opacity', value);
                    break;
                case 'linecolor'://线条颜色
                    $(isIE()).find('#' + now_id + ' svg').find("path,rect,line,polygon,circle,ellipse").attr('stroke', value);
                    break;
                case 'linewidth'://线条宽度
                    $(isIE()).find('#' + now_id + ' svg').find("path,rect,line,polygon,circle,ellipse").attr('stroke-width', value);
                    // 获取原始参数
                    var viewBox = $(isIE()).find('#' + now_id + ' svg').attr('oldviewbox');

                    if (!viewBox || viewBox == undefined || viewBox == 'undefined') {
                        viewBox = document.getElementById('zt_iframe').contentWindow.document.querySelector('#' + now_id + ' svg').getAttribute("viewBox");
                        $(isIE()).find('#' + now_id + ' svg').attr('oldviewbox', viewBox);
                    }
                    viewBox = viewBox.split(' ');
                    viewBox[0] = -value / 2;
                    viewBox[1] = -value / 2;
                    viewBox[2] = parseFloat(viewBox[2]) + value;
                    viewBox[3] = parseFloat(viewBox[3]) + value;
                    viewBox = viewBox.join(" ");
                    document.getElementById('zt_iframe').contentWindow.document.querySelector('#' + now_id + ' svg').setAttribute("viewBox", viewBox);
                    break;
                case 'linetype'://线条类型
                    if (value.indexOf("2.png") >= 0) {
                        var dasharray = '5,5';
                    } else if (value.indexOf("3.png") >= 0) {
                        var dasharray = '10,5';
                    } else if (value.indexOf("4.png") >= 0) {
                        var dasharray = '10,5,5,5';
                    } else if (value.indexOf("5.png") >= 0) {
                        var dasharray = '8,8';
                    } else if (value.indexOf("6.png") >= 0) {
                        var dasharray = '3,3';
                    } else {
                        var dasharray = '';
                    }
                    $(isIE()).find('#' + now_id + ' svg').find("path,rect,line,polygon,circle,ellipse").attr('stroke-dasharray', dasharray);
                    break;
            }
            if (isSave == 1) {
                saveKz();
            }

        }
    }

    // 点击空白处加载渲染
    $(document).click(function (event) {
        console.log('点击空白处index.js-127行')
        //如果事件对象存在
        var event = event || window.event;
        var typeid = event.target.getAttribute('id');
        // 检测是否修改画布宽度
        if (typeid != 'width_right' && typeid != 'height_right' && typeid != 'clickChooesPic') {
            saveHbCan();
        }
    });

    function changLableHsp(now_id) {
        if (now_id) {
            var zt_w = parseFloat($(isIE()).find('#' + now_id).width());
            var zt_h = parseFloat($(isIE()).find('#' + now_id).height());
            var zt_top = $(isIE()).find('#' + now_id).css('top');
            var zt_left = $(isIE()).find('#' + now_id).css('left');
            var css = {
                'top': zt_top,
                'left': zt_left,
                'width': zt_w + 'px',
                'height': zt_h + 'px',
            }
            $(isIE()).find('#select_style').css(css);
        }
    }

    // font: 获取字体高度
    function loadFontHeight(text, fontFamily, fontsize, writingmode) {
        var span = document.createElement("span");
        // 这几个字母和符号宽度比较容易变化
        // 设置为不可见，但可以测量宽度
        span.style.visibility = "hidden";
        // 字体大小为 500px，如果宽度变化比较容易区分
        span.style.fontSize = fontsize;
        span.style.fontFamily = fontFamily;
        span.setAttribute('id', 'ceztsizefont');
        // 添加到页面
        document.body.appendChild(span);
        $('#ceztsizefont').css('writing-mode', writingmode);
        $('#ceztsizefont').html(text);
        // 获取宽度
        var w = $('#ceztsizefont').width();
        var h = $('#ceztsizefont').height();
        var objs = {
            'w': w,
            'h': h,
        };
        $("#ceztsizefont").remove();
        return objs;
    }

    // 文字横竖排
    $('#wordArrangement').on('click', function () {
        var now_id = $(isIE()).find("#now_page_select_id").attr('now_id');
        if (now_id) {
            var text = document.getElementById('word').value;
            if ($(this).attr('value') == 0) {
                let objs = loadFontHeight(text, $(isIE()).find('#' + now_id).css('font-family'), $(isIE()).find('#' + now_id).css('font-size'), 'vertical-lr');
                var css = {
                    'width': 'auto',
                    'height': objs.h + 'px',
                    'writing-mode': 'vertical-lr',
                };
                $(isIE()).find('#' + now_id).css(css);
                $(isIE()).find('#' + now_id).attr('wordArrangement', 1);
                $(isIE()).find('#select_style .mr_ng-star-inserted').hide();
                $(isIE()).find('#select_style .mb_ng-star-inserted').show();
                $(this).addClass('ico_active');
                $(this).attr('value', 1);
            } else {
                let objs = loadFontHeight(text, $(isIE()).find('#' + now_id).css('font-family'), $(isIE()).find('#' + now_id).css('font-size'), '');
                var css = {
                    'width': objs.w + 'px',
                    'height': 'auto',
                    'writing-mode': '',
                };
                $(isIE()).find('#select_style .mr_ng-star-inserted').show();
                $(isIE()).find('#select_style .mb_ng-star-inserted').hide();
                $(isIE()).find('#' + now_id).css(css);
                $(isIE()).find('#' + now_id).attr('wordArrangement', 0);
                $(this).removeClass('ico_active');
                $(this).attr('value', 0);
            }
            changLableHsp(now_id);
            saveKz();
        }
    });

    // 字体加粗
    $('#blod').on('click', function () {
        var now_id = $(isIE()).find("#now_page_select_id").attr('now_id');
        if (now_id) {
            if ($(this).attr('value') == 0) {
                $(isIE()).find('#' + now_id).css('font-weight', '700');
                $(this).addClass('ico_active');
                $(this).attr('value', 1);
            } else {
                $(isIE()).find('#' + now_id).css('font-weight', '400');
                $(this).removeClass('ico_active');
                $(this).attr('value', 0);
            }
            saveKz();
        }
    });

    // 字体倾斜
    $('#incline').on('click', function () {
        var now_id = $(isIE()).find("#now_page_select_id").attr('now_id');
        if (now_id) {
            if ($(this).attr('value') == 0) {
                $(isIE()).find('#' + now_id).css('font-style', 'italic');
                $(this).attr('value', 1);
                $(this).addClass('ico_active');
            } else {
                $(isIE()).find('#' + now_id).css('font-style', 'normal');
                $(this).removeClass('ico_active');
                $(this).attr('value', 0);
            }
            saveKz()
        }

    });

    // 字体下划线
    $('#underline').on('click', function () {
        var now_id = $(isIE()).find("#now_page_select_id").attr('now_id');
        if (now_id) {
            if ($(this).attr('value') == 0) {
                $(isIE()).find('#' + now_id).css('text-decoration', 'underline');
                $(this).attr('value', 1);
                $(this).addClass('ico_active');
                $('#strikethrough').attr('value', 0);
                $('#strikethrough').removeClass('ico_active');
            } else {
                $(isIE()).find('#' + now_id).css('text-decoration', 'none');
                $(this).removeClass('ico_active');
                $(this).attr('value', 0);
            }
            saveKz()
        }
    })

    // 字体删除线
    $('#strikethrough').on('click', function () {
        var now_id = $(isIE()).find("#now_page_select_id").attr('now_id');
        if (now_id) {
            if ($(this).attr('value') == 0) {
                $(isIE()).find('#' + now_id).css('text-decoration', 'line-through');
                $(this).attr('value', 1);
                $(this).addClass('ico_active');
                $('#underline').removeClass('ico_active');
                $('#underline').attr('value', 0);
            } else {
                $(isIE()).find('#' + now_id).css('text-decoration', 'none');
                $(this).removeClass('ico_active');
                $(this).attr('value', 0);
            }
            saveKz()
        }
    })

    // 文字对齐方式
    $('#left_justifying,#center_justifying,#right_justifying').on('click', function () {
        var now_id = $(isIE()).find("#now_page_select_id").attr('now_id');
        if (now_id) {
            if ($(this).attr('value') == 0) {
                $(this).attr('value', 1);
                $(this).addClass('ico_active');
                switch ($(this).attr('id')) {
                    case 'left_justifying':
                        $(isIE()).find('#' + now_id).css('text-align', 'left');
                        $('#center_justifying').removeClass('ico_active');
                        $('#center_justifying').attr('value', 0);
                        $('#right_justifying').removeClass('ico_active');
                        $('#right_justifying').attr('value', 0);
                        break;
                    case 'center_justifying':
                        $(isIE()).find('#' + now_id).css('text-align', 'center');
                        $('#left_justifying').removeClass('ico_active');
                        $('#left_justifying').attr('value', 0);
                        $('#right_justifying').removeClass('ico_active');
                        $('#right_justifying').attr('value', 0);
                        break;
                    case 'right_justifying':
                        $(isIE()).find('#' + now_id).css('text-align', 'right');
                        $('#center_justifying').removeClass('ico_active');
                        $('#center_justifying').attr('value', 0);
                        $('#left_justifying').removeClass('ico_active');
                        $('#left_justifying').attr('value', 0);
                        break;
                }

            } else {
                $(isIE()).find('#' + now_id).css('text-decoration', 'none');
                $(this).removeClass('ico_active');
                $(this).attr('value', 0);
            }
            saveKz()
        }
    })

    // 图形左右翻转
    $('#turn_around,#from_turn_around').on('click', function () {//左右
        var now_id = $(isIE()).find("#now_page_select_id").attr('now_id');
        if (now_id) {
            var xl = -$(isIE()).find("#" + now_id + ' svg').attr('xl');//左右旋转
            var xb = $(isIE()).find("#" + now_id + ' svg').attr('xb');//上下旋转
            var scale = "scale(" + xl + "," + xb + ")";
            $(isIE()).find("#" + now_id + ' svg').attr('xl', xl);
            if ($(this).attr('value') == 0) {
                $(this).addClass('ico_active');
                $(this).attr('value', 1);
            } else {
                $(this).removeClass('ico_active');
                $(this).attr('value', 0);
            }
            $(isIE()).find("#" + now_id + ' svg').css('transform', scale);
            saveKz()
        }
    })

    // 图形上下翻转
    $('#turn_upside,#from_turn_upside').on('click', function () {//左右
        var now_id = $(isIE()).find("#now_page_select_id").attr('now_id');
        if (now_id) {
            var xl = $(isIE()).find("#" + now_id + ' svg').attr('xl');//左右旋转
            var xb = -$(isIE()).find("#" + now_id + ' svg').attr('xb');//上下旋转
            var scale = "scale(" + xl + "," + xb + ")";
            $(isIE()).find("#" + now_id + ' svg').attr('xb', xb);
            if ($(this).attr('value') == 0) {
                $(this).addClass('ico_active');
                $(this).attr('value', 1);
            } else {
                $(this).removeClass('ico_active');
                $(this).attr('value', 0);
            }
            $(isIE()).find("#" + now_id + ' svg').css('transform', scale);
            saveKz()
        }
    })

// 重置颜色
    function resetColorZtImg() {
        var now_id = $(isIE()).find("#now_page_select_id").attr('now_id');
        if (now_id) {
            $('.slider_zt_img_brightness').jRange('setValue', 0)//亮度
            $('.slider_zt_img_contrast').jRange('setValue', 0)//对比度
            $('.slider_zt_img_saturability').jRange('setValue', 0)//饱和度
            $('.slider_zt_img_hue').jRange('setValue', 0)//色相
            $('.slider_zt_img_vague').jRange('setValue', 0)//模糊
            $('.slider_zt_img_sharpen').jRange('setValue', 0)//锐化
            $('.slider_zt_img_circular').jRange('setValue', 0)//圆角
            $('.zt_black_bj_color').jRange('setValue', 0)//rgb
            $('.zt_red_bj_color').jRange('setValue', 0)//红
            $('.zt_green_bj_color').jRange('setValue', 0)//绿
            $('.zt_blue_bj_color').jRange('setValue', 0)//蓝
        }
    }

// 初始化裁剪框
    function intZtCropImg() {
        var now_id = $(isIE()).find("#now_page_select_id").attr('now_id');
        if (now_id) {
            if (now_id.indexOf("img") >= 0) {//图片
                $(isIE()).find('#select_style').hide();
                var width = parseFloat($(isIE()).find('#' + now_id).width());
                var height = parseFloat($(isIE()).find('#' + now_id).height());
                var bl = $('#img_parameter #unfold #cropImgZt').attr('bl');
                var rotate = $(isIE()).find("#" + now_id).attr('rotate');
                var scale = parseFloat($(isIE()).find('#label_main_hb').attr('scale'));
                $(isIE()).find('#tailorHandle').attr('scale', scale).attr('rotate', rotate).attr('bl', bl);
                $(isIE()).find('#tailorHandle #tailorHandleDiv').css('transform', 'scale(' + scale + ')');

                var maxw = maxh = hypotenuseLength(width, height);

                // 判断裁剪比例
                /*根据设定比例判断缩放值*/
                var cjblarr = bl.split(',');
                var blx = parseFloat(cjblarr[0]);
                var bly = parseFloat(cjblarr[1]);
                // 三角函数 求斜边长度 向上取整数
                if (blx == 0 || bly == 0) {
                    $('#ztLockBl').show();
                    var cw = width / 2;
                    var ch = height / 2;
                    var cx = width / 4 + (maxw - width) / 2;
                    var cy = height / 4 + (maxh - height) / 2;
                    $(isIE()).find('#tailorHandle #resizerZtImg .resizer .mt,#tailorHandle #resizerZtImg .resizer .mb,#tailorHandle #resizerZtImg .resizer .ml,#tailorHandle #resizerZtImg .resizer .mr').show();
                } else {/*按比例裁剪*/
                    $('#ztLockBl').hide();
                    if (width / height > blx / bly) {/*宽大于高*/
                        var ch = height / 2;
                        var cw = parseFloat((ch * blx / bly).toFixed(3));
                    } else {/*高大于宽*/
                        var cw = width / 2;
                        var ch = parseFloat(cw * bly / blx.toFixed(3));
                    }
                    var cx = (width - cw) / 2 + (maxw - width) / 2;
                    var cy = (height - ch) / 2 + (maxh - height) / 2;

                    $(isIE()).find('#tailorHandle #resizerZtImg .resizer .mt,#tailorHandle #resizerZtImg .resizer .mb,#tailorHandle #resizerZtImg .resizer .ml,#tailorHandle #resizerZtImg .resizer .mr').hide();

                }

                // 读取需要裁剪的图片链接
                var src = $(isIE()).find("#" + now_id + " image[class_id='" + now_id + "']").attr('xlink:href');

                // 获取坐标
                var left = parseFloat($(isIE()).find("#" + now_id).css('left'));
                var top = parseFloat($(isIE()).find("#" + now_id).css('top'));
                var laminTop = parseFloat($(isIE()).find("#thHtml #label_main_hb").css('top'));
                var laminLeft = parseFloat($(isIE()).find("#thHtml #label_main_hb").css('left'));
                var tailorHandlecss = {
                    'padding-top': '0px',
                    'padding-left': '0px',
                    'top': '0',
                    'left': '0',
                };
                $(isIE()).find('#tailorHandle').css(tailorHandlecss);


                if (laminTop < 0) {
                    $(isIE()).find('#tailorHandle').css('top', laminTop + 'px');
                } else {
                    $(isIE()).find('#tailorHandle').css('padding-top', laminTop + 'px');
                }

                if (laminLeft < 0) {
                    $(isIE()).find('#tailorHandle').css('left', laminLeft + 'px');
                } else {
                    $(isIE()).find('#tailorHandle').css('padding-left', laminLeft + 'px');
                }

                var imgcss = {
                    width: width + 'px',
                    height: height + 'px',
                    top: (maxh - height) / 2 + 'px',
                    left: (maxw - width) / 2 + 'px',
                    transform: 'rotate(' + rotate + 'deg) scale(1, 1)',
                };
                $(isIE()).find('#tailorHandle .oImgDiv .oImg').css(imgcss).attr('src', src);
                var outImgcss = {
                    width: maxw + 'px',
                    height: maxh + 'px',
                    top: top + (height - maxh) / 2 + 'px',
                    left: left + (width - maxw) / 2 + 'px',
                };
                $(isIE()).find('#tailorHandle .oImgDiv').css(outImgcss);
                $(isIE()).find('#tailorHandle #resizerZtImg').css(outImgcss);

                $(isIE()).find('#tailorHandle #resizerZtImg .t-guider #tGuiderRect').attr('width', maxw);
                $(isIE()).find('#tailorHandle #resizerZtImg .t-guider #tGuiderRect').attr('height', maxh);


                var cssc = {
                    'width': cw + 'px',
                    'height': ch + 'px',
                    'x': cx + 'px',
                    'y': cy + 'px',
                };
                $(isIE()).find('#tailorHandle #resizerZtImg .t-guider #tGuider').css(cssc);
                var cssresizer = {
                    'width': cw + 'px',
                    'height': ch + 'px',
                    'left': cx + 'px',
                    'top': cy + 'px',
                };

                document.getElementById('zt_crop_width').value = cw;
                document.getElementById('zt_crop_height').value = ch;

                $(isIE()).find('#tailorHandle #resizerZtImg .resizer').css(cssresizer);
                $(isIE()).find('#tailorHandle').show();
                var bll = 1 / scale;

                var ox = cw + cx + 20;
                var oy = cy + ch / 2 + 4;

                // console.log(bll/1.5)
                // if(bll>1.5){
                //     ox = ox*(bll/1.5);
                // }
                // console.log(bll)
                var optionscss = {
                    left: ox + 'px',
                    top: oy + 'px',
                    'transform': 'scale(' + bll + ')',
                };
                $(isIE()).find('#tailorHandle #resizerZtImg .options').css(optionscss);

                let csscao = {
                    'transform': 'scale(' + bll + ')',
                };
                // $(isIE()).find('#tailorHandle #resizerZtImg .options #optionsDiv').css(csscao);
                $(isIE()).find('#tailorHandle #resizerZtImg .resizer .point').css(csscao);


                // 计算裁剪的坐标

            }
        }
    }

    function intZtCropImgSelect(blx, bly, p, oldwidth, oldheight) {
        p.width = parseInt(p.width);
        p.height = parseInt(p.height);
        p.x = (oldwidth - p.width) / 2;
        p.y = (oldheight - p.height) / 2;
        var css = {
            'width': p.width + 'px',
            'height': p.height + 'px',
            'left': p.x + 'px',
            'top': p.y + 'px',
        };
        $(isIE()).find('#tailorHandle #resizerZtImg .resizer').css(css);
        var cssc = {
            'width': p.width + 'px',
            'height': p.height + 'px',
            'x': p.x + 'px',
            'y': p.y + 'px',
        };
        $(isIE()).find('#tailorHandle #resizerZtImg .t-guider #tGuider').css(cssc);
        $(isIE()).find('#tailorHandle #resizerZtImg .t-guider #tGuiderRect').attr('width', oldwidth);
        $(isIE()).find('#tailorHandle #resizerZtImg .t-guider #tGuiderRect').attr('height', oldheight);

        document.getElementById('zt_crop_width').value = p.width;
        document.getElementById('zt_crop_height').value = p.height;


    }


// 初始化裁剪框
    function intCropZtImage(now_id) {
        if (now_id) {
            if (now_id.indexOf("img") >= 0) {//图片
                // var width = $(isIE()).find("#"+now_id+" image[class_id='"+now_id+"']").attr('oldwidth');
                // var height = $(isIE()).find("#"+now_id+" image[class_id='"+now_id+"']").attr('oldheight');
                // if(!width||!height){
                //     width = $(isIE()).find("#"+now_id+" image[class_id='"+now_id+"']").attr('width');
                //     height = $(isIE()).find("#"+now_id+" image[class_id='"+now_id+"']").attr('height');
                //     $(isIE()).find("#"+now_id+" image[class_id='"+now_id+"']").attr('oldwidth',width);
                //     $(isIE()).find("#"+now_id+" image[class_id='"+now_id+"']").attr('oldheight',height);
                // }


                var bl = parseFloat($(isIE()).find('#label_main_hb').attr('scale'));
                var width = parseFloat($(isIE()).find('#' + now_id).width()) * bl;
                var height = parseFloat($(isIE()).find('#' + now_id).height()) * bl;


                // width =parseFloat(width);
                // height =parseFloat(height);

                var bl = parseFloat($(isIE()).find("#thHtml #label_main_hb").attr('scale'));
                var left = parseFloat($(isIE()).find("#" + now_id).css('left')) * bl;
                var top = parseFloat($(isIE()).find("#" + now_id).css('top')) * bl;
                var src = $(isIE()).find("#" + now_id + " image[class_id='" + now_id + "']").attr('xlink:href');
                var laminTop = parseFloat($(isIE()).find("#thHtml #label_main_hb").css('top'));
                var laminLeft = parseFloat($(isIE()).find("#thHtml #label_main_hb").css('left'));
                var rotate = $(isIE()).find("#" + now_id).attr('rotate');

                var css = {
                    width: width + 'px',
                    height: height + 'px',
                    left: left + laminLeft + 'px',
                    top: top + laminTop + 'px',
                    transform: 'rotate(' + rotate + 'deg) scale(1, 1)',
                };
                $(isIE()).find('#wenziPlug #tailorHandle img.oImg').css(css).attr('src', src);


                // var css = {
                //     width:width+'px',
                //     height:height+'px',
                //     left:left+laminLeft+'px',
                //     top:top+laminTop+'px',
                //     transform: 'rotate('+rotate+'deg) scale(1, 1)',
                // };
                // $(isIE()).find('#wenziPlug #tailorHandle div.cropper').css(css);

                var css = {
                    background: 'url("' + src + '") 0px 0px / ' + width + 'px ' + height + 'px no-repeat',
                };
                $(isIE()).find('#wenziPlug #tailorHandle div.cropper .resizer .e-crops').css(css);

                var resizercss = {
                    width: width + 'px',
                    height: height + 'px',
                    left: left + laminLeft + 'px',
                    top: top + laminTop + 'px',
                    transform: 'rotate(' + rotate + 'deg) scale(1, 1)',
                };
                $(isIE()).find('#wenziPlug #tailorHandle div.cropper .resizer').css(resizercss);
                $(isIE()).find('#wenziPlug #tailorHandle .image-cropper-wrap').attr('rotate', rotate);

                var left_crop = laminLeft + left + width + 20;
                var top_crop = laminTop + top + height / 2;
                var css_crop = {
                    'left': left_crop + 'px',
                    'top': top_crop + 'px',
                };
                $(isIE()).find('#tailorHandle .options').css(css_crop);


                $(isIE()).find('#wenziPlug #tailorHandle').show();
                $(isIE()).find("#thHtml #label_main_hb_h").hide();

                // console.log(width,height,left,top,src);
            }
        }
    }

// rgb转16进制
    function colorRGB2AHexNew(color) {
        var rgb = color.split(',');
        if (color.indexOf("#") >= 0) {
            return color;
            var r = 0;
            var g = 0;
            var b = 0;
            var a = 1;
        } else if (color.indexOf("rgba") >= 0) {//判断是否是rgba
            var r = parseInt(rgb[0].split('(')[1]);
            var g = parseInt(rgb[1]);
            var b = parseInt(rgb[2]);
            var a = parseFloat(rgb[3].split(')')[0]);
        } else if (color.indexOf("rgb") >= 0) {
            var r = parseInt(rgb[0].split('(')[1]);
            var g = parseInt(rgb[1]);
            var b = parseInt(rgb[2].split(')')[0]);
            var a = 1;
        } else {
            var r = 0;
            var g = 0;
            var b = 0;
            var a = 1;
        }
        var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return hex;
    }

    var backhandle = [];
// 修改多编辑处理
    var isMbTh = 0;/*模板 0:未加载；其他：已加载*/
    var isqiehuanimg = 0;/*0:未加载1：已加载 2：替换*/
    var isqiehuanimgid = '';/*0:未加载1：已加载 2：替换*/
    var rightMbNums = '';/*0:未加载1：已加载 2：替换*/

    /*index 模板id sta状态0:初始化1：复制 2：删除;3:模板加载,4:替换现有的模板*/
    function saveMoreBacks(idx, sta, isbj = 0) {
        $('.bk_3').show();
        var num = 1;
        if (backhandle !== '[]') {
            for (testindex in backhandle) {
                num++;
            }
        }
        ;
        if (sta != 2) {
            if (num > 50) {
                layer.msg("超出上限");
            } else {
                var top = '';
                var textnumtop = '';
                // 判断是否从工具导入图片
                if (sta == 3) {//判断是否从模板选择
                    index = 'mb' + new Date().getTime();
                    isMbTh = index;
                } else if (sta == 4) {//替换当前的模板
                    top = parseFloat($('#rightMoreXuanXiangka .page-list .page-item#' + isMbTh).css('top'));
                    textnumtop = parseFloat($('#rightMoreXuanXiangka .page-list .page-item#' + isMbTh + ' .index').text());

                    $('#rightMoreXuanXiangka .page-list .page-item#' + isMbTh).remove();
                    delete (backhandle[isMbTh]);
                    num--;
                    index = 'mb' + new Date().getTime();
                    isMbTh = index;
                } else if (isbj == 1) {//判断是否从工具栏导入图片
                    index = 'img' + new Date().getTime();
                    isqiehuanimgid = index;
                } else {//复制，或新建
                    index = 'copy' + new Date().getTime();
                }
                var base64 = '';
                var issta = 0;
                var width = 0;
                var height = 0;
                var nowhtml = '';
                if (num < 2) {
                    var active = 'active';
                    if (uid == 1 || uid == 2) {
                        var templateid = $('#zt_iframe').attr('lay-templateid');
                    } else {
                        if (tem_user != '') {
                            var templateid = tem_user;
                            tem_user = '';
                        } else {
                            var templateid = '';
                        }

                    }

                    $('#rightMoreXuanXiangka').attr('data-index', index);
                    var html = $(isIE()).find("#thHtml").html();
                    var font_face = [];
                    $(isIE()).find("#label_main_hb div").each(function (n) {
                        var faceValue = $(this).attr('faceurl');
                        var faceid = $(this).attr('id');
                        var facetext = $(this).find('span').text();
                        var str = {};
                        if (faceValue) {
                            str.url = faceValue;
                            str.faceid = faceid;
                            str.text = facetext;
                            font_face.push(str);
                        }
                    });
                    width = $(isIE()).find('.label_main #label_main_hb').attr('width');
                    height = $(isIE()).find('.label_main #label_main_hb').attr('height');
                    nowhtml = $(isIE()).find('.label_main #label_main_hb').prop('outerHTML');
                    loadimg(nowhtml, width, height, index);
                } else {
                    var oldindex = $('#rightMoreXuanXiangka').attr('data-index');
                    var font_face = [];
                    $(isIE()).find("#label_main_hb div").each(function (n) {
                        var faceValue = $(this).attr('faceurl');
                        var faceid = $(this).attr('id');
                        var facetext = $(this).find('span').text();
                        var str = {};
                        if (faceValue) {
                            str.url = faceValue;
                            str.faceid = faceid;
                            str.text = facetext;
                            font_face.push(str);
                        }
                    });

                    if (uid == 1 || uid == 2) {
                        var templateid = $('#zt_iframe').attr('lay-templateid');
                    } else {
                        var templateid = '';
                    }


                    if (idx && idx != '' && idx != 'undefined') {
                        if (oldindex == idx) {
                            backhandle[idx].html = $(isIE()).find("#thHtml").html();
                            backhandle[idx].font_face = font_face;
                            backhandle[idx].width = $(isIE()).find('.label_main #label_main_hb').attr('width');
                            backhandle[idx].height = $(isIE()).find('.label_main #label_main_hb').attr('height');
                        }
                        var font_face = backhandle[idx].font_face;
                        var html = backhandle[idx].html;
                        width = backhandle[idx].width;
                        height = backhandle[idx].height;
                        base64 = backhandle[idx].base64;
                    } else {
                        // $('#rightMoreXuanXiangka').attr('data-index',index);
                        html = $(isIE()).find("#thHtml").html();
                        var font_face = font_face;
                        width = $(isIE()).find('.label_main #label_main_hb').attr('width');
                        height = $(isIE()).find('.label_main #label_main_hb').attr('height');
                        issta = 1;
                    }
                    var active = '';
                }

                var obj = {};
                obj.isChange = 0;
                obj.base64 = base64;
                obj.html = html;
                obj.font_face = font_face;
                obj.templateid = templateid;
                obj.width = width;
                obj.height = height;
                obj.num = num;
                obj.isChange = 0;
                obj.isSave = 0;
                backhandle[index] = obj;
                rightMbNums = num;
                if (top == '') {
                    var numjs = 0;
                    for (idxs in backhandle) {
                        numjs++;
                    }
                    top = 0 + (numjs - 1) * 58;
                    rightMbNums = numjs;
                }
                // console.log(backhandle);
                if (textnumtop != '') {
                    num = textnumtop;
                }
                var html = '<div id="' + index + '" class="page-item ' + active + '"\n' +
                        '                 style="width: 82px; height: 50px; top: ' + top + 'px;">\n' +
                        '                <div  class="page-option">\n' +
                        '                    <div title="复制页面" class="item left" content="复制页面" placement="left"><i class="iconfont icon-fuzhi"></i></div>\n' +
                        '                    <div title="删除页面"  class="item right" content="删除页面" placement="left"><i class="iconfont icon-shanchu"></i><span  class="confirm-tip">确认删除</span>\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div  class="thumb-wrap">\n' +
                        '                    <div  class="thumb"><img src="' + base64 + '">\n' +
                        '                    </div>\n' +
                        '                    <div  class="editing"><span >正在编辑</span></div>\n' +
                        '                    <div  class="index">' + num + '</div>\n' +
                        '                </div>\n' +
                        '            </div>';
                $('#rightMoreXuanXiangka .page-list').append(html);
                if (issta == 1) {
                    gengHuanYeMian(index);
                }

                var isselect = $('#rightMoreXuanXiangka .page-list .page-item#' + index).attr('class');
                restoePaiXu(isselect);

            }

        } else {//删除
            if (num > 2) {
                var isselect = $('#rightMoreXuanXiangka .page-list .page-item#' + idx).attr('class');
                var isnum = parseInt($('#rightMoreXuanXiangka .page-list .page-item#' + idx + ' .thumb-wrap .index').text());
                if (isnum - 1 > 0) {
                    isnum = isnum - 1;
                } else {
                    isnum = 1;
                }
                if (isnum < 1) {
                    isnum = 1;
                }
                if (isqiehuanimgid == idx) {
                    isqiehuanimg = 0;
                    isqiehuanimgid = '';
                }
                if (idx.indexOf("mb") >= 0) {/*如果删除的是模板清0*/
                    isMbTh == 0;
                }
                $('#rightMoreXuanXiangka .page-list .page-item#' + idx).remove();
                delete (backhandle[idx]);
                restoePaiXu(isselect, isnum);
            } else {
                $('#rightMoreXuanXiangka .page-list .page-item#' + idx + ' .page-option .right').removeClass('confirm');
                layer.msg("至少保留一页");
            }
        }
        $('#rightMoreXuanXiangka').show();
        saveKz(1, 1);
    }

    function restoePaiXu(isselect, isnum = '') {
        var num = 0;
        for (idxs in backhandle) {
            num++;
            if (isselect.indexOf("active") >= 0 && num == isnum) {//替换当前页面
                $('#rightMoreXuanXiangka').attr('data-index', '');
                gengHuanYeMian(idxs);
            }
            var top = 0 + (num - 1) * 58;
            backhandle[idxs].num = num;
            $('#rightMoreXuanXiangka .page-list .page-item#' + idxs).css('top', top + 'px');
            $('#rightMoreXuanXiangka .page-list .page-item#' + idxs + ' .index').text(num);
        }
        rightMbNums = num;
    }

// 保存云端处理图片
    function loadimg(html, w_old, h_old, idx) {
        var time = new Date().getTime();
        var htmlload = '<div class="handleimging"><img src=/v2/download/image/loadupload.gif?time=' + time + '"></div>';
        $('#rightMoreXuanXiangka .page-list .page-item#' + idx).append(htmlload);

        var data = '<svg id="now_svg_t" xmlns="http://www.w3.org/2000/svg" width="' + w_old + '" height="' + h_old + '">' +
                '<foreignObject width="100%" height="100%">' +
                '<body xmlns="http://www.w3.org/1999/xhtml" style="width: 100%;height: 100%;">\n' +
                '            <style type="text/css">\n' + style +
                '            </style>\n' +
                html +
                '</body>' +
                '</foreignObject>' +
                '</svg>';
        $(isIE()).find('#saveimgload').empty().append(data);
        var css = {
            'top': '0px',
            'left': '0px',
            'transform': 'scale(1)',
        };
        $(isIE()).find('#saveimgload #now_svg_t #label_main_hb').css(css);
        var arr = [];
        $(isIE()).find("#saveimgload #now_svg_t image").each(function () {
            var src = $(this).attr("xlink:href");
            if (src.indexOf("base64") < 0) {
                if (src.indexOf("www.yasuotu.com") >= 0) {//图片
                    src = 'https:' + src;
                }

                var obj = {
                    'that': $(this),
                    'src': src
                };
                arr.push(obj);
            }
        });

        if (arr != '') {
            function getsBase64(arr, index) {
                if (arr.length > index) {
                    var imgUrl = arr[index].src;
                    window.URL = window.URL || window.webkitURL;
                    var xhr = new XMLHttpRequest();
                    xhr.open("get", imgUrl, true);
                    // 至关重要
                    xhr.responseType = "blob";
                    xhr.onload = function () {
                        if (this.status == 200) {
                            //得到一个blob对象
                            var blob = this.response;
                            // console.log("blob", blob);
                            // 至关重要
                            let oFileReader = new FileReader();
                            oFileReader.onloadend = function (e) {
                                let base64 = e.target.result;
                                arr[index].that.attr("xlink:href", base64);
                                index = index + 1;
                                getsBase64(arr, index);
                            };
                            oFileReader.readAsDataURL(blob);

                        }
                    };
                    xhr.send();
                } else {
                    newimgSaveHandle(w_old, h_old, idx);
                }
            }

            getsBase64(arr, 0);
        } else {
            newimgSaveHandle(w_old, h_old, idx);
        }


    }

    function newimgSaveHandle(w_old, h_old, idx) {
        var zt_iframe = $('#zt_iframe').css('display');
        if (zt_iframe != 'none') {
            var canvas = document.getElementById('canvas3');
            var serializer = new XMLSerializer();
            var svg = document.getElementById('zt_iframe').contentWindow.document.getElementById('now_svg_t');
            var source = serializer.serializeToString(svg);
            $(isIE()).find('#saveimgload').empty();
            source = '<?xml version = "1.0" standalone = "no"?>\r\n' + source;
            var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

            w_old = parseFloat(w_old);
            h_old = parseFloat(h_old);
            if (h_old > 78 || w_old > 46) {

                if (w_old > h_old) {
                    var h_now = 78 * h_old / w_old;
                    var w_now = 78;
                } else {
                    var w_now = 46 * w_old / h_old;
                    var h_now = 46;
                }
            } else {
                var h_now = h_old;
                var w_now = w_old;
            }

            canvas.width = 78;
            canvas.height = 46;
            var context = canvas.getContext("2d");
            var x = (78 - w_now) / 2;
            var y = (46 - h_now) / 2;
            context.fillStyle = 'rgba(255, 255, 255, 0)';
            var image = new Image;
            image.src = url;
            image.setAttribute('crossOrigin', 'anonymous');
            image.onload = function () {
                context.drawImage(image, 0, 0, w_old, h_old, x, y, w_now, h_now);
                var base64 = canvas.toDataURL('image/png', 1);
                backhandle[idx].base64 = base64;
                backhandle[idx].isSave = 1;
                $('#rightMoreXuanXiangka .page-list .page-item#' + idx + ' .thumb-wrap img').attr('src', base64);
                $('#rightMoreXuanXiangka .page-list .page-item#' + idx + ' .handleimging').remove();
            };
        } else {
            $('#rightMoreXuanXiangka .page-list .page-item#' + idx + ' .handleimging').remove();
            layer.closeAll();
        }
    }

    function nowGenX() {
        var index = $('#rightMoreXuanXiangka').attr('data-index');
        if (index && index != '' && index != 'undefined') {
            // var templateid = $('#zt_iframe').attr('lay-templateid');
            var font_face = [];
            $(isIE()).find("#label_main_hb div").each(function (n) {
                var faceValue = $(this).attr('faceurl');
                var faceid = $(this).attr('id');
                var facetext = $(this).find('span').text();
                var str = {};
                if (faceValue) {
                    str.url = faceValue;
                    str.faceid = faceid;
                    str.text = facetext;
                    font_face.push(str);
                }
            });

            $(isIE()).find("#now_page_select_id").attr('now_id', '');
            $(isIE()).find('#label_main_hb_h').hide();
            closeTxClick('2');


            nowhtml = $(isIE()).find('.label_main #label_main_hb').prop('outerHTML');
            backhandle[index].html = $(isIE()).find("#thHtml").html();
            backhandle[index].font_face = font_face;
            $('#zt_iframe').attr('lay-templateid', backhandle[index].templateid);
            backhandle[index].width = $(isIE()).find('.label_main #label_main_hb').attr('width');
            backhandle[index].height = $(isIE()).find('.label_main #label_main_hb').attr('height');
            if (backhandle[index].isSave == 0) {
                loadimg(nowhtml, backhandle[index].width, backhandle[index].height, index)
            }

        }
    }

// 更换当前页面
    function gengHuanYeMian(idx) {
        var isselect = $('#rightMoreXuanXiangka .page-list .page-item#' + idx).attr('class');
        var index = $('#rightMoreXuanXiangka').attr('data-index');
        $('#rightMoreXuanXiangka').attr('data-index', idx);
        $('#rightMoreXuanXiangka .page-list .page-item#' + idx).addClass('active');
        if (isselect.indexOf("active") < 0) {//替换当前页面
            if (index && index != '' && index != 'undefined') {
                $('#rightMoreXuanXiangka .page-list .page-item#' + index).removeClass('active');
            }

            $('#zt_iframe').attr('lay-templateid', backhandle[idx].templateid);
            $(isIE()).find("#thHtml").empty().append(backhandle[idx].html);

            $(isIE()).find("#thHtml #can_hb").hide();
            $(isIE()).find("#thHtml .layui-layer-shade").remove();

            var show_ad = '<svg xmlns:xlink="http://www.w3.org/1999/xlink" class="overflow-stage"\n' +
                    '                         xmlns="http://www.w3.org/2000/svg">\n' +
                    '                        <defs>\n' +
                    '                            <mask id="stage-mask">\n' +
                    '                                <rect fill="#fff" height="100%" width="100%"></rect>\n' +
                    '                                <defs>\n' +
                    '                                    <filter id="drop-shadow">\n' +
                    '                                        <feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>\n' +
                    '                                        <feOffset dx="0" dy="0" result="offsetblur"></feOffset>\n' +
                    '                                        <feFlood flood-color="rgba(66,124,144,1)"></feFlood>\n' +
                    '                                        <feComposite in2="offsetblur" operator="in"></feComposite>\n' +
                    '                                        <feMerge>\n' +
                    '                                            <feMergeNode></feMergeNode>\n' +
                    '                                            <feMergeNode in="SourceGraphic"></feMergeNode>\n' +
                    '                                        </feMerge>\n' +
                    '                                    </filter>\n' +
                    '                                </defs>\n' +
                    '                                <rect stroke="red" stroke-width="1" filter="url(#drop-shadow)" id="tGuider" fill="#000"\n' +
                    '                                      style="width: 800px; height: 600px; x: 79.5px; y: 132px;"></rect>\n' +
                    '                            </mask>\n' +
                    '                        </defs>\n' +
                    '                        <rect height="100%" mask="url(#stage-mask)" opacity="0.95"\n' +
                    '                              shape-rendering="optimizeSpeed" width="100%" fill="#FFFFFF"></rect>\n' +
                    '                    </svg>';
            var tGuiderCss = $(isIE()).find("#thHtml .t-guider #tGuider").attr('style');
            $(isIE()).find("#thHtml .t-guider").empty().append(show_ad);
            $(isIE()).find("#thHtml .t-guider #tGuider").attr('style', tGuiderCss);

            $(isIE()).find('#saveHtml').click();
            $('#zt_iframe').attr('lay-templateid', backhandle[idx].templateid);

            for (var i = 0; i < backhandle[idx].font_face.length; i++) {
                ajaxMbloatfont(backhandle[idx].font_face[i].url, backhandle[idx].font_face[i].faceid, backhandle[idx].font_face[i].text)
            }
            setTimeout(function () {
                layer.closeAll();
            }, 500);

            // 修改画布宽度
            var hbwidth = $(isIE()).find("#label_main_hb").attr('width');
            var hbheight = $(isIE()).find("#label_main_hb").attr('height');
            var bjcolor = $(isIE()).find("#label_main_hb").css('background');
            let color = '';
            if (bjcolor.indexOf("images/ps-alpha1.png") >= 0) {//背景透明
                color = "url('/images/ps-alpha1.png')";
                $('#bjColorSelectTransparent').click();
            } else {
                color = $(isIE()).find("#label_main_hb").css('background-color').colorHex();//转换为十六进制方法
                if (color[0] != '#') {
                    color = '#' + color;
                }
                $('#bjColorSelect').colpickSetColor(color);
            }
            $(isIE()).find("#label_main_hb").css('background', color);

            document.getElementById('width_right').value = hbwidth;
            document.getElementById('height_right').value = hbheight;

            // 添加移动标签
            if ($(isIE()).find("#select_style .smovest").length <= 0) {
                const bq = '<div class="smovest"><i class="iconfont">&#xe64a;</i></div>';
                $(isIE()).find("#select_style").append(bq);
            }

            $(isIE()).find('#rightHandButton').remove();
            var htmlhandle = '<div id="rightHandButton" style="visibility:hidden;"><!----><!---->\n' +
                    '    <div id="rightHandCtrlX" style="display: block;" class="rightHand_div_btns">\n' +
                    '        <div class="rightHand_div_btn_view">\n' +
                    '            <!---->\n' +
                    '            <div class="rightHand_div_btn_view"><!---->\n' +
                    '                <div class="rightHand_div_text">剪切</div>\n' +
                    '                <div class="rightHand_div_ms">Ctrl+X</div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <div id="rightHandCtrlC" style="display: block;" class="rightHand_div_btns">\n' +
                    '        <div class="rightHand_div_btn_view">\n' +
                    '            <!---->\n' +
                    '            <div class="rightHand_div_btn_view"><!---->\n' +
                    '                <div class="rightHand_div_text">复制</div>\n' +
                    '                <div class="rightHand_div_ms">Ctrl+C</div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '\n' +
                    '    <div id="rightHandCtrlV" style="display: block;" class="rightHand_div_btns">\n' +
                    '        <div class="rightHand_div_btn_view">\n' +
                    '            <!---->\n' +
                    '            <div class="rightHand_div_btn_view"><!---->\n' +
                    '                <div class="rightHand_div_text">粘贴</div>\n' +
                    '                <div class="rightHand_div_ms">Ctrl+V</div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '\n' +
                    '    <div id="rightHandDel" style="display: block;" class="rightHand_div_btns">\n' +
                    '        <div class="rightHand_div_btn_view">\n' +
                    '            <!---->\n' +
                    '            <div class="rightHand_div_btn_view"><!---->\n' +
                    '                <div class="rightHand_div_text">删除</div>\n' +
                    '                <div class="rightHand_div_ms">Del</div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '\n' +
                    '    <div id="rightHandTop" style="display: block;" class="rightHand_div_btns">\n' +
                    '        <div class="rightHand_div_btn_view">\n' +
                    '            <div class="rightHand_div_btn_view"><!---->\n' +
                    '                <div class="rightHand_div_text">上移一层</div>\n' +
                    '                <div class="rightHand_div_ms">Ctrl+]</div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <div id="rightHandBottom" style="display: block;" class="rightHand_div_btns">\n' +
                    '        <div class="rightHand_div_btn_view">\n' +
                    '            <!---->\n' +
                    '            <div class="rightHand_div_btn_view"><!---->\n' +
                    '                <div class="rightHand_div_text">下移一层</div>\n' +
                    '                <div class="rightHand_div_ms">Ctrl+[</div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <div id="rightHandTopMore" style="display: block;" class="rightHand_div_btns">\n' +
                    '        <div class="rightHand_div_btn_view">\n' +
                    '            <!---->\n' +
                    '            <div class="rightHand_div_btn_view"><!---->\n' +
                    '                <div class="rightHand_div_text">置于顶层</div>\n' +
                    '                <div class="rightHand_div_ms">Ctrl+Shift+]</div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <div id="rightHandBottomMore" style="display: block;" class="rightHand_div_btns">\n' +
                    '        <div class="rightHand_div_btn_view">\n' +
                    '            <!---->\n' +
                    '            <div class="rightHand_div_btn_view">\n' +
                    '                <div class="rightHand_div_text">置于底层</div>\n' +
                    '                <div class="rightHand_div_ms">Ctrl+Shift+[</div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <div id="HandColloct" style="display: none;" class="rightHand_div_btns">\n' +
                    '        <div class="rightHand_div_btn_view">\n' +
                    '            <div class="rightHand_div_btn_view">\n' +
                    '                <div class="rightHand_div_text">收藏</div>\n' +
                    '                <div class="rightHand_div_ms"></div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';

            $(isIE()).find("#thHtml").append(htmlhandle);

            if (vip != 2) {
                $(isIE()).find(".t-guider svg").css('background-image', 'url(https://www.yasuotu.com/images/water_shuiyin.png)');
                var shuiyin = '<div id="endShuiYin">\n' +
                        '                <button style="display: block;" >去水印编辑</button>\n' +
                        '            </div>';
                if ($(isIE()).find("#endShuiYin").length > 0) {
                    $(isIE()).find("#endShuiYin button").show();
                } else {
                    $(isIE()).find("#thHtml").append(shuiyin);
                }
            } else {
                var shuiyin = '<div style="display: none;" id="endShuiYin">\n' +
                        '                <button style="display: block;">去水印编辑</button>\n' +
                        '            </div>';
                $(isIE()).find(".t-guider svg").css('background-image', '');
                if ($(isIE()).find("#endShuiYin").length > 0) {
                    $(isIE()).find("#endShuiYin button").hide();
                } else {
                    $(isIE()).find("#thHtml").append(shuiyin);
                }
            }


            /* 保存所有元素当前图层等级
    * now_id :图层id
    * zindex:图层级别
    * */
            /* 循环查询所有的图层*/
            idNowTc = [];
            var arr = [];
            $(isIE()).find('#label_main_hb >div').each(function (e) {
                var val = parseFloat($(this).css('z-index'));
                if (isNaN(val)) {
                    val = 100;
                    $(this).css('z-index', val);
                }
                ;
                arr.push(val);
                idNowTc[$(this).attr('id')] = val;
            });
            idNowTc['arr'] = arr;
        }

    }

// 获取压缩图的第一张图片
    function yasuotuOnePic() {
        nowGenX();
        if (isqiehuanimg == 0) {
            var objimg = $(isIE('image_iframe')).find('#label_right_div #label_right_div_ul ul').eq(0);
            if (objimg.length > 0) {//存在
                // 创建对象  获取图片的宽度
                var imgss = new Image();
                // 改变图片的src
                var img_src = objimg.find('.thumb img').attr('src');
                imgss.src = img_src;

                imgss.onload = function () {
                    var now_width = width = parseFloat(imgss.width);
                    var now_height = height = parseFloat(imgss.height);
                    hangdleZindex('img_bj', 60, 1);
                    var top = '0px';
                    var left = '0px';
                    var html = "<svg id=\"ztSvgStoke\" width=\"0\" height=\"0\">\n" +
                            "                    <filter id=\"stroke_noe\">\n" +
                            "                        <feMorphology operator=\"dilate\" radius=\"6\"></feMorphology>\n" +
                            "                    </filter>\n" +
                            "                    <filter id=\"stroke_two\">\n" +
                            "                        <feMorphology operator=\"dilate\" radius=\"10\"></feMorphology>\n" +
                            "                    </filter>\n" +
                            "                </svg>\n<div rotate=\"0\" id=\"img_bj\"\n" +
                            "                 style=\"position:absolute;z-index:60;left: " + left + "; top: " + top + "; width: " + now_width + "px; height: " + now_height + "px; transform: rotate(0deg); opacity: 1;\">\n" +
                            "                <div style=\"width: 100%;height: 100%;\">\n" +
                            "                    <svg xl=\"1\" xb=\"1\" style=\"border-radius:0px;width: 100%;height: 100%;transform: scale(1, 1);\"\n" +
                            "                         height=\"100%\" height=\"100%\"\n" +
                            "                         xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\" viewBox=\"0 0 " + width + " " + height + "\">\n" +
                            "                        <defs>\n" +
                            "                        </defs>\n" +
                            "                        <image imgfilter=\"0,0,0,0,0,0\" id='ytimg' class_id=\"img_bj\" width=" + width + " height=" + height + "\n" +
                            "                               preserveAspectRatio=\"none\"\n" +
                            "                               xlink:href=\"\"\n" +
                            "                               filter=\"\"></image>\n" +
                            "                    </svg>\n" +
                            "                </div>\n" +
                            "            </div>";

                    $(isIE()).find("#label_main_hb").empty().append(html);
                    $(isIE()).find("#label_main_hb #img_bj svg image#ytimg").attr('xlink:href', img_src);


                    // 选择文字，修改右侧参数start
                    saveCursor(0);
                    $(isIE()).find('#now_page_select_id').attr('now_id', 'img_bj');
                    $('#img_parameter').show();
                    $('#form_parameter').hide();
                    $(isIE()).find('#select_style .ml_ng-star-inserted').show();
                    $(isIE()).find('#select_style .mt_ng-star-inserted').show();
                    $(isIE()).find('#select_style .mb_ng-star-inserted').show();
                    resetColorZtImg();

                    // saveKz(1,0);
                    // saveMoreBacks('', 0, 1);
                    isqiehuanimg = 1;
                    jshb(width, height);
                }
            }
        } else {
            var objimg = $(isIE('image_iframe')).find('#label_right_div #label_right_div_ul ul').eq(0);
            if (objimg.length > 0) {//存在
                var index = $('#rightMoreXuanXiangka').attr('data-index');
                if (index == isqiehuanimg) {
                    // 更换当前页
                    // gengHuanYeMian(isqiehuanimgid);
                    // 替换背景
                    // 创建对象  获取图片的宽度
                    var imgss = new Image();
                    // 改变图片的src
                    var img_src = objimg.find('.thumb img').attr('src');
                    imgss.src = img_src;
                    $(isIE()).find("#img_bj").remove();
                    imgss.onload = function () {
                        var width = parseFloat(imgss.width);
                        var height = parseFloat(imgss.height);
                        var width_right = parseFloat($('#width_right').val());//画布宽度
                        var height_right = parseFloat($('#height_right').val());//画布高度
                        if (width_right / height_right > width / height) {
                            var now_width = width_right;
                            var now_height = parseInt(width_right * height / width);
                            var top = (height_right - now_height) / 2 + 'px';
                            var left = '0px';
                        } else {
                            var now_height = height_right;
                            var now_width = parseInt(height_right * width / height);
                            var top = '0px';
                            var left = (width_right - now_width) / 2 + 'px';
                        }
                        var html = "<div rotate=\"0\" id=\"img_bj\"\n" +
                                "                 style=\"position:absolute;z-index:60;left: " + left + "; top: " + top + "; width: " + now_width + "px; height: " + now_height + "px; transform: rotate(0deg); opacity: 1;\">\n" +
                                "                <div style=\"width: 100%;height: 100%;\">\n" +
                                "                    <svg xl=\"1\" xb=\"1\" style=\"border-radius:0px;width: 100%;height: 100%;transform: scale(1, 1);\"\n" +
                                "                         height=\"100%\" height=\"100%\"\n" +
                                "                         xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\" viewBox=\"0 0 " + width + " " + height + "\">\n" +
                                "                        <defs>\n" +
                                "                        </defs>\n" +
                                "                        <image imgfilter=\"0,0,0,0,0,0\" class_id=\"img_bj\" width=" + width + " height=" + height + "\n" +
                                "                               preserveAspectRatio=\"none\"\n" +
                                "                               xlink:href=" + img_src + "\n" +
                                "                               filter=\"\"></image>\n" +
                                "                    </svg>\n" +
                                "                </div>\n" +
                                "            </div>";
                        $(isIE()).find("#label_main_hb #img_bj").remove();
                        $(isIE()).find("#label_main_hb").append(html);


                        // 选择文字，修改右侧参数start
                        saveCursor(0);
                        $(isIE()).find('#now_page_select_id').attr('now_id', 'img_bj');
                        resetColorZtImg();
                        $('#img_parameter').show();
                        $('#form_parameter').hide();
                        $(isIE()).find('#select_style .ml_ng-star-inserted').show();
                        $(isIE()).find('#select_style .mt_ng-star-inserted').show();
                        $(isIE()).find('#select_style .mb_ng-star-inserted').show();
                        saveKz(1, 0);
                    }
                }

            }

        }

    }

// 图片初始化时上传图片文件
    function int_ztuploadPic(obj) {
        nowGenX();
        $(isIE()).find('#can_hb').hide();
        $(isIE()).find('#layui-layer-shade-can').hide();
        $(isIE()).find('#uploader').hide();
        $(isIE()).find('.label_main').show();
        var now_width = width = parseFloat(obj.width);
        var now_height = height = parseFloat(obj.height);
        hangdleZindex('img_bj', 60, 1);
        var top = '0px';
        var left = '0px';
        var html = "<svg id=\"ztSvgStoke\" width=\"0\" height=\"0\">\n" +
                "                    <filter id=\"stroke_noe\">\n" +
                "                        <feMorphology operator=\"dilate\" radius=\"6\"></feMorphology>\n" +
                "                    </filter>\n" +
                "                    <filter id=\"stroke_two\">\n" +
                "                        <feMorphology operator=\"dilate\" radius=\"10\"></feMorphology>\n" +
                "                    </filter>\n" +
                "                </svg>\n<div rotate=\"0\" id=\"img_bj\"\n" +
                "                 style=\"position:absolute;z-index:60;left: " + left + "; top: " + top + "; width: " + now_width + "px; height: " + now_height + "px; transform: rotate(0deg); opacity: 1;\">\n" +
                "                <div style=\"width: 100%;height: 100%;\">\n" +
                "                    <svg xl=\"1\" xb=\"1\" style=\"border-radius:0px;width: 100%;height: 100%;transform: scale(1, 1);\"\n" +
                "                         height=\"100%\" height=\"100%\"\n" +
                "                         xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\" viewBox=\"0 0 " + width + " " + height + "\">\n" +
                "                        <defs>\n" +
                "                        </defs>\n" +
                "                        <image imgfilter=\"0,0,0,0,0,0\" id='ytimg' class_id=\"img_bj\" width=" + width + " height=" + height + "\n" +
                "                               preserveAspectRatio=\"none\"\n" +
                "                               xlink:href=\"\"\n" +
                "                               filter=\"\"></image>\n" +
                "                    </svg>\n" +
                "                </div>\n" +
                "            </div>";

        $(isIE()).find("#label_main_hb").empty().append(html);
        $(isIE()).find("#label_main_hb #img_bj svg image#ytimg").attr('xlink:href', domain + obj.path + '?time=' + (new Date()).getTime());

        // 选择文字，修改右侧参数start
        saveCursor(0);
        $(isIE()).find('#now_page_select_id').attr('now_id', 'img_bj');

        resetColorZtImg();
        $('#img_parameter').show();
        $('#form_parameter').hide();
        $(isIE()).find('#select_style .ml_ng-star-inserted').show();
        $(isIE()).find('#select_style .mt_ng-star-inserted').show();
        $(isIE()).find('#select_style .mb_ng-star-inserted').show();
        // saveKz(1,0);
        jshb(width, height);

        StopWaitLoading();
        resetColorZtImg();
        document.getElementById("zt_iframe").contentWindow.showSelect('img_bj');
        // saveMoreBacks('', 0);

    }

    function jshb(yw, yh) {
        $(isIE()).find('#can_hb').hide();
        $(isIE()).find('#layui-layer-shade-can').hide();
        $(isIE()).find('#uploader').hide();
        $(isIE()).find('.label_main').show();
        // 获取可操作区域画布宽高
        var m_w = parseFloat($(isIE()).find('.label_main_div').width()) - 740;
        var m_h = parseFloat($(isIE()).find('.label_main_div').height()) - 160;

        // 获取用户设置的画布参数
        var yw = parseFloat(yw);
        var yh = parseFloat(yh);
        var cw = yw;
        var ch = yh;
        // 判断用户设置的宽高是否查过当前视图 900*750
        // var m_w = 1000;
        // var m_h = 750;
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
                if (cw / ch > 1.2) {
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
        var color = '#FFFFFF';
        var left = (m_w - cw) / 2;
        var top = (m_h - ch) / 2;
        var css = {
            'top': top + 'px',
            'left': left + 'px',
            'width': yw + 'px',
            'height': yh + 'px',
            'background': color,
            'transform': 'scale(' + bl + ')',
            'pointer-events': 'auto',
        };

        $(isIE()).find('#label_main_hb').attr('scale', bl);
        $(isIE()).find('#label_main_hb').attr('oldscale', bl);
        $(isIE()).find('#label_main_hb').css(css);
        $(isIE()).find('#label_main_hb').attr('width', yw);
        $(isIE()).find('#label_main_hb').attr('height', yh);
        $(isIE()).find('#label_main_hb').attr('now_width', cw);
        $(isIE()).find('#label_main_hb').attr('now_height', ch);
        var cssty = {
            'y': top + 'px',
            'x': left + 'px',
            'width': yw + 'px',
            'height': yh + 'px',
        };
        $('#tGuider').css(cssty);

        // 设置右侧参数
        document.getElementById('width_right').value = yw;
        document.getElementById('height_right').value = yh;
        if (color.indexOf("images/ps-alpha1.png") >= 0) {//背景透明
            color = "url('/images/ps-alpha1.png')";
            $('#bjColorSelectTransparent').click();
        } else {
            $('#bjColorSelect').colpickSetColor(color);
        }

        MoveCenterZoom(bl);
        saveKz(1);
        return true;
    }

    function saveHbCan() {
        var yw = $(isIE()).find("#uploader ul.material .women img")[0].naturalWidth;
        var yh = $(isIE()).find("#uploader ul.material .women img")[0].naturalHeight;
        var oldWidth = $(isIE()).find('#label_main_hb').attr('width');
        var oldHeight = $(isIE()).find('#label_main_hb').attr('height');
        if (typeof (oldWidth) != "undefined" && typeof (oldHeight) != "undefined") {
            if (yw != oldWidth || yh != oldHeight) {
                var yw = parseFloat($('#width_right').val());
                var yh = parseFloat($('#height_right').val());
                if ($('#width_right').val() > 9999) {
                    layer.msg('画布宽度超过上限，最大支持9999像素', {icon: 2});
                    document.getElementById("width_right").value = 9999;
                    yw = 9999;
                } else if ($('#height_right').val() > 9999) {
                    layer.msg('画布高度超过上限，最大支持9999像素', {icon: 2});
                    document.getElementById("height_right").value = 9999;
                    yh = 9999;
                }

                var width = parseFloat($(isIE()).find('.label_main_div').width()) - 340;
                var height = parseFloat($(isIE()).find('.label_main_div').height());
                // 获取用户设置的画布参数
                var cw = yw;
                var ch = yh;
                // 判断用户设置的宽高是否查过当前视图 900*750
                var m_w = 1000;
                var m_h = 750;
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
                        if (cw / ch > 1.2) {
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
                    'top': top + 'px',
                    'left': left + 'px',
                    'width': yw + 'px',
                    'height': yh + 'px',
                    'transform': 'scale(' + bl + ')',
                    'pointer-events': 'auto',
                }
                $(isIE()).find('#label_main_hb').css(css);
                $(isIE()).find('#label_main_hb').attr('width', yw);
                $(isIE()).find('#label_main_hb').attr('height', yh);
                $(isIE()).find('#label_main_hb').attr('scale', bl);
                $(isIE()).find('#label_main_hb').attr('oldscale', bl);
                var cssty = {
                    'y': top + 'px',
                    'x': left + 'px',
                    'width': yw + 'px',
                    'height': yh + 'px',
                }
                $(isIE()).find('#tGuider').css(cssty);
                MoveCenterZoom(bl);
                saveKz();
            }

        }

    }

// 关闭通用弹出层下拉
    /*sta:0关闭全部  1：打开 2:关闭所有弹出小窗*/
    function closeTopTcC(sta) {
        if (sta == 0) {
            $('#changYongCaoZuo').hide();
            $('#top-tmdg').hide();
            $('#tool-sort-child').hide();
            $('#tool-bar-reverse-wrap').hide();
            $('#changYongCaoZuo #tool-bar-shadow').hide();
        } else if (sta == 1) {
            $('#changYongCaoZuo').show();
            $('#top-tmdg').hide();
            $('#tool-sort-child').hide();
            $('#tool-bar-reverse-wrap').hide();
            $('#changYongCaoZuo #tool-bar-shadow').hide();
        } else if (sta == 2) {
            $('#top-tmdg').hide();
            $('#tool-sort-child').hide();
            $('#tool-bar-reverse-wrap').hide();
            $('#changYongCaoZuo #tool-bar-shadow').hide();

        }
    }

    var colorAllArr = [];
    var observe;
    if (window.attachEvent) {
        observe = function (element, event, handler) {
            element.attachEvent('on' + event, handler);
        };
    } else {
        observe = function (element, event, handler) {
            element.addEventListener(event, handler, false);
        };
    }
    function init_word() {
        var leaveAMsg = document.getElementById('word');

        function resize() {
            leaveAMsg.style.height = 'auto';
            leaveAMsg.style.height = leaveAMsg.scrollHeight + 'px';
        }

        observe(leaveAMsg, 'change', resize);
        resize();
    }
    function changLable(now_id, sta = 1) {
        if (now_id) {
            var zt_w = parseFloat($(isIE()).find('#' + now_id).width());
            var zt_h = parseFloat($(isIE()).find('#' + now_id).height());
            var zt_top = $(isIE()).find('#' + now_id).css('top');
            var zt_left = $(isIE()).find('#' + now_id).css('left');
            var css = {
                'top': zt_top,
                'left': zt_left,
                'width': zt_w + 'px',
                'height': zt_h + 'px',
            };
            $(isIE()).find('#select_style').css(css);
            if (sta == 1) {
                saveKz();
            }
        }
    }
})
/**
 * 将以base64的图片数据转换为file
 */
function dataURLtoFile(dataurl, filename) {
    var filename = filename || new Date().getTime() + '.png'
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
// function sumitImageFile(base64Codes){
//     layer.load(1);
//     var formData = new FormData();
//     var fileName = new Date().getTime() + '.png'
//     formData.append('file',dataURLtoFile(base64Codes,fileName));
//     formData.append('title',fileName)
//     //ajax同步 提交form
//     var imgData = ''
//     $.ajax({
//         headers:{
//             Authorization:  windowToken
//         },
//         url: windowAddress + 'web/resource/saveResourcePicture',
//         type : "POST",
//         data : formData,
//         async: false,
//         processData : false,         // 告诉jQuery不要去处理发送的数据
//         contentType : false,        // 告诉jQuery不要去设置Content-Type请求头
//         success:function(data){
//             if(data.code==='00000'){
//                 layer.closeAll('loading')
//                 layer.msg('上传成功',{icon:1})
//                 imgData =  data.data
//             }else {
//                 layer.closeAll('loading')
//                 layer.msg('上传失败，请重试',{icon:2})
//             }
//
//         },
//         error:function(){
//             layer.closeAll('loading')
//             layer.msg('上传失败，请重试',{icon:2})
//         }
//     });
//     return imgData
// }
// 修改操作框缩放比例
function rotateSuoFangBli() {
    let newscale = parseFloat($(isIE('image_iframe')).find('#label_main_hb').attr('scale'));
    let bll = 1 / newscale;
    let csscao = {
        'transform': 'scale(' + bll + ',' + bll + ')',
    };
    $(isIE('image_iframe')).find('.mb_ng-star-inserted,.mt_ng-star-inserted,.ml_ng-star-inserted,.mr_ng-star-inserted,.ng-star-inserted').css(csscao);

    let tops = 35;
    if (bll > 2) {
        tops = 35 * (bll / 2);
    }
    let cssr = {
        'transform': 'scale(' + bll + ',' + bll + ')',
        'top': '-' + tops + 'px',
    };
    $(isIE('image_iframe')).find('.rotate').css(cssr);
}
// 保存图片
// $('#two_dh .navbar-nav1 #savePicBtn').click(function(){
//     var baseData = $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('xlink:href')
//    var valUpload =  $(isIE('image_iframe')).find('#isUpload').val()
//     const handleimg = imghandle.handleimg;
//     if(handleimg !=''){
//         layer.msg('请先确定图片操作再保存图片',{icon:2})
//     }else{
//         sumitImageFile(baseData)
//     }
//
// })
// 父页面调用
function parertFn(){
    var baseData = $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('xlink:href')
    const handleimg = imghandle.handleimg;
    if(handleimg !=''){
        layer.msg('请先确定图片操作再保存图片',{icon:2})
    }else{
        layer.load(1);
        var formData = new FormData();
        var fileName = initUrl + '.png'
        if(initUrl.title){
            var file_name =initUrl.title.replace(/(.*\/)*([^.]+).*/ig,"$2");
            fileName = file_name + '.png'
        }else{
            fileName = new Date().getTime() + '.png'
        }
        Object.keys(initUrl).map((key) => {
            if(key!== 'url'){
                formData.append(key,initUrl[key]);
            }
        });
        formData.append('file',dataURLtoFile(baseData));
        //ajax同步 提交form
        var imgData = ''
        $.ajax({
            headers:{
                Authorization:  windowToken
            },
            url: windowAddress + 'web/resource/saveResourcePicture',
            type : "POST",
            data : formData,
            async: false,
            processData : false,         // 告诉jQuery不要去处理发送的数据
            contentType : false,        // 告诉jQuery不要去设置Content-Type请求头
            success:function(data){
                if(data.code==='00000'){
                    layer.closeAll('loading')
                    layer.msg('上传成功',{icon:1})
                    imgData =  data.data
                }else {
                    layer.closeAll('loading')
                    layer.msg('上传失败，请重试',{icon:2})
                }
            },
            error:function(){
                layer.closeAll('loading')
                layer.msg('上传失败，请重试',{icon:2})
            }
        });
        return imgData
    }
}
// 上传图片
// $('#two_dh .navbar-nav1 #clickChooesPic').click(function(){
//     layer.confirm('此操作将清空当前图片', {
//         btn: ['确定','取消'],
//     }, function(index, layero){
//         $(isIE('image_iframe')).find('#shangchauntupoian').click()
//         layer.close(index);
//     }, function(index, layero){
//         layer.close(index);
//     });
//
// })

