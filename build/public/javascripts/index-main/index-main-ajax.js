$(function () {
    $("#signup-btn").click(function (event) {
        event.preventDefault();
        var url = '/signup',
            isReturn = 0,
            data = [
                $("#signup-username").val(),
                $('#signup-email').val(),
                md5($("#signup-password").val())
        ],
            Const = ['username', 'email', 'password'],
            Zconst = ['用户名', '邮箱', '密码']
        data.forEach(function (value, index) {
            if(value == '' || value == md5('')){
                $('#signup-' + Const[index]).next().html(Zconst[index] + '不能为空').css('display', 'inline');
                isReturn += 1;
            }
        })
        if(isReturn > 0){
            return ;
        }
        $.post(url, {username: data[0], email: data[1], password: data[2]}, function (data) {
            if(data.statCode == '200') {
                swal({
                    title: "邮箱激活!",
                    text: "<span>请点击下面激活邮箱</span>",
                    imageUrl: "images/thumbs-up.jpg",
                    showConfirmButton: true,
                    html: true,
                    confirmButtonText: '激活邮箱',
                    cancelButtonText: '取消',
                    showCancelButton: true
                }, function () {
                    $.post('/email', { email: $('#signup-email').val() },function (data) {
                        if(data.stateCode == '200'){
                            swal("漂亮!", "快去你的邮箱进行验证");
                        }else{
                            swal("很遗憾!", "你的邮箱貌似有问题");
                        }
                    })
                });
            }else{
                $('#signup-email').next().css('display', 'inline').html('该邮箱已被注册');
            }
        });
    })

    $("#login-btn").click(function (event) {
        event.preventDefault();
        var url = '/login',
            email = $('#login-email'),
            password = $('#login-password')
            data = {
                email: email.val(),
                password: md5(password.val())
        };
        if(data.email == ''){
            email.next().html('邮箱不能为空').css('display', 'inline');
            if(data.password == md5('')){
                password.next().html('密码不为空').css('display', 'inline');
                return ;
            }
            return ;
        }

        if(data.password == md5('')){
            password.next().html('密码不能为空').css('display', 'inline');
            return ;
        }
        $.post(url, data, function (data) {
            if(data.statCode == '200') {
                window.location.href = data.url;
            }else if(data.msg == 'no user'){
                email.next().html('邮箱没有注册').css('display', 'inline');
            }else{
                password.next().html('密码不正确').css('display', 'inline');
            }
        });
    })

    $('#email-activate-achor').click(function (event) {
        event.preventDefault();
        var url = '/email'
        $.post(url, {email: $('#signup-email').val()})
    })

    $('#login-email').on('click', function () {
        $(this).next().css('display', 'none');
    })

    $('#login-password').on('click', function () {
        $(this).next().css('display', 'none');
    })

    $('#signup-password').on('click', function () {
        $(this).next().css('display', 'none');
    });
    $('#signup-username').on('click', function () {
        $(this).next().css('display', 'none');
    });
    $('#signup-email').on('click', function () {
        $(this).next().css('display', 'none');
    })
})

