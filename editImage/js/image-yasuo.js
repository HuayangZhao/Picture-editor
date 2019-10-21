
$(function () {
    // 初始化
    window.onload=function(){
        let clientHeight = document.body.clientHeight;
        if(!clientHeight){
            clientHeight = 800;
        }
        let top = $('#imgRight').offset().top;
        if(top){
            top = parseFloat(top)+30;
        }else{
            top = 125;
        }
        $('#imgRight').css('max-height',clientHeight-top+'px');
        $('#gundongtiaoUl').css('max-height',clientHeight-top+'px');
        // $imgfun
        switch ($imgfun) {
            case 'moban':/*模板*/
                top = $('#gundongtiaoClass').offset().top;
                if(top){
                    top = parseFloat(top)+30;
                }else{
                    top = 125;
                }
                $('#mbselect #gundongtiaoClass').css('max-height',clientHeight-top+'px');
                break;
            case 'lvjing':/*水印*/
                var css = {
                    'width':'99px',
                    'height':'99px',
                };
                $('#meihuaimg_pic ul').each(function(n) {
                    var viewBox = '0,0,600,600';
                    $(this).find('image').attr('xlink:href','/filterzt.jpg?time='+new Date().getTime());
                    $(this).attr('viewBox',viewBox);
                    $(this).find('svg').css(css);
                });
                setTimeout(function(){
                    let gtop=$('#meihuaimg_pic').offset().top-200;
                    $('#imgRight').animate({'scrollTop':gtop},500);
                }, 200);
                break;
            case 'editor':/*图片裁剪*/
                checkBrowser();
                setTimeout(function(){
                    let gtop=$('#crop_img_index').offset().top-200;
                    $('#imgRight').animate({'scrollTop':gtop},500);
                }, 200);
                break;
            case 'xuanzhaun':/*图片旋转*/
                checkBrowser();
                break;
            case "baibian":/*添加边框*/
                setTimeout(function(){
                    let gtop=$('#tab_demo').offset().top-200;
                    $('#imgRight').animate({'scrollTop':gtop},500);
                }, 200);
                break;
            case "jiazi":/*图片加字*/
                obj = $("#ztselect ul li[lay-id='1']");
                $('#ztselect').attr('lay-id','0');
                ZtClick(obj);
                top = $('#ZtFlStyle').offset().top;
                if(top){
                    top = parseFloat(top)+46;
                }else{
                    top = 125;
                }
                $('#ZtFlStyle').css('max-height',clientHeight-top+'px');
                break;
            case "ps":/*ps*/
                $("#left-Hui-aside dl[data-classtype='formxz']").click();
                break;
        }
    };
    //修改尺寸
    $('.btn-compres-dispose').on('click',function () {
        // 保存当前提交的方法
        fun = $(this).attr('lay-data');
        $('#imgRight').attr('value',fun);
        savefuns(fun);
        var width = $('#yasuo_width_size_h').val()
        var height = $('#yasuo_height_size_h').val()
        var basesrc = $(isIE('image_iframe')).find("#label_main_hb #svg_now #ytimg").attr('xlink:href');
        var formData = new FormData();
        formData.append('file',dataURLtoFile(basesrc));
        formData.append('width',width);
        formData.append('height',height);
        layer.load(1, {shade: [0.5,'#000']
        });
        $.ajax({
            headers:{
                Authorization:  windowToken
            },
            url: windowAddress + 'web/resource/resizePicture',
            type : "POST",
            data : formData,
            async: false,
            processData : false,         // 告诉jQuery不要去处理发送的数据
            contentType : false,        // 告诉jQuery不要去设置Content-Type请求头
            success:function(res){
                if(res.code==='00000'){
                    layer.closeAll('loading')
                    var contentW = $("#image_iframe")[0].contentWindow
                    contentW.getBase64ByUrl(res.data, function(base64Img){
                        initUrl.url = base64Img
                        contentW.fileQueue(initUrl)
                        layer.msg('处理成功')
                        $("#imgRight dl dt[lay-id='tianjiashuiyin']").click();
                    });
                }else {
                    layer.closeAll('loading')
                    layer.msg('处理失败，请重试',{icon:2})
                }
            },
            error:function(){
                layer.closeAll('loading')
                layer.msg('处理失败，请重试',{icon:2})
            }
        });

    });
    $('#tab_shuiyin .tabBar span').on('click',function (){
        var val = $(this).text();
        if(val == '图片水印'){
            $('#tab_shuiyin').attr('value',0);
        }else{
            $('#tab_shuiyin').attr('value',1);
        }
    });
    //添加水印切换
    $.Huitab("#tab_shuiyin .tabBar span","#tab_shuiyin .tabCon","current","click","0");
    $("#file-input").uploadView({
        uploadBox: '.js_uploadBox',//设置上传框容器
        showBox : '.js_showBox',//设置显示预览图片的容器
        width : 150, //预览图片的宽度，单位px
        height : 50, //预览图片的高度，单位px
        allowType: ["jpeg", "jpg", "png"], //允许上传图片的类型
        maxSize :1, //允许上传图片的最大尺寸，单位M
        success:function(e){
            let now_id = $(isIE('image_iframe')).find('#label_right_div').attr('lay-imgid');
            watermarkBalance(now_id);

            //alert('图片上传成功');
        }
    });
    //切换字体和图片处理选项卡
    $('.menu-left').on('click',function () {
        var type = $(this).data('menu');
        closeSuGuanJianCi();
        if(type == 'image'){
            $(this).addClass('act').siblings().removeClass('act');
            $('.bk_1').show();
            $('.bk_2').hide();
            $('.bk_3').hide();
            // $('.Hui-article-box').css('margin-right','240px');
            $('#image_iframe').show();
            $('#zt_iframe').hide();
            $('#mbselect #gundongtiaoUl .fhsc').click();
            $('#bjselect ul').empty();
            $('#two_dh .two_dh ul li.savecolor span.genxin').hide();
            closeTopTcC(0);
            $('#t-taskbar').hide();
            $('#suCaiSearch').fadeOut(200);
            imgshow();
            $('#wrapper .left_images_i').css('background-color','#e2e2e2');
        }else{
            var classtype = $(this).data('classtype');
            if(classtype==''){
                return false;
            }else{
                $(this).addClass('act').siblings().removeClass('act');
                checkBrowser();
                $('#wrapper .left_images_i').css('background-color','rgb(250, 250, 250)');
                let taskbar = $('#t-taskbar').attr('lay-data');
                if(taskbar=='1'){
                    $('#t-taskbar').show();
                }
                // initScreenSaver();
                // 获取工具栏第一张图片放入字体
                $('#two_dh .two_dh ul li.savecolor span.genxin').show();
                closeTopTcC(1);
                // yasuotuOnePic();/*调取工具第一张图片*/
                show();
                $('.bk_1').hide();
                $('.bk_2').show();
                $('.bk_3').show();

                // $('.Hui-article-box').css('margin-right','240px');
                $('#image_iframe').hide();
                $('#zt_iframe').show();
                let clientHeight = document.body.clientHeight;
                if(!clientHeight){
                    clientHeight = 800;
                }
                let top = 125;
                switch (classtype){
                    case 'mb':
                        $('#mbselect ul#gundongtiaoUlold').empty();
                        $('#updateselect ul.gundongtiao').empty();
                        $('#ztwenben').hide();
                        $('#ztselect').hide();
                        $('#bjselect').hide();
                        $('#scselect').hide();
                        $('#txkselect').hide();
                        $('#updateselect').hide();
                        $('#formxz').hide();
                        $('#mbselect').show();

                        // $('#mbselect ul').empty();
                        $('#bjselect ul').empty();
                        $('#txkselect ul').empty();
                        $('#formxz #formxzli').empty();
                        $('#scselect #fhsc .fhsc').click();
                        $('#ZtFlStyle').empty();
                        $('#ptfy').empty();

                        // 返回一级素材
                        $('#mbselect .gundongtiao').show();
                        $('#mbselect #gundongtiaoUl').hide();
                        $('#mbselect').attr('lay-mold',0);
                        $('#mbselect').attr('lay-page',1);

                        var page = 1;
                        var _token = $('meta[name="csrf-token"]').attr('content');
                        $.ajax({
                            cache: true,
                            type: "POST",
                            url: '/v2/getAllMbList',
                            data:{'page':page,'_token':_token},// 你的formid
                            async: true,
                            error: function(request) {
                                layer.msg("失败");
                                layer.close(index);
                            },
                            success: function(res) {
                                $('#mbselect ul#gundongtiaoUlold').attr('lay-page',page);
                                if(res == 0){
                                    $('#mbselect ul#gundongtiaoUlold').attr('lay-data',0);
                                }else{
                                    if(res.length<30){
                                        $('#mbselect ul#gundongtiaoUlold').attr('lay-data',0);
                                    }else{
                                        $('#mbselect ul#gundongtiaoUlold').attr('lay-data',1);
                                    }

                                    var html = '';
                                    for (var i=0;i<res.length;i++){
                                        html+='<li id="findMbClick" lay-data="'+res[i].id+'" class=""><img class="bj_img" src="https://img.yasuotu.com'+res[i].thumbsrc+'?time='+new Date().getTime()+'"></li>';
                                    }
                                    $('#mbselect ul#gundongtiaoUlold').empty().append(html);
                                }

                            }
                        });

                        //
                        top = $('#gundongtiaoClass').offset().top;
                        if(top){
                            top = parseFloat(top)+30;
                        }else{
                            top = 125;
                        }
                        $('#mbselect #gundongtiaoClass').css('max-height',clientHeight-top+'px');

                        break;
                    case 'wb':
                        $('#mbselect ul#gundongtiaoUlold').empty();
                        $('#updateselect ul.gundongtiao').empty();
                        // $('#mbselect ul').empty();

                        $('#mbselect #gundongtiaoUl .fhsc').click();

                        $('#bjselect ul').empty();
                        $('#txkselect ul').empty();
                        $('#formxz #formxzli').empty();
                        $('#scselect #fhsc .fhsc').click();
                        $('#ZtFlStyle').empty();
                        $('#ptfy').empty();
                        $('#ztwenben').show();
                        $('#ztselect').hide();
                        $('#bjselect').hide();
                        $('#scselect').hide();
                        $('#txkselect').hide();
                        $('#updateselect').hide();
                        $('#formxz').hide();
                        $('#mbselect').hide();


                        break;
                    case 'zt':
                        $('#mbselect ul#gundongtiaoUlold').empty();
                        $('#updateselect ul.gundongtiao').empty();
                        $('#mbselect #gundongtiaoUl .fhsc').click();

                        $('#bjselect ul').empty();
                        $('#txkselect ul').empty();
                        $('#formxz #formxzli').empty();
                        $('#scselect #fhsc .fhsc').click();
                        $('#ztselect').show();
                        $('#ztwenben').show();
                        // $('#ztwenben').hide();
                        $('#bjselect').hide();
                        $('#scselect').hide();
                        $('#txkselect').hide();
                        $('#updateselect').hide();
                        $('#formxz').hide();
                        $('#mbselect').hide();

                        let old_select = $('#ztselect').attr('lay-id');
                        $(obj).find('a').addClass('activezt');
                        $.ajax({
                            cache: true,
                            type: "POST",
                            url: '/v2/findfont',
                            data: {
                                'typeid': old_select,
                                '_token':$("meta[name='csrf-token']").attr('content'),
                            },// 你的formid
                            async: true,
                            error: function (request) {
                            },
                            success: function (res) {
                                $('#ZtFlStyle').empty();
                                var data = res['arr'];
                                var count = data.length;
                                var html = "";
                                for (var i = 0; i < count; i++) {
                                    html += '<li onclick="ZtFlClick(this)" lay-data="'+data[i]['src']+'"  class="fl new_zt_li new_img_li"><img class="zt_img" src="https://img.yasuotu.com'+data[i]['show_img']+'"></li>';
                                }
                                $('#ZtFlStyle').append(html);

                                $('#ptfy').empty();
                                var fHtml = '';
                                if(res['lastPage']>1){
                                    var fl = '';
                                    for (var i = 1; i < res['lastPage']+1; i++) {
                                        if(i==1){
                                            fl+='<li  onclick="fy(this)" value="1" class="activef"><a value="1" data-href="javascript:void(0);" data-title="1" href="javascript:void(0);">1</a></li>';
                                        }else if(i==5){
                                            if(res['lastPage']>7){
                                                fl+='<li  onclick="fy(this)" value="none" ><a value="none" data-href="javascript:void(0);" data-title="'+i+'" href="javascript:void(0);">…</a></li>';
                                            }else{
                                                fl+='<li  onclick="fy(this)" value="'+i+'"><a value="'+i+'" data-href="javascript:void(0);" data-title="'+i+'" href="javascript:void(0);">'+i+'</a></li>';
                                            }
                                        }else if(i<res['lastPage']-1&&i>5){

                                        }else{
                                            fl+='<li  onclick="fy(this)" value="'+i+'"><a value="'+i+'" data-href="javascript:void(0);" data-title="'+i+'" href="javascript:void(0);">'+i+'</a></li>';
                                        }
                                    }
                                    fHtml +='<input id="nowxz" type="hidden" value="1"/>\n' +
                                            '            <input id="allpage" type="hidden" value="'+res["lastPage"]+'"/>\n' +
                                            '                    <ul class="pagination">\n' +
                                            // '                        <li  onclick="fy(this)" value="shouye"><a value="shouye" data-href="javascript:void(0);" data-title="首页" href="javascript:void(0);">首页</a></li>\n' +
                                            '                        <li  onclick="fy(this)" value="prev" title="上一页"><a value="prev" data-href="javascript:void(0);" data-title="上一页" href="javascript:void(0);">«</a></li>\n' +fl+'\n'+
                                            '                        <li  onclick="fy(this)" title="下一页" value="next"><a value="next" data-href="javascript:void(0);" data-title="下一页" href="javascript:void(0);" rel="next">»</a></li>\n' +
                                            // '                        <li  onclick="fy(this)" value="last"><a value="last" data-href="javascript:void(0);" data-title="末页" href="javascript:void(0);">末页</a></li>\n' +
                                            // '                        <li disabled style="margin-left:10px;line-height: 28px;" class="addnum"><span class="ymspan">共<b>'+res["lastPage"]+'</b> 页</span></li>\n' +
                                            '                    </ul>\n';
                                }

                                $('#ptfy').append(fHtml);

                            }
                        });



                        top = $('#ZtFlStyle').offset().top;
                        if(top){
                            top = parseFloat(top)+46;
                        }else{
                            top = 125;
                        }
                        $('#ZtFlStyle').css('max-height',clientHeight-top+'px');
                        break;
                    case 'bj':
                        $('#mbselect ul#gundongtiaoUlold').empty();
                        $('#updateselect ul.gundongtiao').empty();
                        $('#mbselect #gundongtiaoUl .fhsc').click();
                        $('#txkselect ul').empty();
                        $('#formxz #formxzli').empty();
                        $('#scselect #fhsc .fhsc').click();
                        $('#ZtFlStyle').empty();
                        $('#ptfy').empty();
                        $('#ztwenben').hide();
                        $('#ztselect').hide();
                        $('#bjselect').show();
                        $('#scselect').hide();
                        $('#txkselect').hide();
                        $('#updateselect').hide();
                        $('#formxz').hide();
                        $('#mbselect').hide();
                        // 加载背景图片
                        var _token = $('meta[name="csrf-token"]').attr('content');
                        var page = 1;
                        var select = $('#ztClassTexture').attr('value');
                        $('#ztClassTexture').attr('page',1);
                        $.ajax({
                            cache: true,
                            type: "POST",
                            url: '/v2/getBjImg',
                            data:{
                                'class':select,
                                'page': page,
                                '_token':_token},// 你的formid
                            async: true,
                            error: function(request) {
                                layer.msg("失败");
                                layer.close(index);
                            },
                            success: function(res) {
                                if(res){
                                    var html = '';
                                    for (var i=0;i<res.length;i++){
                                        html+='<li onclick="bjImgClick(this)" lay-data="'+res[i].id+'" class="fl bj_li img_li"><img lay-src="https://img.yasuotu.com'+res[i].src+'?time='+new Date().getTime()+'" class="bj_img" src="https://img.yasuotu.com/'+res[i].thumbsrc+'?time='+new Date().getTime()+'"></li>'
                                    }
                                    $('#bjselect ul').empty().append(html);
                                }
                            }
                        });

                        top = $('#bjselect ul.gundongtiao').offset().top;
                        if(top){
                            top = parseFloat(top)+30;
                        }else{
                            top = 125;
                        }
                        $('#bjselect ul.gundongtiao').css('max-height',clientHeight-top+'px');
                        break;
                    case 'sc':
                        $('#mbselect ul#gundongtiaoUlold').empty();
                        $('#updateselect ul.gundongtiao').empty();
                        $('#mbselect #gundongtiaoUl .fhsc').click();
                        $('#bjselect ul').empty();
                        $('#txkselect ul').empty();
                        $('#formxz #formxzli').empty();
                        $('#ZtFlStyle').empty();
                        $('#ptfy').empty();
                        $('#ztwenben').hide();
                        $('#ztselect').hide();
                        $('#bjselect').hide();
                        $('#scselect').show();
                        $('#txkselect').hide();
                        $('#update_sc').hide();
                        $('#formxz').hide();
                        $('#mbselect').hide();
                        $('#updateselect').hide();
                        // 返回一级素材
                        $('#scselect .gundongtiao').show();
                        $('#scselect #fhsc').hide();
                        $('#scselect').attr('lay-mold',0);
                        $('#scselect').attr('lay-page',1);

                        top = $('#scselect ul.gundongtiao').offset().top;
                        if(top){
                            top = parseFloat(top)+30;
                        }else{
                            top = 125;
                        }
                        $('#scselect ul.gundongtiao').css('max-height',clientHeight-top+'px');


                        break;
                    case 'txk':
                        $('#mbselect ul#gundongtiaoUlold').empty();
                        $('#updateselect ul.gundongtiao').empty();
                        $('#mbselect #gundongtiaoUl .fhsc').click();
                        $('#bjselect ul').empty();
                        $('#scselect #fhsc .fhsc').click();
                        $('#formxz #formxzli').empty();
                        $('#ZtFlStyle').empty();
                        $('#ptfy').empty();
                        $('#ztwenben').hide();
                        $('#ztselect').hide();
                        $('#bjselect').hide();
                        $('#scselect').hide();
                        $('#txkselect').show();
                        $('#formxz').hide();
                        $('#updateselect').hide();
                        $('#mbselect').hide();
                        // 查询字体特效
                        var _token = $('meta[name="csrf-token"]').attr('content');
                        $.ajax({
                            cache: true,
                            type: "POST",
                            url: '/v2/getTxkselect',
                            data:{'_token':_token},// 你的formid
                            async: true,
                            error: function(request) {
                                layer.msg("失败");
                                layer.close(index);
                            },
                            success: function(res) {
                                if(res){
                                    var html = '';
                                    for (var i=0;i<res.length;i++){
                                        html+="<li lay-id='"+res[i].id+"' lay-classif='"+res[i].classif+"' lay-txparam='"+res[i].txparam+"' lay-ptparam='"+res[i].ptparam+"' onclick='bjTeXiaoClick(this)' layj lay-data='"+res[i].type+"' class='zt_li img_li'><img class='tx_zt_img' src='https://img.yasuotu.com/"+res[i].img_src+"?time="+new Date().getTime()+"'></li>"
                                    }
                                    $('#txkselect ul').append(html);
                                }
                            }
                        });

                        $('#txkselect ul.gundongtiao').css('max-height',clientHeight-135+'px');
                        break;
                    case 'update_sc':/*获取用户自己上传的背景图*/
                        $('#mbselect ul#gundongtiaoUlold').empty();
                        $('#mbselect #gundongtiaoUl .fhsc').click();
                        $('#bjselect ul').empty();
                        $('#txkselect ul').empty();
                        $('#scselect #fhsc .fhsc').click();
                        $('#formxz #formxzli').empty();
                        $('#ZtFlStyle').empty();
                        $('#ptfy').empty();
                        $('#ztwenben').hide();
                        $('#ztselect').hide();
                        $('#bjselect').hide();
                        $('#scselect').hide();
                        $('#txkselect').hide();
                        $('#formxz').hide();
                        $('#updateselect').show();
                        $('#mbselect').hide();
                        // 查询字体特效
                        var _token = $('meta[name="csrf-token"]').attr('content');
                        $.ajax({
                            cache: true,
                            type: "POST",
                            url: '/v2/getUserBjImg',
                            data:{'page':1,'_token':_token},// 你的formid
                            async: true,
                            error: function(request) {
                                layer.msg("失败");
                                layer.close(index);
                            },
                            success: function(res) {
                                if(res){
                                    var html = '';
                                    for (index in res){
                                        html += '<li data-src="'+res[index].path+'" data-height="'+res[index].height+'" data-width="'+res[index].width+'" id="'+res[index].id+'" data-key="'+res[index].md5+'" lay-data="" class="fl"><div><img atl="'+res[index].filename+'" class="sc_img" src="https://img.yasuotu.com'+res[index].thumbpath+'?timestamp='+ new Date().getTime()+'"></div><p class="remove-btn"><i class="iconfont">&#xe617;</i></p></li>';
                                    }
                                    $('#updateselect ul.gundongtiao').empty().prepend(html);
                                }
                            }
                        });



                        $('#updateselect ul.gundongtiao').css('max-height',clientHeight-220+'px');
                        break;
                    case 'formxz':
                        $('#mbselect ul#gundongtiaoUlold').empty();
                        $('#updateselect ul.gundongtiao').empty();
                        $('#mbselect #gundongtiaoUl .fhsc').click();
                        $('#bjselect ul').empty();
                        $('#txkselect ul').empty();
                        $('#scselect #fhsc .fhsc').click();
                        $('#ZtFlStyle').empty();
                        $('#ptfy').empty();
                        $('#ztwenben').hide();
                        $('#ztselect').hide();
                        $('#bjselect').hide();
                        $('#scselect').hide();
                        $('#txkselect').hide();
                        $('#updateselect').hide();
                        $('#formxz').show();
                        $('#mbselect').hide();

                        // 查询字体形状
                        var _token = $('meta[name="csrf-token"]').attr('content');


                        $.ajax({
                            cache: true,
                            type: "POST",
                            url: '/v2/getFormxz',
                            data:{'_token':_token},// 你的formid
                            async: true,
                            error: function(request) {
                                layer.msg("失败");
                                layer.close(index);
                            },
                            success: function(res) {
                                if(res){
                                    var html = '';
                                    for (var i=0;i<res.length;i++){
                                        html+='<div class="formxzclassif" id="style_'+res[i].name+'">\n' +
                                                '                        <div class="formzt_title_top">\n' +
                                                '                            <div class="formzt_title_line"></div>\n' +
                                                '                            <div class="formzt_title" style="clear: both;" name="'+res[i].name+'">'+res[i].title+'</div>\n' +
                                                '                            <div class="formzt_title_line"></div>\n' +
                                                '                        </div>\n';
                                        for(var j=0;j<res[i].child.length;j++){
                                            html+='<li onclick="XzImgClick(this)" lay-data="'+res[i].child[j].id+'" class="fl xz_bj_li img_li"><img class="formxz_img" src="https://img.yasuotu.com/'+res[i].child[j].src+'?time='+new Date().getTime()+'"></li>'
                                        }
                                        html+='</div>';
                                    }
                                    $('#formxz #formxzli').append(html);
                                    $("#formxz ul li[data-title='all']").click();
                                }
                            }
                        });


                        top = $('#formxzli').offset().top;
                        if(top){
                            top = parseFloat(top)+30;
                        }else{
                            top = 125;
                        }
                        $('#formxzli').css('max-height',clientHeight-top+'px');
                        break;


                }
            }

        }
    });
    $('#imgRight dl dt').on('click',function () {
        const layid = $(this).attr('lay-id'); //sizeyasuo
        const val = $(this).attr('class'); //select
        const disbj = $(isIE('image_iframe')).find('.label_main').css('display');
        var src = window.initUrl.url;
        if(disbj=='none' && layid!='sizeyasuo'){
            // 添加水印，裁剪 旋转会进来
            $(isIE('image_iframe')).find('.label_main').show();
            $(isIE('image_iframe')).find('#uploader').hide();
            hangdelIMgCaoZuoKuang(layid,val,src);
            $(isIE('image_iframe')).find('#uploadJpg,#uploadPng,#uploadBmp,#uploadWebp').show();
            $(isIE('image_iframe')).find('#uploadGif').hide();
        }else{
            document.getElementById('yasuo_width_size_h').value = imghandle.width = $(isIE('image_iframe')).find('#ytimg').attr('width');
            document.getElementById('yasuo_height_size_h').value = imghandle.height = $(isIE('image_iframe')).find('#ytimg').attr('height');
            hangdelIMgCaoZuoKuang(layid,val,src)
        }
    });
    // 处理操作框
    function hangdelIMgCaoZuoKuang(layid,val,src){
        var src =src|| parent.window.initUrl.url;
        const handleimg = imghandle.handleimg;
        alert(isMoreHandleImg)
        if(isMoreHandleImg===1){
            isMoreHandleImg = 0;
            layer.confirm('是否应用当前修改？', {
                btn: ['应用', '取消'] //按钮
            }, function(index, layero){
                isgaibian =layid;
                btnsuccess(handleimg,'2');
                $("#imgRight dl dt[lay-id='"+isgaibian+"']").click();
                layer.close(index);
            }, function(index, layero){
                reStroCs(handleimg,'2');
                twoHandle(layid,val);
                layer.close(index);
            });
        }else{
            if(layid!='imgRotate'){
                reStroCs('tupianxuanzhuan','2');
            }else{
                if(val !='selected'){
                    reStroCs('tupianxuanzhuan','2');
                }
            }
            twoHandle(layid,val);
        }
    }
    function twoHandle(layid,val){
        isgaibian = '0';
        $(isIE('image_iframe')).find('#imgCjk').hide();
        $(isIE('image_iframe')).find('#freeRotate').hide();
        $(isIE('image_iframe')).find('#label_main_hb').css('box-shadow','rgba(0, 0, 0, 0.1) 0px 0px 2px');
        if(val ==='selected'){
            switch (layid){
                case "imgCropDt":/*图片裁剪*/
                    checkBrowser();
                    intCropImg();
                    setTimeout(function(){
                        let gtop=$('#crop_img_index').offset().top-200;
                        $('#imgRight').animate({'scrollTop':gtop},500);
                    }, 200);
                    break;
                case "imgRotate":/*图片旋转*/
                    checkBrowser();
                    $(isIE('image_iframe')).find('#label_main_hb').css('box-shadow','');
                    intxuanzhuanImg();
                    break;
            }
        }
    }
    // 监听水印文字变化
    $('#shuiyin_text').keyup(function () {
        $(isIE('image_iframe')).find('#text_span').text($(this).val());
        watermarkBalance();
      });
    // 图片旋转参数调节
    $('.img-xz li').on('click',function () {
        let val = $(this).attr('lay-data');
        var tupiancanzuo = $('#image_iframe').css('display');
        if(tupiancanzuo!='none'){
            imgRotateCan(val,'');
        }
    });

    // 图片裁剪监听宽度变化宽度
    $('#yasuo_crop_width').keyup(
            function () {
                var val = $(this).val();

                var oldwidth = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('width'));
                var oldheight = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('height'));

                if(val == ''){
                    val = 0;
                    document.getElementById('yasuo_crop_height').value = 0;
                }else if(parseFloat(val)>oldwidth){
                    val = oldwidth;
                }

                var cjbl = parent.$('#cropImgIndex').attr('bl');
                /*根据设定比例判断缩放值*/
                var cjblarr = cjbl.split(',');
                var blx = parseFloat(cjblarr[0]);
                var bly = parseFloat(cjblarr[1]);
                var p = {};
                p.width = val;
                p.height = document.getElementById('yasuo_crop_height').value;

                if(blx > 0 && bly > 0){/*根据比例设置参数*/
                    p.height = p.width*bly/blx;
                    if(p.height>oldheight){
                        p.height = oldheight;
                        p.width = p.height*blx/bly;
                    }
                }
                saveSelect(blx,bly,p,oldwidth,oldheight)
            }
    );
    // 图片裁剪监听宽度变化宽度
    $('#yasuo_crop_height').keyup(
            function () {
                var val = $(this).val();
                var oldwidth = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('width'));
                var oldheight = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('height'));
                if(val == ''){
                    val = 0;
                    document.getElementById('yasuo_crop_width').value = 0;
                }else if(parseFloat(val)>oldheight){
                    val = oldheight;
                }

                var oldwidth = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('width'));
                var oldheight = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('height'));
                var cjbl = parent.$('#cropImgIndex').attr('bl');
                /*根据设定比例判断缩放值*/
                var cjblarr = cjbl.split(',');
                var blx = parseFloat(cjblarr[0]);
                var bly = parseFloat(cjblarr[1]);
                var p = {};
                p.width = document.getElementById('yasuo_crop_width').value;
                p.height = val;
                if(blx > 0 && bly > 0){/*根据比例设置参数*/
                    p.width = p.height*blx/bly;
                    if(p.width>oldwidth){
                        p.width = oldwidth;
                        p.height = p.width*bly/blx;
                    }
                }
                saveSelect(blx,bly,p,oldwidth,oldheight)
            }
    );

    // 监听自定义参数宽
    $('#yasuo_width_size').keyup(
            function () {
                // let now_id = $(isIE('image_iframe')).find('#label_right_div').attr('lay-imgid');
                // var imgsize = imghandle[now_id].imgsize;
                // var imgsizeArr = imgsize.split(",");
                // if(imgsizeArr[1].indexOf("set") >= 0){
                //     if(now_id){
                //         if(imgsizeArr[7] == '2'||imgsizeArr[7] == '3'&&imgsizeArr[0]=='2'){
                //             imgsizeArr[7] = '3';
                //             imgsizeArr[0] = '1';
                //             imgsize = imgsizeArr.join(",");
                //             imghandle[now_id].imgsize = imgsize;
                //
                //             $('#isimgBx').attr('lay_value','1');
                //             $('#isimgBx').next().click();
                //         }else if(imgsizeArr[0]!='1'){
                //             imgsizeArr[7] = '1';
                //         }
                //         imgsize = imgsizeArr.join(",");
                //         imghandle[now_id].imgsize = imgsize;
                //     }
                // }
                imgSize('width',$(this).val())
            }
    );

    // 监听自定义参数高
    $('#yasuo_height_size').keyup(
            function () {
                // let now_id = $(isIE('image_iframe')).find('#label_right_div').attr('lay-imgid');
                // var imgsize = imghandle[now_id].imgsize;
                // var imgsizeArr = imgsize.split(",");
                // if(imgsizeArr[1].indexOf("set") >= 0){
                //     if(now_id){
                //         if(imgsizeArr[7] == '1'||imgsizeArr[7] == '3'&&imgsizeArr[0]=='2'){
                //             $('#isimgBx').attr('lay_value','1');
                //             $('#isimgBx').next().click();
                //             var imgsize = imghandle[now_id].imgsize;
                //             var imgsizeArr = imgsize.split(",");
                //             imgsizeArr[7] = '3';
                //             imgsizeArr[0] = '1';
                //             imgsize = imgsizeArr.join(",");
                //             imghandle[now_id].imgsize = imgsize;
                //         }else if(imgsizeArr[0]!='1'){
                //             imgsizeArr[7] = '2';
                //         }
                //         imgsize = imgsizeArr.join(",");
                //         imghandle[now_id].imgsize = imgsize;
                //     }
                // }

                imgSize('height',$(this).val())
            }
    );


    // 图片裁剪参数
    // 图片添加边框参数
    /*监听左上边宽度*/
    $('#yasuo_top_left_border').keyup(function () {
            imgCrop('bordertl',$(this).val());
        }
    );
    /*监听右上上边宽度*/
    $('#yasuo_top_right_border').keyup(function () {
                imgCrop('bordertr',$(this).val());
            }
    );
    /*监听左下边宽度*/
    $('#yasuo_bottom_left_border').keyup(function () {
                imgCrop('borderbl',$(this).val());
            }
    );
    /*监听右下边宽度*/
    $('#yasuo_bottom_right_border').keyup(function () {
                imgCrop('borderbr',$(this).val());
            }
    );
    // 圆角颜色
    $('#imgInputYjColor').bind("input propertychange change", function (event) {
        var color = $(this).val();
        if(color[0]!='#'){
            color = '#'+color;
        }
        document.getElementById('imgInputYjColor').value=color;
        $('#imgYjColor').colpickSetColor(color);
    });

    $('#imgYjColor').colpick({
        color: 'FFFFFF',
        layout: 'rgbhex',
        submitText: '确认颜色',
        onHide:function(el){
            let color = colorHexZt($(el).find('.colpick_current_color').css('background-color'));
            $('#imgYjColor').css('background-color',color);
            document.getElementById('imgInputYjColor').value=color;
            imgCrop('yuanjiaocolor',color)
        },
        onSubmit: function (hsb,hex,rgb,el) {
            let color = '#'+hex;
            $(el).colpickHide();
            $(el).css('background-color',color);
            document.getElementById('imgInputYjColor').value=color;
            imgCrop('yuanjiaocolor',color)
        },onChange:function(hsb,hex,rgb,el,bySetColor) {
            let color = '#'+hex;
            if(!bySetColor) $(el).val(hex);
            $('#imgYjColor').css('background-color',color);
            imgCrop('yuanjiaocolor',color)
        }
    });


    $('#imgbjcolor').colpick({
        color: 'FFFFFF',
        layout: 'rgbhex',
        submitText: '确认颜色',
        onHide:function(el){
            let color = colorHexZt($(el).find('.colpick_current_color').css('background-color'));
            $('#imgbjcolor').css('background-color',color);
            document.getElementById('imgcjbjcolor').value=color;
            imgRotateCan('bjcolor',color);
        },
        onSubmit: function (hsb,hex,rgb,el) {
            let color = '#'+hex;
            $(el).colpickHide();
            $(el).css('background-color',color);
            document.getElementById('imgcjbjcolor').value=color;
            imgRotateCan('bjcolor',color);
        },onChange:function(hsb,hex,rgb,el,bySetColor) {
            let color = '#'+hex;
            if(!bySetColor) $(el).val(hex);
            $('#imgbjcolor').css('background-color',color);
            imgRotateCan('bjcolor',color);
        }
    });

    // 添加文字水印颜色
    $('#shuiyinColor').colpick({
        color: '000000',
        layout: 'rgbhex',
        submitText: '确认颜色',
        onHide:function(el){
            let color = colorHexZt($(el).find('.colpick_current_color').css('background-color'));
            $('#shuiyinColor').css('background-color',color);
            $('#shuiyinColor').attr('value',color);
            let now_id = $(isIE('image_iframe')).find('#label_right_div').attr('lay-imgid');
            watermarkBalance(now_id);
        },
        onSubmit: function (hsb,hex,rgb,el) {
            let color = '#'+hex;
            $(el).colpickHide();
            $(el).css('background-color',color);
            $('#shuiyinColor').attr('value',color);
            let now_id = $(isIE('image_iframe')).find('#label_right_div').attr('lay-imgid');
            watermarkBalance(now_id);

        },onChange:function(hsb,hex,rgb,el,bySetColor) {
            let color = '#'+hex;
            if(!bySetColor) $(el).val(hex);
            $('#shuiyinColor').css('background-color',color);
            $('#shuiyinColor').attr('value',color);
            let now_id = $(isIE('image_iframe')).find('#label_right_div').attr('lay-imgid');
            watermarkBalance(now_id);
        }
    });



    $("#bkcolor").bind("input propertychange change", function (event) {
        var color = $(this).val();
        if(color[0]!='#'){
            color = '#'+color;
        }
        var css = {
            'border-color': color
        };
        $('#bkcolor').css(css).val(color);
        $('#biankuangColor .layui-colorpicker-trigger-span').css('background',color);
        $('#biankuangColor .layui-colorpicker-trigger-span i').addClass('layui-icon-down').removeClass('layui-icon-close');
    });
});


function saveSelect(blx,bly,p,oldwidth,oldheight){
    p.width = parseInt(p.width);
    p.height = parseInt(p.height);
    p.x = (oldwidth-p.width)/2;
    p.y = (oldheight-p.height)/2;
    var css = {
        'width':p.width+'px',
        'height':p.height+'px',
        'left':p.x+'px',
        'top':p.y+'px',
    };
    $(isIE('image_iframe')).find('#imgCjk #select_style').css(css);
    var cssi = {
        'width':p.width+'px',
        'height':p.height+'px',
        'x':p.x+'px',
        'y':p.y+'px',
    };

    $(isIE('image_iframe')).find('#imgCjk .t-guider #tGuider').css(cssi);
    $(isIE('image_iframe')).find('#imgCjk .t-guider #tGuiderRect').attr('width',oldwidth);
    $(isIE('image_iframe')).find('#imgCjk .t-guider #tGuiderRect').attr('height',oldheight);


    document.getElementById('yasuo_crop_width').value = p.width;
    document.getElementById('yasuo_crop_height').value = p.height;


    var cssba = {
        'background-position-x': -p.x + 'px',
        'background-position-y': -p.y + 'px',
    };
    $(isIE('image_iframe')).find("#label_main_hb #imgCjk .e-border").css(cssba);

}

/*修改裁剪框尺寸*/
function  saveDrowImg(types,blx,bly){
    if(bly == ''){
        bly = 0;
    }
    blx = parseFloat(blx);
    bly = parseFloat(bly);
    const oldwidth = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('width'));
    const oldheight = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('height'));

    var width = oldwidth;
    var height = oldheight;
    if(types == '1'){/*按比例裁剪*/
        if(blx>bly){/*宽大于高*/
            width = oldwidth/2;
            height = width*bly/blx;
        }else{/*高大于宽*/
            height = oldheight/2;
            width = height*blx/bly;
        }
    }else{/*固定尺寸裁剪*/
        if(bly == 0){
            width = blx;
            height = oldheight;
        }else if(oldwidth>=blx && oldheight>=bly){
            width = blx;
            height = bly;
        }else{
            if(oldwidth<blx && oldheight>=bly){
                width = oldwidth;
                height = width*bly/blx;
            }else if(oldwidth>=blx && oldheight<bly){
                height = oldheight;
                width = height*blx/bly;
            }else {
                if (oldwidth/oldheight>blx/bly) {/*宽大于高*/
                    height = oldheight;
                    width = height * blx / bly;
                } else {/*高大于宽*/
                    width = oldwidth;
                    height = width * bly / blx;
                }
            }
        }
    }

    width = parseInt(width);
    height = parseInt(height);

    var left = (oldwidth-width)/2;
    var top = (oldheight-height)/2;
    var css = {
        'width':width+'px',
        'height':height+'px',
        'left':left+'px',
        'top':top+'px',
    };
    $(isIE('image_iframe')).find('#imgCjk #select_style').css(css);
    var cssi = {
        'width':width+'px',
        'height':height+'px',
        'x':left+'px',
        'y':top+'px',
    };
    $(isIE('image_iframe')).find('#imgCjk .t-guider #tGuider').css(cssi);
    $(isIE('image_iframe')).find('#imgCjk .t-guider #tGuiderRect').attr('width',oldwidth);
    $(isIE('image_iframe')).find('#imgCjk .t-guider #tGuiderRect').attr('height',oldheight);
    $('#cropImgIndex').attr('bl',blx+','+bly);

    if(types == '2'){/*固定尺寸*/
        if(bly == 0){
            bly = oldheight;
        }
        document.getElementById('yasuo_crop_width').value=blx;
        document.getElementById('yasuo_crop_height').value=bly;
    }else{
        document.getElementById('yasuo_crop_width').value=width;
        document.getElementById('yasuo_crop_height').value=height;
    }

    var cssba = {
        'background-position-x': -left + 'px',
        'background-position-y': -top + 'px',
    };
    $(isIE('image_iframe')).find("#label_main_hb #imgCjk .e-border").css(cssba);
}


jQuery.Huitab =function(tabBar,tabCon,class_name,tabEvent,i){
    var $tab_menu=$(tabBar);
    // 初始化操作
    $tab_menu.removeClass(class_name);
    $(tabBar).eq(i).addClass(class_name);
    $(tabCon).hide();
    $(tabCon).eq(i).show();
    $tab_menu.bind(tabEvent,function(){
        $tab_menu.removeClass(class_name);
        $(this).addClass(class_name);
        var index=$tab_menu.index(this);
        $(tabCon).hide();
        $(tabCon).eq(index).show()
    });
};


var fun = 'index';
var oldfun = '';
var ismoreSizeImg = 0;/*判断上传的图片是否过大0：正常 1：过大提示压缩*/
function savefuns(fun='index') {
    fun=fun;
}
var oldNum = 0;
var newNum = 0;

// 判断是否修改
var isgaibian = '0';
/*ajax异步修改原图*/
function ajax_save_old_imgs() {
    var data={
        'md5':$(isIE('image_iframe')).find('#download_all_md5').attr('value'),
        "_token":$("meta[name='csrf-token']").attr('content')
    };
    $.ajax({
        cache: true,
        type: "POST",
        url:'/v2/uploads/ajaxsavefiles',
        data:data,// 你的formid
        async: true,
        error: function(request) {
            layer.msg("处理失败");
        },
        success: function(res) {
            uploads();
        }
    });
}
// ajax异步上传图片
function ajax_uploads(){
    var file_id;
    $(isIE('image_iframe')).find('.filelist li').each(function(index){
         file_id = $(this).attr('id');
        $(this).find('p.success').remove();
        $(this).find('p.msg_'+file_id).remove();
        var html = $(this).find('div.successInfo p:eq(0)').html();
        $(this).find('div.successInfo').html(html);
        $(this).find('.msg_'+file_id).remove();
        $('<p class="msg_'+file_id+'" style="color: #4EA0E6;margin-top: 124px;margin-left: 170px;font-size: 14px;" >处理中,请稍后 ...</p>').appendTo( $(this) );
    });
    oldfun = fun;
    var imghandle = parent.imghandle;
        var data={
            base64:'',
            id:file_id,
            _token: "bearer "  + localStorage.getItem('token'),
        };
    saveImgUploads(data,file_id,imghandle);
}

function saveImgUploads(data,now_id,imghandle) {
    // 生成新图片
    var canvas = document.createElement("canvas");
    var width = imghandle.svg.width;
    var height = imghandle.svg.height;
    var type = '';
    switch (ext){
        case 'jpg'://image/jpeg
            type = 'image/jpeg';
            var $bjcolor = 'rgba(255,255,255,1)';
            break;
        case 'png'://png
            type = 'image/png';
            var $bjcolor = 'rgba(255,255,255,0)';
            break;
        case 'gif'://gif
            type = 'image/gif';
            var $bjcolor = 'rgba(255,255,255,1)';
            break;
        default://默认
            type = 'image/jpeg';
            var $bjcolor = 'rgba(255,255,255,1)';
            break;
    }
    let bjcolor = imghandl.bjcolor;
    if(bjcolor&&bjcolor!=''){
        $bjcolor = bjcolor;
    }
    /* 重新生成图片修改图片背景色*/
    $('#saveimgsyd').empty().append(imghandle.svg.svg);
    $('#saveimgsyd svg').attr('id','saveSvg');
    $('#saveimgsyd #saveSvg').css('background',$bjcolor);
    var serializer = new XMLSerializer();
    var svg = document.getElementById('saveSvg');
    var source = serializer.serializeToString(svg);
    source = '<?xml version = "1.0" standalone = "no"?>\r\n' + source;
    var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
    $('#saveimgsyd').empty();
    /*记录图片保存时的svg*/
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d");
    var image = new Image;
    image.src = url;
    image.crossOrigin = '';
    image.onload = function () {
        context.drawImage(image, 0, 0);
        data.base64 = canvas.toDataURL(type, 1);
        $.ajax({
            cache: true,
            type: "POST",
            url: window.seter.address + 'web/resource/saveResourcePicture',
            data:data,// 你的formid
            async: true,
            error: function(request) {
                layer.msg("处理失败");
            },
            success: function(res) {
                $(isIE('image_iframe')).find('#uploader .filelist #' + res.id +' p.state').text('已上传');
                $(isIE('image_iframe')).find('#uploader .material #' + res.id +' p.state').text('已上传');
                $(isIE('image_iframe')).find('#uploader .material #' + res.id ).attr('data-key',res.md5);
                // $('<p class="msg_'+res.id+'" style="color: #4EA0E6;margin-top: 100px;margin-left: 157px;font-size: 14px;" >处理中,请稍后 ...</p>').appendTo( $(isIE('image_iframe')).find('#'+res.id) );

                imghandle.isChange=0;
                parent.imghandle =imghandle;
                if(oldNum == newNum){//上传完成
                    uploads();
                    $(isIE('image_iframe')).find('.btn_upload').hide();
                    $(isIE('image_iframe')).find('.resetBtn').show();
                    $(isIE('image_iframe')).find('#filePicker3').text('重新上传');
                }
            }
        });
    };
}
function uploads() {
    oldfun = fun;
    $(isIE('image_iframe')).find('.filelist li').each(function(index){
        var file_id = $(this).attr('id');
        switch (fun){
            case 'size'://图片改大小
                // addFuns(file_id,'size');
                parent.imghandle.funs = 'size';
                ismoreSizeImg=0;
                break;
            default://图片压缩\
                // addFuns(file_id,'index');
                parent.imghandle.funs = 'index';
                ismoreSizeImg=0;
                break;
        }
        $(this).find('p.success').remove();
        $(this).find('p.msg_'+file_id).remove();
        $('<p class="msg_'+file_id+'" style="color: #4EA0E6;margin-top: 124px;margin-left: 170px;font-size: 14px;" >处理中,请稍后 ...</p>').appendTo( $(this) );
    });
    /* 判断处理的是哪种事件*/
    switch (fun){
        case 'size'://图片改大小
            var url = $('#form-compres-size').attr('action');
            var data = $('#form-compres-size').serialize();
            break;
        default://图片压缩\
            var url = $('#form-compres-dispose').attr('action');
            var data = $('#form-compres-dispose').serialize();
            break;
    }
    $.ajax({
        cache: true,
        type: "POST",
        url:url ,
        data:data,// 你的formid
        async: true,
        error: function(request) {
            layer.msg("处理失败");
        },
        headers:{
            Authorization:  "bearer "  + localStorage.getItem('token')
        },
        success: function(data) {
            if(data.code==='00000'){
                layer.msg('操作成功',{'icon':2});
            }
        }
    });
}
var before_all_size=0,yst_all_size=0;
var timeout = false; //启动及关闭按钮
var param=[];
var t;
function chaxun() {
    if(timeout){
        $('#loading').hide();
        $('.filelist').show();
        $('.statusBar').show();
        stopChaxun();
        return;
    }
    getCompresQueueInfo();
    t = setTimeout(chaxun,5000);
}
/**
 * 停止查询
 */
function stopChaxun() {
    clearTimeout(t)
}
/**
 * 轮询查询
 */
function getCompresQueueInfo(){
    var color = document.getElementById('zjzChangeColor').value;
    var oldext = 'jpg';
    $.ajax({
        url:'/v2/compres/compresQueueInfo',
        type:'post',
        data:{'files':param,'fun':fun,'color':color,'oldext':oldext},
        dataType:'json',
        success:function(data){
            if(data.status == 0){
                param = [];
                uploadNum = 0;
                timeout = true;
            }else {

                jicode();
                param = [];
                $.each(data.data , function(index, item) //遍历json数据
                {
                    if(item.code == 'success'){

                        var timestamp = (new Date()).getTime();
                        var domains = '//'+document.domain;
                        if (domains.indexOf("www.yasuotu.com") >= 0) {//图片
                            var imgUrl = 'https:'+domains+ item.hrefold + '?' + timestamp;
                        }else{
                            var imgUrl = 'http:'+domains+ item.hrefold + '?' + timestamp;
                        }

                        window.URL = window.URL || window.webkitURL;
                        var xhr = new XMLHttpRequest();
                        xhr.open("get", imgUrl, true);
                        // 至关重要
                        xhr.responseType = "blob";
                        xhr.onload = function () {
                            if (this.status == 200) {
                                //得到一个blob对象
                                var blob = this.response;
                                // 至关重要
                                let oFileReader = new FileReader();
                                oFileReader.onloadend = function (e) {
                                    item.base64 = e.target.result;
                                    parent.imghandle.svg.url=item.base64;
                                    $(isIE('image_iframe')).find("#label_right_div_ul ul#"+nowid+" img").attr('src',item.base64);
// 判断是否是当前编辑
                                    const oldimgid = $(isIE('image_iframe')).find('#label_right_div').attr('lay-imgid');
                                    if(oldimgid == nowid){
                                        $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('xlink:href',item.base64);
                                    }
                                    //修改预览图片
                                    $li.find('.gallery-img').attr('href',item.base64);
                                    $li.find('.gallery-img img').attr('src',item.base64);
                                    $lim.find('.women img').attr('src',item.base64);
                                };
                                oFileReader.readAsDataURL(blob);
                            }else{
                                item.base64 = '';
                            }

                        };
                        xhr.send();
                        // 压缩成功后回调，添加点击量
                        $(isIE('image_iframe')).find("#uploader .filelist #"+item.key+" .fl div").eq(0).addClass('saveimghh');
                        // 替换base64,修改参数
                        let nowid = 'img'+item.key;
                        $(isIE('image_iframe')).find("#label_right_div_ul ul#"+nowid+" img").attr('oldwidth',item.newwidth);
                        $(isIE('image_iframe')).find("#label_right_div_ul ul#"+nowid+" img").attr('oldheight',item.newheight);
                        // 判断是否是当前编辑
                        const oldimgid = $(isIE('image_iframe')).find('#label_right_div').attr('lay-imgid');
                        if(oldimgid == nowid){
                            // 当前编辑框
                            $(isIE('image_iframe')).find('#label_main_hb').attr('width',item.newwidth);
                            $(isIE('image_iframe')).find('#label_main_hb').attr('height',item.newheight);
                            var viewBox = '0,0,'+item.newwidth+','+item.newheight;
                            document.getElementById('image_iframe').contentWindow.document.querySelector('#label_main_hb #svg_now').setAttribute("viewBox", viewBox);
                            $(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('width',item.newwidth);
                            $(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('height',item.newheight);
                            $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('width',item.newwidth);
                            $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('height',item.newheight);
                        }
                        /* 修改参数*/
                        parent.imghandle.svg.width = item.newwidth;
                        parent.imghandle.svg.height = item.newheight;
                        if(item.filename!=''){
                            parent.imghandle.svg.name = item.filename;
                        }
                        if(item.types&&item.types!=''){
                            parent.imghandle.svg.type = item.types;
                        }
                        // end
                        var $li =   $(isIE('image_iframe')).find('ul.filelist li#'+item.key);
                        var $lim =   $(isIE('image_iframe')).find('ul.material li#'+item.key);
                        $li.find('.msg_'+item.key).remove();
                        $li.find('.success').remove();

                        before_all_size += item.before_all_size;
                        yst_all_size    += item.yst_all_size;
                        $li.find('.successInfo').html(item.thumb);
                        $('<p class="success"></p>').appendTo( $li );
                        // $('#'+item.key+' .gallery-img img').css({'width':'130px'});
                        if(md5list){
                            md5list += ',';
                        }
                        md5list += item.md5list;
                    }else if(item.code == 'error'){
                        var $li =   $(isIE('image_iframe')).find('li#'+item.key);
                        $li.find('.msg_'+item.key).remove();
                        $li.find('.success').remove();
                        $('<p class="error">处理失败</p>').appendTo( $li );
                        before_all_size += item.before_all_size;
                        yst_all_size    += item.yst_all_size;
                        $li.find('.successInfo').html(item.thumb);
                        //修改预览图片
                        $li.find('.gallery-img').attr('href',item.href);
                        $li.find('.gallery-img img').attr('src',item.href);
                    }else {
                        //重新赋值查询参数
                        person = {id:item.compres_id,file_id:item.key};
                        param.push(person);
                    }
                });
                // $(isIE('image_iframe')).find('#download_all_md5').val(md5list);
                if(param.length == 0){
                    if(yst_all_size>0&&fun=='zjzys'||fun=='index'){
                        var _all_ysl = 100 - (yst_all_size/before_all_size * 100);

                        if ( $(isIE('image_iframe')).find('.statusBar .info p').length > 0 ) {
                            var text = '处理后（'+getfilesize( yst_all_size  ) +'），总压缩率 ： '+ _all_ysl.toFixed(2) +'%';
                            $(isIE('image_iframe')).find('.statusBar .info p').html(text);
                        }else{
                            var text = '<p>处理后（'+getfilesize( yst_all_size  ) +'），总压缩率 ： '+ _all_ysl.toFixed(2) +'%</p>';
                            $(isIE('image_iframe')).find('.statusBar .info').append(text);
                        }
                        before_all_size=0;
                        yst_all_size=0;
                    }else{
                        $(isIE('image_iframe')).find('.statusBar .info p').html('');
                        before_all_size=0;
                        yst_all_size=0;
                    }


                    $(isIE('image_iframe')).find('#msg_info').html('已处理');
                    $(isIE('image_iframe')).find('#download_all').show();
                    $(isIE('image_iframe')).find('#isUpload').val('2');
                    $(isIE('image_iframe')).find('.statusBar').show();
                    if(data.data.length>1){
                        var text ='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" id="download_all" style="padding: 3px 6px;" class="btn btn-success btn-small"><i class="icon-download-alt icon-white"></i> 打包下载.zip</a>';
                        $(isIE('image_iframe')).find('.statusBar .info a').remove();
                        $(isIE('image_iframe')).find('.statusBar .info p').before(text);
                    };
                    param = [];
                    timeout = true;
                }
            }
        }
    });
}

// 图片旋转初始化
function intxuanzhuanImg() {
    $('.slider-xuanzhuan-input').jRange('setValue', 0);//归零
    var rect_width = $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('width');
    var rect_height = $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('height');
    $(isIE('image_iframe')).find('#label_main_hb #svg_now').css('background','rgba(255,255,255,0)');
    // 三角函数 求斜边长度 向上取整数
    var cw=ch=hypotenuseLength(parseFloat(rect_width),parseFloat(rect_height));
    __initialize(cw,ch);
    __initializeDt(cw,cw);
}
// 图片裁剪初始化裁剪框
function intCropImg() {
    $(isIE('image_iframe')).find('#imgCjk').css('display',''); //隐藏裁剪框
    /* 获取图片宽高*/
    const oldwidth = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('width'));
    const oldheight = parseFloat($(isIE('image_iframe')).find('#label_main_hb #svg_now').attr('height'));
    const bjbase64 = $(isIE('image_iframe')).find('#label_main_hb #svg_now #ytimg').attr('xlink:href');
    const width = parseInt(oldwidth/2);
    const height = parseInt(oldheight/2);
    const left = (oldwidth-width)/2;
    const top = (oldheight-height)/2;
    var yjcss={
        'background':'url('+bjbase64+')',
        'background-repeat':'no-repeat',
        'background-position-x': -left + 'px',
        'background-position-y': -top + 'px',
        'background-size': oldwidth+'px '+oldheight+'px'
    };
    // $(isIE('image_iframe')).find('#select_style').css('background','rgba(0,0,0,0)');
    $(isIE('image_iframe')).find('#imgCjk #select_style .e-border').css(yjcss);


    var hcss={
        'width':oldwidth+'px',
        'height':oldheight+'px',
    };
    $(isIE('image_iframe')).find('#label_main_hb').css(hcss);
    var css = {
        'width':width+'px',
        'height':height+'px',
        'left':left+'px',
        'top':top+'px',
    };
    var imgcropArr = imghandle.imgcrop.split(',');
    imgcropArr[10]= width
    imgcropArr[11]= height
    imghandle.imgcrop = imgcropArr.join(',')
    $(isIE('image_iframe')).find('#imgCjk #select_style').css(css);
    var cssi = {
        'width':width+'px',
        'height':height+'px',
        'x':left+'px',
        'y':top+'px',
    };
    $(isIE('image_iframe')).find('#imgCjk .t-guider #tGuider').css(cssi);
    $(isIE('image_iframe')).find('#imgCjk .t-guider #tGuiderRect').attr('width',oldwidth);
    $(isIE('image_iframe')).find('#imgCjk .t-guider #tGuiderRect').attr('height',oldheight);
    document.getElementById('yasuo_crop_width').value=width;
    document.getElementById('yasuo_crop_height').value=height;
    var val = $('#cropImgIndex').attr('data-v');
    if(val == '|'){
        var oldbl = $('#cropImgIndex').attr('bl');
        if(oldbl!=='0,0'){
            var bl = oldwidth+','+oldheight;
            $('#cropImgIndex').attr('bl',bl);
            saveDrowImg('1',oldwidth,oldheight);
            $(isIE('image_iframe')).find('#imgCjk .mr_ng-star-inserted,#imgCjk .ml_ng-star-inserted,#imgCjk .mt_ng-star-inserted,#imgCjk .mb_ng-star-inserted').hide();
        }
    }
    rotateSuoFangBli();
}
// 添加方法
function addFuns(now_id,fun){
    var funs = parent.imghandle.funs;
    if(funs == ''){
        funs = 'index';
    }else{
        var funsarr = funs.split(",");
        let len = funsarr.length;
        for (let i=0;i<len;i++){
            if(funsarr[i] == fun){
                return false;
                break;
            }
        }
        funs = funs+','+fun;
    }
    parent.imghandle.funs = funs;
}

/**
 * 计算文件大小函数(保留两位小数),Size为字节大小
 * @param size 初始文件大小
 * @returns {*}
 */
function getfilesize(size) {
    if (!size)
        return 0;
    var num = 1024.00; //byte

    if (size < num)
        return size + "B";
    if (size < Math.pow(num, 2))
        return (size / num).toFixed(2) + "K"; //kb
    if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
    if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
    return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}

//图片裁剪 圆角调整
$('.slider-yuanjiao-input').jRange({
    from: 0,//	滑动范围的最小值
    to: 100,//滑动范围的最大值
    step: 1,//步长值，每次滑动大小
    format: '%s',//	数值格式
    width: 195,//	滑动条宽度
    showLabels: false,//布尔型，是否显示滑块上方的数值标签
    showScale: false,//布尔型，是否显示滑动条下方的尺寸标签
    //isRange:true,//是否为选取范围。
    onstatechange:function (e) {//只要用户更改了该值，就会调用该函数。该提供的隐藏输入也会自动设置相同的值。对于单个滑块，值不带逗号，但对于范围选择器值是逗号分隔的。
        isMoreHandleImg=1
        let val = parseInt(e);
        // $('.yuanjiao-label').html(val+'%');
        imgCrop('borderbf',val)
    }
});
//图片旋转 任意旋转角度
$('.slider-xuanzhuan-input').jRange({
    from: -89,//	滑动范围的最小值
    to: 89,//滑动范围的最大值
    step: 1,//步长值，每次滑动大小
    format: '%s',//	数值格式
    width: 180,//	滑动条宽度
    showLabels: false,//布尔型，是否显示滑块上方的数值标签
    showScale: false,//布尔型，是否显示滑动条下方的尺寸标签
    theme:'theme-blue',
    //isRange:true,//是否为选取范围。
    onstatechange:function (e) {//只要用户更改了该值，就会调用该函数。该提供的隐藏输入也会自动设置相同的值。对于单个滑块，值不带逗号，但对于范围选择器值是逗号分隔的。
        let val = parseInt(e);
        $('.xuanzhuan-label').html(val+'°');
        imgRotateCan('ry',val);
    }
});
// 修改尺寸
$('.slider-xiugaichicun-input').jRange({
    from: 0,//	滑动范围的最小值
    to: 100,//滑动范围的最大值
    step: 10,//步长值，每次滑动大小
    format: '%s',//	数值格式
    width: 180,//	滑动条宽度
    showLabels: false,//布尔型，是否显示滑块上方的数值标签
    showScale: false,//布尔型，是否显示滑动条下方的尺寸标签
    theme:'theme-blue',
    //isRange:true,//是否为选取范围。
    onstatechange:function (e) {//只要用户更改了该值，就会调用该函数。该提供的隐藏输入也会自动设置相同的值。对于单个滑块，值不带逗号，但对于范围选择器值是逗号分隔的。
        let val = parseInt(e);
        isMoreHandleImg=1
        $('.xiugaichicun-label').html(val+'%');
        $('#yasuo_width_size_h').val(parseInt(imghandle.width*val/100))
        $('#yasuo_height_size_h').val(parseInt(imghandle.height*val/100))
        xiugaiImg(val);
    }
});
//加水印 透明度
$('.slider-sy-tmd-input').jRange({
    from: 0,//	滑动范围的最小值
    to: 100,//滑动范围的最大值
    step: 1,//步长值，每次滑动大小
    format: '%s',//	数值格式
    width: 100,//	滑动条宽度
    showLabels: false,//布尔型，是否显示滑块上方的数值标签
    showScale: false,//布尔型，是否显示滑动条下方的尺寸标签
    theme:'theme-blue',
    //isRange:true,//是否为选取范围。
    onstatechange:function (e) {//只要用户更改了该值，就会调用该函数。该提供的隐藏输入也会自动设置相同的值。对于单个滑块，值不带逗号，但对于范围选择器值是逗号分隔的。
        let val = parseInt(e);
        isMoreHandleImg=1
        document.getElementById('shuiyin-input-tmd').value=val;
        watermarkHandle('tmd',val);
    }
});
// 监听水印 透明度变化
$('#shuiyin-input-tmd').keyup(function () {
            $('.slider-sy-tmd-input').jRange('setValue', $(this).val());//透明度
        }
);


//加水印 大小
$('.slider-sy-dx-input').jRange({
    from: 5,//	滑动范围的最小值
    to: 200,//滑动范围的最大值
    step: 1,//步长值，每次滑动大小
    format: '%s',//	数值格式
    width: 100,//	滑动条宽度
    showLabels: false,//布尔型，是否显示滑块上方的数值标签
    showScale: false,//布尔型，是否显示滑动条下方的尺寸标签
    theme:'theme-blue',
    //isRange:true,//是否为选取范围。
    onstatechange:function (e) {//只要用户更改了该值，就会调用该函数。该提供的隐藏输入也会自动设置相同的值。对于单个滑块，值不带逗号，但对于范围选择器值是逗号分隔的。
        //console.log(parseInt(e) + 100);
        let val = parseInt(e);
        isMoreHandleImg=1
        document.getElementById('shuiyin-input-dx').value=val;
        $(isIE('image_iframe')).find('#text_span').css('font-size',val+'px');
        $(isIE('image_iframe')).find('#text_span').attr('value',val);
        // let now_id = $(isIE('image_iframe')).find('#label_right_div').attr('lay-imgid');
        // watermarkBalance(now_id);
        // $('.sy-dx-label').html(val+'°');
        watermarkHandle('dx',val);
    }
});
// 监听水印 大小变化
$('#shuiyin-input-dx').keyup(function () {
            $('.slider-sy-dx-input').jRange('setValue', $(this).val());//透明度
        }
);
//加水印 间距
$('.slider-sy-jj-input').jRange({
    from: -20,//	滑动范围的最小值
    to: 100,//滑动范围的最大值
    step: 1,//步长值，每次滑动大小
    format: '%s',//	数值格式
    width: 100,//	滑动条宽度
    showLabels: false,//布尔型，是否显示滑块上方的数值标签
    showScale: false,//布尔型，是否显示滑动条下方的尺寸标签
    theme:'theme-blue',
    //isRange:true,//是否为选取范围。
    onstatechange:function (e) {//只要用户更改了该值，就会调用该函数。该提供的隐藏输入也会自动设置相同的值。对于单个滑块，值不带逗号，但对于范围选择器值是逗号分隔的。
        //console.log(parseInt(e) + 100);
        let val = parseInt(e);
        isMoreHandleImg=1
        document.getElementById('shuiyin-input-jj').value=val;
        // $('.sy-jj-label').html(val+'°');
        watermarkHandle('jj',val);
    }
});
// 监听加水印 间距变化
$('#shuiyin-input-jj').keyup(
        function () {
            $('.slider-sy-jj-input').jRange('setValue', $(this).val());//透明度
        }
);
//加水印 角度
$('.slider-sy-jd-input').jRange({
    from: -90,//	滑动范围的最小值
    to: 90,//滑动范围的最大值
    step: 1,//步长值，每次滑动大小
    format: '%s',//	数值格式
    width: 100,//	滑动条宽度
    showLabels: false,//布尔型，是否显示滑块上方的数值标签
    showScale: false,//布尔型，是否显示滑动条下方的尺寸标签
    theme:'theme-blue',
    //isRange:true,//是否为选取范围。
    onstatechange:function (e) {//只要用户更改了该值，就会调用该函数。该提供的隐藏输入也会自动设置相同的值。对于单个滑块，值不带逗号，但对于范围选择器值是逗号分隔的。
        //console.log(parseInt(e) + 100);
        let val = parseInt(e);
        isMoreHandleImg=1
        document.getElementById('shuiyin-input-rotate').value=val;
        // $('.sy-jd-label').html(val+'°');
        watermarkHandle('jd',val);

    }
});
// 监听水印 角度变化
$('#shuiyin-input-rotate').keyup(
        function () {
            $('.slider-sy-jd-input').jRange('setValue', $(this).val());//透明度
        }
);

//加水印 左右
$('.slider-sy-left-input').jRange({
    from: -100,//	滑动范围的最小值
    to: 100,//滑动范围的最大值
    step: 1,//步长值，每次滑动大小
    format: '%s',//	数值格式
    width: 100,//	滑动条宽度
    showLabels: false,//布尔型，是否显示滑块上方的数值标签
    showScale: false,//布尔型，是否显示滑动条下方的尺寸标签
    theme:'theme-blue',
    //isRange:true,//是否为选取范围。
    onstatechange:function (e) {//只要用户更改了该值，就会调用该函数。该提供的隐藏输入也会自动设置相同的值。对于单个滑块，值不带逗号，但对于范围选择器值是逗号分隔的。
        //console.log(parseInt(e) + 100);
        let val = parseInt(e);
        isMoreHandleImg=1
        document.getElementById('shuiyin-input-zy').value=val;
        // $('.sy-left-label').html(val+'°');
        watermarkHandle('left',val);

    }
});
// 监听水印 左右变化
$('#shuiyin-input-zy').keyup(
        function () {
            $('.slider-sy-left-input').jRange('setValue', $(this).val());//透明度
        }
);
//加水印 上下
$('.slider-sy-top-input').jRange({
    from: -100,//	滑动范围的最小值
    to: 100,//滑动范围的最大值
    step: 1,//步长值，每次滑动大小
    format: '%s',//	数值格式
    width: 100,//	滑动条宽度
    showLabels: false,//布尔型，是否显示滑块上方的数值标签
    showScale: false,//布尔型，是否显示滑动条下方的尺寸标签
    theme:'theme-blue',
    //isRange:true,//是否为选取范围。
    onstatechange:function (e) {//只要用户更改了该值，就会调用该函数。该提供的隐藏输入也会自动设置相同的值。对于单个滑块，值不带逗号，但对于范围选择器值是逗号分隔的。
        //console.log(parseInt(e) + 100);
        let val = parseInt(e);
        isMoreHandleImg=1
        // $('.sy-top-label').html(val+'°');
        document.getElementById('shuiyin-input-sx').value=val;
        watermarkHandle('top',val);

    }
});
// 监听水印 上下变化
$('#shuiyin-input-sx').keyup(
        function () {
            $('.slider-sy-top-input').jRange('setValue', $(this).val());//透明度
        }
);

