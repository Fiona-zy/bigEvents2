$(function () {
    let form = layui.form
    let layer=layui.layer
    form.verify({
        //密码校验
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        //校验原密码和新密码必须一致
        newPwd:function (value) {
             //value新密码框内容
            let oldPwd = $('[name=oldPwd]').val()
            if (value === oldPwd) {
                return '新密码不能与原密码相同'
            }
        },
        //校验两次输入的新密码必须一致
        samePwd:function (value) {
            let newPwd = $('[name=newPwd]').val()
            if (value !== newPwd) {
                return '两次输入的密码不一致'
            }
        }
      });      
      
    $('form').on('submit',function (e) {
         e.preventDefault()
         let data = $(this).serialize()
           $.ajax({
               url: '/my/updatepwd',
               type: 'POST',
               data,
               success:function (res) {
                   console.log(res);
                   if (res.status !== 0) {
                       return layer.msg('重置密码失败'+res.message)
                   }
                   layer.msg('重置密码成功!')
                   //重置后所有的密码清空，dom对象
                   $('form').get(0).reset()
               }
          })
    })


    


})