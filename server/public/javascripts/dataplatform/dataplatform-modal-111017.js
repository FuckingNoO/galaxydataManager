$(function () {
    var _file_count = 0;
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
        var u_file,
            uploadItem = [],
            file_upload_tpl = $("#file-upload-tpl").html(),
            size,
            percent;
        //this.files iterator
        for(var i = 0, j = this.files.length;i < j;i++){
            //initialize varies
            u_file = this.files[i];
            percent = 0;
            size = u_file.size;
            //push upload item in a array called  uploadItem
            uploadItem.push(file_upload_tpl.replace(/{{fileName}}/g, u_file.name).replace(/{{fileSize}}/,
                u_file.size).replace(/{{uploadPer}}/, '100%').replace(/{{label}}/, i).replace(/{{totalSize}}/, u_file.size))
        }
        //toggle block
        $('.files-display-area').show();
        $('.file-drag-area').css('display', 'none');

        //test
        alert($('input[name="genefile"]').prop('files').length);
        //tpl inut into tbody
        $('.files-display-area-tbody').append(uploadItem.join('')).end().show();
    })

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
     */
    $('.upload_file_item_btn_0').on('click', function (event) {
        event.preventDefault();
        alert('hello,world');
        var _this = $(this),
            state = _this.attr('data-state'),
            fileName = _this.attr('data-name'),
            eachSize = 1024,
            totalSize = _this.attr('data-size'),
            chunks = math.cell(totalSize / eachSize),
            chunk, //this is just a variable for chunks iterator like for(....)
            percent,
            isPaused = 0;
        //pause uploading todo

        startupload('first');

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
                //todo
            }
            //设置分片的开始与结尾
            var segStart = chunk * eachSize,// start
                segEnd = (chunk + 1) * eachSize > totalSize ? totalSize : (chunk + 1) * eachSize,   //end
                timeout = 5000;                                                                     // timeout
                formdata = new FormData();                                                          // formdata obj
            formdata.append('properFile', findTheFile(fileName).slice(segStart, segEnd)); // slice the file into chunks
            formdata.append('fileName', fileName);   //the name of the file
            formdata.append('totalSize', totalSize); //the total size of the file
            formdata.append('isLastChunk', isLastChunk);// send isLastChunk variable
            formdata.append('isFirstUpload', times == "first" ? 1 : 0);
        }

        /**
         * ajax submit
         */
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formdata,
            processData: false,
            contentType: false,
            timeout: timeout,
            success: function (rs) {
                //todo
            },
            error: function () {
                //todo
            }
        })
        /** ajax submit end */
    })
})