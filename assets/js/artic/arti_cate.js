$(function () {
     let layer=layui.layer
     let form=layui.form

     getCate()
     function getCate() {
          //获取文章类别
          $.ajax({
             url: '/my/article/cates',
             success:function (res) {
               //    console.log(res);
                  let htmlStr = template('trTpl', res)
               //    console.log(htmlStr);
                  $('tbody').html(htmlStr)
             }
          })
           
     }
     //添加类别按钮
     let index
     $('#btnAdd').on('click', function () {
         let formStr= $('#addForm').html() 
          index = layer.open({
               type:1,  //页面层
               title: '添加文章分类',
               area: '500px',
               //内容来源于addform标签中的内容
               content:formStr
             });
             //拿到的index是一个重要的凭据，它是诸如layer.close(index)等方法的必传参数。       
                     
     })
    
//新增图书
     $('body').on('submit','#form',function (e) {
          e.preventDefault()
          // console.log('ha');
          let data=$(this).serialize()
          $.ajax({
               url: '/my/article/addcates',
               type: 'POST',
               data,
               success:function (res) {
                    // console.log(res)
                    if (res.status !== 0) {
                         return layer.msg('新增文章分类失败！')
                    }
                    layer.msg('新增文章分类成功!')
                    //成功后关闭弹框，重新获取所有文章
                    layer.close(index)
                    getCate()
               }
          })
     })

     //编辑点击事件
     let editIndex
     $('tbody').on('click', '.editBtn', function () {
          let id = $(this).attr('data-id')
          // console.log( id );
          editIndex= layer.open({
               type:1,  //页面层
               title: '修改文章分类',
               area: '500px',
               //内容来源于addform标签中的内容
               content:$('#editFormTpl').html() 
          });

          $.ajax({
               url: '/my/article/cates/'+id,
               success:function (res) {
                    // console.log(res)
                    if (res.status !== 0) {
                         return layer.msg('获取文章分类数据失败')
                    }
                    form.val('editForm',res.data)
               }
          })
     })

//编辑框确认修改功能
     $('body').on('submit','#editForm',function (e) {
          e.preventDefault()
          let data = $(this).serialize()
          $.ajax({
               url: '/my/article/updatecate',
               type: 'POST',
               data,
               success: function (res) {
                    if (res.status !== 0) {
                         return layer.msg('更新分类信息失败！')
                    }
                    layer.msg('更新分类信息成功！')
                    layer.close(editIndex)
                    getCate()
               }
          })
     })
     
//删除功能
     
     $('body').on('click', '.delBtn', function () {
          // console.log('hah');
          let id = $(this).attr('data-id')
          $.ajax({
               url: '/my/article/deletecate/' + id,
               success:function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                         return layer.msg('删除文章分类失败')
                    }
                    layer.msg('删除文章分类成功')
                    getCate()
               }
               
          })
     })
 
})