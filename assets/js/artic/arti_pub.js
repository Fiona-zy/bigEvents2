$(function () {
    let form = layui.form
    let layer=layui.layer
    // 发布文章的状态
    let state=''
    $.ajax({
        url: '/my/article/cates',
        success:function (res) {
            // console.log(res.data);
            let htmlStr=''
            res.data.forEach(function (item) {
                // console.log(item.name)
                htmlStr += `
                <option value="${item.Id}">${item.name}</option>`
            })
            $('[name=cate_id]').append(htmlStr)
            form.render()
        }
     })

    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')
    
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    
    // 3. 初始化裁剪区域
    $image.cropper(options)


    $('#chooseBtn').on('click', function () {
       
         $('#file').click()
    })
// 上传图片注册change事件
    $('#file').on('change',function () {
        // console.log('aa');
        let file = this.files[0]
        let newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
        
    })


    // 发布文章
    $('#pubBtn').click(function () {
         state='已发布'
    })

    $('#pubBtn2').click(function () {
        state='草稿'
    })
    

    $('#form').on('submit',function (e) {
        e.preventDefault()
        // 把裁切的图片转成对应的文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
            })
            // .toBlob(function (blob) {
            .toBlob((blob)=> {    //转换为箭头函数是因为下面的this   箭头函数没有this
                let fd = new FormData(this)   //参数需要是dom对象,此处this应注意
                //fd实例可以通过append方法来追加数据
                fd.append('state',state)
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img',blob)
                // fd可以使用foreach来遍历，查看储存form的数据
                // fd.forEach((item) => console.log(item))

                pubArt(fd)
            })
    })

    // 发布文章,封装函数
    function pubArt(fd) {
        $.ajax({
            url: '/my/article/add',
            type: 'POST',
            data: fd,
            contentType: false,  //此处注意
            processData:false,
            success:function (res) {
                // console.log(res)
                if (res.status !== 0) {
                   return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                location.href='/article/arti_list.html'
            }
        })
            
             
    }
})