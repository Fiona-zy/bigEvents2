$(function () {
    let form = layui.form
    let layer = layui.layer;
    getInfo();

    function  getInfo() {   
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            success(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return alert('获取信息失败')
                }
                form.val("userForm", res.data)
    
            }
        })
    }
    //点击重置
    $('#resetBtn').on('click',function (e) {
        e.preventDefault()
        getInfo();
       
    })
    // 点击修改
   
    $('#form').on('submit',function(e){
        e.preventDefault();
        let data = $(this).serialize();
        // console.log(data);
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data,
            success:function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败')
                }
                layer.msg('修改用户信息成功')
                console.log(res)
                // 通过winder.parent来获取index的函数
               window.parent.getAvatarAndName()
            }
        })
    })

    //添加表单校验功能
    form.verify({
        //昵称、
        nickname: function (value, item) {
            if (value.length > 6) {
                
                return '昵称必须在1-6个字符'
            }
        }
    })
})