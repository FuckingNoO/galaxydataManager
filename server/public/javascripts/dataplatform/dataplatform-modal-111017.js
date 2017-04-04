$(function () {
    //disease add modal js
    $(".disease-add-type-btn").click(function (event) {
        event.preventDefault();
        var url = "/diseasetypeadd",
            dataArray = {
            diseaseType: $("#diseasetype").val()
        };
        $.post(url, dataArray,function (rs) {
            if(rs.stateCode == 200) {
                var html = '<li><input type="checkbox" value="0"/><span>'+rs.type+'</span></li>';
                $(".disease-type-ul ul").append(html);
                swal('添加成功！')
            }else{
                swal('操作失败，稍后再试！');
            }
        })
    })
    $('.localfile-upload-btn').on('click', function () {
        $('.local-file-upload-input').trigger('click');
    })
    $('.files-upload-btn').on('click', function(){
        $('.files-upload-form-btn').trigger('click');
    })
    /**
     * input value change listener
     */
    $('.local-file-upload-input').change(function () {
        var _this = $(this),
            files = _this.prop('files'),
            u_file,
            uploadItem = [],
            file_upload_tpl = $("#file-upload-tpl").html(),
            size,
            percent,
            progress;

        //this.files iterator
        for(var i = 0, j = files.length; i < j;i++){
            //initialize varies
            u_file = files[i];
            size = u_file.size;
            // 初始通过本地记录，判断该文件是否曾经上传过
            percent = window.localStorage.getItem(u_file.name + '_p');
            if(percent && percent != '100.0'){
                progress = '已上传 ' + percent + '%';
                //may be something will be added here
            }
            //push upload item in a array called  uploadItem
            uploadItem.push(file_upload_tpl.replace(/{{fileName}}/g, u_file.name).replace(/{{fileSize}}/,
                size).replace(/{{uploadPer}}/, '100%').replace(/{{label}}/, i).replace(/{{totalSize}}/, size))
        }
        //toggle block
        $('.files-display-area').show();
        $('.file-drag-area').css('display', 'none');

        //test
        // alert($('input[name="genefile"]').prop('files').length);
        //tpl inut into tbody
        $('.files-display-area-tbody').append(uploadItem.join('')).end().show();
    })
    /**
     *
     */
    // $('.files-upload-btn').on('click', function () {
    //     $('.files-upload-form-btn').trigger('click');
    // })
    /**
     * 上传文件时选取对应的文件item
     */
    function findTheFile(fileName){
        var files = $('input[name="genefile"]').prop('files'),
            properFile;
        for(var i = 0;i < files.length;i++){
            if(files[i].name == fileName){
                properFile = files[i];
                break;
            }
        }
        return properFile ? properFile : [];
    }
    /**
     * form submit listener
     * event delegate
     */
    $(document.body).on('click', '.upload_items_btn', function (event) {
        event.preventDefault();
        var _this = $(this),
            state = _this.attr('data-state'),
            fileName = _this.attr('data-name'),
            //each size control: 1M
            eachSize = 1024 * 1024,
            totalSize = _this.attr('data-size'),
            chunks = Math.ceil(totalSize / eachSize),
            chunk, //this is just a variable for chunks iterator like for(....)
            $_percentVal = $('.upload-status-column'),
            percent,
            isPaused = 0;
        //whether the file is larger than 5mb
        if(totalSize < 1024 * 1024 * 5){
            var f = new FormData();
            f.append('genefile',  findTheFile(fileName));
            f.append('fileName', fileName);
            f.append('totalSize', totalSize);
            $.ajax({
                type: 'post',
                url: '/upload_chunk',
                data: f,
                timeout: 5000,
                processData: false,
                contentType: false,
                success: function (rs) {
                    if(rs.stateCode == '200'){
                        _this.html('已经上传');
                    }
                },
                error: function () {
                    alert('error');
                }
            });
        }else{
            startupload('first');
        }

        /**
         * star to uplaod function
         * @param times
         */
        function startupload(times) {
            //上传之前判断是否已经上传过分片
            chunk = window.localStorage.getItem(fileName + '_chunk') || 0;
            chunk = parseInt(chunk, '10');
            //判断是否为最后的chunk
            var isLastChunk = (chunk == (chunks - 1)) ? 1 : 0;

            if (times == 'first' && isLastChunk == 1) {
                window.localStorage.setItem(fileName + '_chunk', 0);
                chunk = 0;
                isLastChunk = 0;
            }
            //设置分片的开始与结尾
            var segStart = chunk * eachSize,// start
                segEnd = (chunk + 1) * eachSize > totalSize ? totalSize : (chunk + 1) * eachSize, //end
                percent = (100 * segEnd / totalSize).toFixed(1),
                timeout = 5000,                                                                    // timeout
                fd = new FormData();                                                          // formdata obj

            fd.append('genefile', findTheFile(fileName).slice(segStart, segEnd)); // slice the file into chunk
            fd.append('fileName', fileName);   //the name of the file
            fd.append('totalSize', totalSize); //the total size of the file
            fd.append('isLastChunk', isLastChunk);// send isLastChunk variable
            fd.append('isFirstUpload', times == "first" ? 1 : 0);// Whether it is the first time to upload
            /**
             * ajax submit
             */
            $.ajax({
                type: "post",
                url: "/upload_chunk",
                data: fd,
                timeout: timeout,
                processData: false,
                contentType: false,
                success: function (rs) {
                    if (rs.stateCode == '200') {
                        //record the uploaded percentage
                        window.localStorage.setItem(fileName + '_p', percent);
                        if (chunk === (chunks - 1)) {
                            // upload completed
                            $_percentVal.html('done');
                            _this.html('已经上传');
                        } else {
                            //percentage todo
                            window.localStorage.setItem(fileName + '_chunk', ++chunk);
                            $_percentVal.html('已经上传' + percent + '%');
                            startupload();
                        }
                    } else {
                        alert('上传失败');
                    }
                },
                error: function () {
                    //test
                    alert('error');
                }
            })
            /** ajax submit end */
        }
    })
})