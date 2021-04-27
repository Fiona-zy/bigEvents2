$(function () {
    //跳转切换
    $('.gotoRegi').click(function () {
        $('.loginBox').hide()
        $('.regiBox').show()
    });
    $('.gotoLogin').click(function () {
        $('.loginBox').show()
        $('.regiBox').hide()
    });
    //校验
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        repass:function (value,item) {
            // console.log(value, item);
            let pwd = $(".regiBox input[name=password]").val();
            if (value !== pwd) {
                return "两次输入的密码不一致!";
            }
        }

    });
    
    //注册ajax
    $('#regiForm').on('submit', function (e) {
        e.preventDefault();

        let data = $(this).serialize();


        $(this).serialize('')
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                };
                layer.msg('注册成功');
                $('.gotoLogin').click();

            }
        })
    });
    //登录\
    //登录成功  提示框
    //需要将token存储到本地中   
    $('#loginForm').on('submit',function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: data,
            success:function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                };

                //存储内容   
                localStorage.setItem('token', res.token);
                layer.msg(
                    '登录成功，即将去后台主页',
                    {
                        time:2000,
                    },
                    function () {
                        location.href = 'index.html';
                    }
                )
            }
        })
    })





});