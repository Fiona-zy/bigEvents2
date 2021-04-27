$(function () {
    let layer = layui.layer
    getAvatarAndName();

    //对以下函数进行封装
    // $.ajax({
    //     type:"GET",
    //     url: "/my/userinfo",
        
    //     // headers: {
    //     //     Authorization:localStorage.getItem('token')
    //     // },
    //     //调到base.js中去
       
    //     success:function (res) {
    //         // console.log(res);
    //         if (res.status !== 0) {
    //             return layer.msg('获取信息失败')
    //         }
    //         //处理头像昵称等信息
    //         let name = res.data.nickname || res.data.username
    //         // console.log(name);
    //         $('#welcome').text('欢迎' + name)
    //         let first= name[0].toUpperCase()
    //         if (res.data.user_pic) {
    //             $('.layui-nav-img').show().attr('src',res.data.user_pic)
    //             $('.text-avatar').hide()
    //         } else {
    //             $('.layui-nav-img').hide()
    //             $('.text-avatar').text(first).show()
    //         }
    //     },
    //     //无论请求成功还是失败都会执行的函数,整理到base函数中
    //     // complete: function (xhr) {
    //     //     //形参获取到xhr对象
    //     //     console.log(xhr)
    //     //     if (xhr.responseJSON.status === 1 &&
    //     //         xhr.responseJSON.message === "身份认证失败！"
    //     //     ) {
    //     //         //重新登录,并且清除掉token
    //     //         localStorage.removeItem('token')
    //     //         location.href="login.html"
    //     //     }
    //     // }
    // })

    //退出功能
    $('#logoutBtn').on('click',function () {
        layer.confirm(
            '确定退出登录?',
            { icon: 3, title: '提示' },
            function (index) {
                //关闭登录的时候  要把存储在本地的token信息给清除掉,
                //页面跳转回登录页面
                localStorage.removeItem('token')
                location.href='login.html'
                layer.close(index); //关闭当前询问框
                
          });  

    })
})



function getAvatarAndName() {
    $.ajax({
        type:"GET",
        url: "/my/userinfo",
        success:function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取信息失败')
            }
            let name = res.data.nickname || res.data.username
            $('#welcome').text('欢迎' + name)
            let first= name[0].toUpperCase()
            if (res.data.user_pic) {
                $('.layui-nav-img').show().attr('src',res.data.user_pic)
                $('.text-avatar').hide()
            } else {
                $('.layui-nav-img').hide()
                $('.text-avatar').text(first).show()
            }
        },
    })
}