// 鍥剧墖涓婁紶鍓嶉瑙堟彃浠�
//Power By 鍕惧浗鍗�
//QQ:245629560
//Blog:http://www.gouguoyin.cn
(function($){
    $.fn.uploadView = function(options){
        var defaults = {
            uploadBox: '.js_uploadBox', //璁剧疆涓婁紶妗嗗鍣�
            showBox : '.js_showBox', //璁剧疆鏄剧ず棰勮鍥剧墖鐨勫鍣�
            width : 200, //璁剧疆棰勮鍥剧墖鐨勫搴�
            height: 200, //璁剧疆棰勮鍥剧墖鐨勯珮搴�
            allowType: ["gif", "jpeg", "jpg", "bmp", "png"],
            maxSize: 1, //璁剧疆鍏佽涓婁紶鍥剧墖鐨勬渶澶у昂瀵革紝鍗曚綅M
            success:$.noop //涓婁紶鎴愬姛鏃剁殑鍥炶皟鍑芥暟
        };
        var config = $.extend(defaults, options);

        var showBox = config.showBox;
        var uploadBox = config.uploadBox;
        var width = config.width;
        var height = config.height;
        var allowType = config.allowType;
        var maxSize = config.maxSize;

        var success = config.success;

        $(this).each(function(i){
            $(this).change(function(e){
                handleFileSelect($(this), width, height, allowType, maxSize, success);
            });
        });

        var handleFileSelect = function(obj, _w, _h, _type, _size, _callback){

            if (typeof FileReader == "undefined") {
                return false;
            }
            var thisClosest = obj.closest(uploadBox);
            if (typeof thisClosest.length == "undefined") {
                return;
            }

            var files = obj[0].files;
            var f = files[0];
            if (!isAllowFile(f.name, _type)) {
                alert("鍥剧墖绫诲瀷蹇呴』鏄�" + _type.join("锛�") + "涓殑涓€绉�");
                return false;
            }

            var fileSize = f.size;

            var maxSize = _size*1024*1024;

            if(fileSize > maxSize){
                alert('涓婁紶鍥剧墖瓒呭嚭鍏佽涓婁紶澶у皬锛�1M锛�');
                return false;
            }

            var reader = new FileReader();
            reader.onload = (function(theFile){
                return function (e) {
                    var tmpSrc = e.target.result;
                    if (tmpSrc.lastIndexOf('data:base64') != -1) {
                        tmpSrc = tmpSrc.replace('data:base64', 'data:image/jpeg;base64');
                    } else if (tmpSrc.lastIndexOf('data:,') != -1) {
                        tmpSrc = tmpSrc.replace('data:,', 'data:image/jpeg;base64,');
                    }
                    // 鍒涘缓瀵硅薄  鑾峰彇鍥剧墖鐨勫搴�
                    var imgss = new Image();
                    // 鏀瑰彉鍥剧墖鐨剆rc
                    imgss.src = tmpSrc;
                    imgss.onload = function () {
                        var obj = imgdbl_shuiyin(imgss.width,imgss.height,150,50);
                        var img = '<img style="width:'+obj.w+'px;height:'+obj.h+'px;" width="'+imgss.width+'" height="'+imgss.height+'" class="js_logoBox" src="' + tmpSrc + '"/>';
                        $(showBox).html(img);
                        thisClosest.find(showBox).show().html(img);
                        if (_w && _h) {
                            cssObj = { 'width':_w+'px', 'height':_h+'px' };
                        } else if (_w) {
                            cssObj = { 'width':_w+'px' };
                        } else if (_h) {
                            cssObj = { 'height':_h+'px' };
                        } else {
                            cssObj = { 'max-width':'360px', 'max-height':'200px' };
                        }
                        thisClosest.find(showBox+" img").css( cssObj );
                        //$(showBox).find('img').css(cssObj);
                        _callback();
                    };

                };
            })(f)
            reader.readAsDataURL(f);

        }


        //鑾峰彇涓婁紶鏂囦欢鐨勫悗缂€鍚�
        var getFileExt = function(fileName){
            if (!fileName) {
                return '';
            }

            var _index = fileName.lastIndexOf('.');
            if (_index < 1) {
                return '';
            }

            return fileName.substr(_index+1);
        };
        //鏄惁鏄厑璁镐笂浼犳枃浠舵牸寮�
        var isAllowFile = function(fileName, allowType){

            var fileExt = getFileExt(fileName).toLowerCase();
            if (!allowType) {
                allowType = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
            }

            if ($.inArray(fileExt, allowType) != -1) {
                return true;
            }
            return false;

        }

    };


})(jQuery);



jQuery.extend({
    unselectContents: function(){
        if(window.getSelection)
            window.getSelection().removeAllRanges();
        else if(document.selection)
            document.selection.empty();
    }
});
jQuery.fn.extend({
    selectContents: function(){
        $(this).each(function(i){
            var node = this;
            var selection, range, doc, win;
            if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection()) && typeof selection.removeAllRanges != 'undefined'){
                range = doc.createRange();
                range.selectNode(node);
                if(i == 0){
                    selection.removeAllRanges();
                }
                selection.addRange(range);
            } else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())){
                range.moveToElementText(node);
                range.select();
            }
        });
    },

    setCaret: function(){
        if(!$.browser.msie) return;
        var initSetCaret = function(){
            var textObj = $(this).get(0);
            textObj.caretPos = document.selection.createRange().duplicate();
        };
        $(this).click(initSetCaret).select(initSetCaret).keyup(initSetCaret);
    },

    insertAtCaret: function(textFeildValue){
        var textObj = $(this).get(0);
        if(document.all && textObj.createTextRange && textObj.caretPos){
            var caretPos=textObj.caretPos;
            caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ?
                    textFeildValue+'' : textFeildValue;
        } else if(textObj.setSelectionRange){
            var rangeStart=textObj.selectionStart;
            var rangeEnd=textObj.selectionEnd;
            var tempStr1=textObj.value.substring(0,rangeStart);
            var tempStr2=textObj.value.substring(rangeEnd);
            textObj.value=tempStr1+textFeildValue+tempStr2;
            textObj.focus();
            var len=textFeildValue.length;
            textObj.setSelectionRange(rangeStart+len,rangeStart+len);
            textObj.blur();
        }else{
            textObj.value+=textFeildValue;
        }
    }
});
