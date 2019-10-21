
    // layui.use(['upload', 'jquery', 'layer'], function () {
    //     var layer = layui.layer, upload = layui.upload, $ = layui.jquery
        var disX = 0;
        var disY = 0;
        var minZindex = 1;
        var evTimeStamp = 0;
        var origin;
        var is_moveing = false;
        var $wrap = $('#uploader');
        var $queue = $('<ul class="material" ></ul>').appendTo($wrap.find('.queueList'));
        var $reset = $wrap.find('.resetBtn');
        var $placeHolder = $wrap.find('.placeholder');
        var fileCount = 0;
        var fileSize = 0;
        var state = 'pedding';
        //初始化圖片地址
        function initServerFile() {
            if (parent.window.initUrl) {
                getBase64ByUrl(parent.window.initUrl.url, function(base64Img){
                    parent.window.initUrl.url = base64Img
                    fileQueue(parent.window.initUrl)
                });
            }
        }
        $('#shangchauntupoian').change(function(){
            var reader=new FileReader();
            reader.onload=function(e){
                parent.window.initUrl.url = reader.result
                fileQueue(parent.window.initUrl)
            }
            reader.readAsDataURL(this.files[0])
        })
        //设置图片携带属性并加入到页面中
        function fileQueue(file) {
            if(!file) return false
            window.initUrl = file
            parent.$('.Hui-article-box').css('margin-right', '0px');
            $placeHolder.addClass('element-invisible');
            addFile(file);
        }
        // 将url转换为base64
        var getBase64ByUrl = function(src, callback, outputFormat) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', src, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function(e) {
                if (xhr.status == 200) {
                    var uInt8Array = new Uint8Array(xhr.response);
                    var i = uInt8Array.length;
                    var binaryString = new Array(i);
                    while (i--) {
                        binaryString[i] = String.fromCharCode(uInt8Array[i]);
                    }
                    var data = binaryString.join('');
                    var base64 = window.btoa(data);
                    var dataUrl = "data:" + (outputFormat || "image/png") + ";base64," + base64;
                    callback.call(this, dataUrl);
                }
            };
            xhr.send();
        }
        //添加页面缩略图中
        function addFile(file) {
            layer.load(1, {shade: [1,'#fff'] //不透明度的白色背景
            });
            windowImgId = file.id||0;
            var $li = $('<li class="default img-ng-star-inserted checked"  data-src="' + file.url + '" draggable="true" id="' + file.id + '">' +
                    '<div class="img">' +
                    '<div  class="women"></div>' +
                    '</div></li>'),

                    $wrap = $li.find('div.women')
            //添加预览大图
            var img = $('<img draggable="true" src="' + file.url + '">');
            img.bind('load', setDragEvent); //绑定拖动事件
            $wrap.empty().append(img);
            $queue.empty()
            parent.imghandle = {
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
            $li.appendTo($queue);
        }
        //图片拖动事件绑定
        function setDragEvent() {
            $(this).on('drop', function (e) { //元素正在拖动时触发
                var $from = $(origin).parents('li');
                var $to = $(e.target).parents('li');
                var origin_pos = $from.position();
                var target_pos = $to.position();
                var from_sort = $from.attr('data-sort');
                var to_sort = $to.attr('data-sort');

                $from.addClass('move').animate(target_pos, "fast", function () {
                    $(this).removeClass('move');
                }).attr('data-sort', to_sort);

                $to.addClass('move').animate(origin_pos, 'fast', function () {
                    $(this).removeClass('move');
                }).attr('data-sort', from_sort);
            }).on('dragstart', function (e) { // 开始拖动时触发
                if (is_moveing) {
                    return false;
                }
                is_moveing = true;
                e.originalEvent.dataTransfer.effectAllowd = 'move';
                origin = this;
            }).on('dragover', function (e) { //释放拖动
                if (e.preventDefault)
                    e.preventDefault();
                is_moveing = false;
                e.originalEvent.dataTransfer.dropEffect = 'move';
            });
            qiehuantupian()
        }
        // 点击缩略图
        $("body").delegate("#uploader ul.material li .women", "click", function (e) {
            qiehuantupian();
            /* 阻止冒泡事件*/
            return false;
            e.stopPropagation();
        });
        // 点击预览
        $("body").delegate("#uploader ul.filelist li .saveimghh,#uploader ul.filelist li .info p .yulan", "click", function (e) {
            alert('extend-webupload-292行')
            qiehuantupian()
            /* 阻止冒泡事件*/
            return false;
            e.stopPropagation();
        });
        $('#morePicHandle').on('click', function () {
            qiehuantupian();
        });
        /*点击预览图片*/
        function qiehuantupian() {
            /** 获取图片原始宽高   兼容到IE9*/
            var now_width = $("#uploader ul.material .women img")[0].naturalWidth;
            var now_height =  $("#uploader ul.material .women img")[0].naturalHeight;
            var now_src =  $("#uploader ul.material .women img").attr('src');
            $('#label_main_hb').attr('width', now_width);
            $('#label_main_hb').attr('height', now_height);
            var viewBox = '0,0,' + now_width + ',' + now_height;
            document.querySelector('#label_main_hb #svg_now').setAttribute("viewBox", viewBox);
            $('#label_main_hb #svg_now').attr('width', now_width);
            $('#label_main_hb #svg_now').attr('height', now_height);
            $('#label_main_hb #svg_now').find('#ytimg').attr('xlink:href', now_src);
            $('#label_main_hb #svg_now').find('#ytimg').attr('width', now_width);
            $('#label_main_hb #svg_now').find('#ytimg').attr('height', now_height);
            initialize(now_width, now_height);
        }
        // 初始化编辑框
        function initialize(now_width, now_height) {
            $('.label_main').show();
            $('#uploader').hide();
            // 可操作距离宽高
            var width = parseFloat($('.label_main_div').width());
            var height = parseFloat($('.label_main_div').height());
            // 图片放入操作框缩放后宽高
            var cw = parseFloat(now_width);
            var ch = parseFloat(now_height);
            // 判断用户设置的宽高是否查过当前视图 900*750
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
            // 关联左侧折叠菜单
            var isele = parent.$("#imgRight dl dt[lay-id='imgCropDt']").attr('class');
            if (isele == 'selected') {
                parent.intCropImg();
            }
            var iseles = parent.$("#imgRight dl dt[lay-id='imgRotate']").attr('class');
            if (iseles == 'selected') {
                parent.intxuanzhuanImg();
            }
            layer.closeAll('loading')
            // parent.parameterImg();
        }










        //更新服务端附件
        function updateServerFiles() {
            var postData = {};
            $('[data-src="server"]').each(function (index, obj) {
                postData[$(obj).attr('data-key')] = $(obj).attr('data-sort');
            });
            $.ajax({
                type: 'post',
                url: window.webuploader.updateUrl,
                data: postData,
                dataType: 'json',
                success: function (data) {
                    //setState('finish');
                    alert('更新成功');
                    setState('ready');
                    uploader.reset();
                }
            });
        }

        // //更新webuploader中的状态
        // function updateStatus() {
        //     if (state == 'ready') {
        //         text = '选中' + fileCount + '张图片，共' + WebUploader.formatSize(fileSize) + '.';
        //     } else if (state == 'confirm') {
        //         stats = uploader.getStats();
        //         if (stats.uploadFailNum) {
        //             text = '已成功上传' + stats.successNum + '张图片，' + stats.uploadFailNum + '张图片上传失败';
        //         }
        //     } else {
        //         stats = uploader.getStats();
        //         text = '共 ' + fileCount + ' 张（' +
        //                 WebUploader.formatSize(fileSize) +
        //                 '），<span id="msg_info" >已上传</span> ' + stats.successNum + ' 张';
        //         text += "<span class='yasuoTip' style='color: #4EA0E6; margin-left: 15px;'></span>";
        //         if (stats.uploadFailNum) {
        //             text += ',失败' + stats.uploadFailNum + '张';
        //         }
        //         if (stats.successNum > 1) {
        //             text += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" id="download_all" style="padding: 3px 6px; display: none;" class="btn btn-success btn-small"><i class="icon-download-alt icon-white"></i> 打包下载.zip</a>';
        //         }
        //         if (parent.yst_all_size > 0) {
        //             var _all_ysl = 100 - (parent.yst_all_size / parent.before_all_size * 100);
        //             text += '<p>压缩后（' + WebUploader.formatSize(parent.yst_all_size) + '），总压缩率 ： ' + _all_ysl.toFixed(2) + '% </p>';
        //         } else {
        //             text += '<p></p>';
        //         }
        //     }
        //     $info.html(text);
        //     //打包下载
        // }

        $("body").delegate("#download_all", "click", function (e) {
            // $('#download_all').on('click',function () {
            ajaxValidation();
            return false;
        });

        //上传完成
        // uploader.on('uploadSuccess', function (file, data) {
        //     if (data.status == 1) {
        //         $('.success').remove();
        //         $('#' + file.id).find('a.gallery-img').attr('href', data.href);
        //         $('.footer-inserted').show();
        //         $('.ckecked_num').html($('#uploader li.checked').length);
        //         $('#' + file.id).find('p.state').text('已上传');
        //         $('ul.material #' + file.id).attr('data-key', data.md5);
        //         $('ul.filelist #' + file.id).attr('data-key', data.md5);
        //         // $('<input type="hidden" name="file['+file.id+']" value="'+data.md5+'">').appendTo(parent.$('#imageurl'));
        //
        //         $('<input type="hidden" name="file[' + file.id + ']" value="' + data.md5 + '">').appendTo(parent.$('#imageurl'));
        //         $('<input type="hidden" name="file[' + file.id + ']" value="' + data.md5 + '">').appendTo(parent.$('#imageurlzjz'));
        //         $('<input type="hidden" name="file[' + file.id + ']" value="' + data.md5 + '">').appendTo(parent.$('#imageurlcoloreplace'));
        //         $('<input type="hidden" name="file[' + file.id + ']" value="' + data.md5 + '">').appendTo(parent.$('#imageurlgeshi'));
        //         $('<input type="hidden" name="file[' + file.id + ']" value="' + data.md5 + '">').appendTo(parent.$('#imageurlcolorbutton'));
        //         $('<input type="hidden" name="file[' + file.id + ']" value="' + data.md5 + '">').appendTo(parent.$('#imagegif'));
        //         $('<input type="hidden" name="file[' + file.id + ']" value="' + data.md5 + '">').appendTo(parent.$('#imagepng'));
        //         $('<input type="hidden" name="file[' + file.id + ']" value="' + data.md5 + '">').appendTo(parent.$('#imagejpg'));
        //         $('<input type="hidden" name="file[' + file.id + ']" value="' + data.md5 + '">').appendTo(parent.$('#imagesize'));
        //         $('<p class="msg_' + file.id + '" style="color: #4EA0E6;margin-top: 100px;margin-left: 157px;font-size: 14px;" >处理中,请稍后 ...</p>').appendTo($('#' + file.id));
        //     }/*else {
        //      $('.success').remove();
        //      $('<p class="error">'+data.info+'</p>').appendTo( $('#'+file.id) );
        //      $('#'+file.id).addClass('error');
        //      }*/
        // });
        /*恢复上传框初始状态*/
        $reset.on('click', function () {
            //location.reload();
            //timeout = false;
            clearTimeout(parent.t);
            parent.timeout = false;
            // $('.filelist').removeClass('filelist').addClass('material');//
            $('#isUpload').val('');
            parent.$('#imageurl,#imageurlzjz,#imageurlcoloreplace,#imageurlgeshi,#imageurlcolorbutton,#imagegif,#imagepng,#imagejpg,#imagesize').html('');
            // 移除所有缩略图并将上传文件移出上传序列
            for (var i = 0; i < uploader.getFiles().length; i++) {
                // 将图片从上传序列移除
                uploader.removeFile(uploader.getFiles()[i]);
                //uploader.removeFile(uploader.getFiles()[i], true);
                //delete uploader.getFiles()[i];
                // 将图片从缩略图容器移除
                var $li = $('#' + uploader.getFiles()[i].id);
                $li.off().remove();
            }

            $('#uploader .queueList .material').empty();
            $('#uploader .queueList .filelist').empty();

            // $('#dndArea').removeClass('element-invisible');
            state = 'asd';
            // 重置文件总个数和总大小
            fileCount = 0;
            fileSize = 0;
            $('#isUpload').attr('lay-qiqan', '0');
            $('.progress').css({'width': '198px'});
            $('#uploadBtn').removeClass('disabled');
            // 重置uploader，目前只重置了文件队列
            parent.imghandle = [];
            // 更新状态等，重新计算文件总个数和总大小
            // updateStatus();
        });

        initServerFile();
    // });


function imgdbl_shuiyin(width, height, w, h) {
    // 宽高
    var now_w = 0;
    var now_h = 0;
    var w = parseFloat(w);
    var h = parseFloat(h);
    var width = parseFloat(width);
    var height = parseFloat(height);
    var bl = width / height;
    var oldbl = w / h;
    if (bl > oldbl) {
        now_w = w;
        now_h = (w * height / width).toFixed(3);
    } else {
        now_h = h;
        now_w = (h * width / height).toFixed(3);
    }

    var obj = {};
    obj.w = parseFloat(now_w);
    obj.h = parseFloat(now_h);
    return obj;
}





