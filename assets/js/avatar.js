$(function () {
    let layer=layui.layer

    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        aspectRatio: 1,       // 纵横比，截图区 图片长与宽的比例
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //上传
    $('#upBtn').on('click',function () {
         
        $('#file').click()
    })
    //file有change事件
    $('#file').on('change', function () {
        //当选择的文件上传后   事件就触发了
        // console.log('hah')
        //files属性是文件域的DOM对象的属性,记录所有用户选择的文件
        let file = this.files[0]   //通过下标  获取用户选择的文件
        // console.log(file)
        let newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    $('#trueBtn').on('click', function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
              width: 100,
              height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // console.log(dataURL)
        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar:dataURL
            },
            success:function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功')
                window.parent.getAvatarAndName()
            }
         })
    })
})
