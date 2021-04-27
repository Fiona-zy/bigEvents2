$(function () {
    let layer = layui.layer
    let form = layui.form
    var laypage = layui.laypage;
    let query = {
        pagenum: 1,//页码值
        pagesize: 2,//每页显示的数据条数
        cate_id: '',
        state:'',
     }
    getList()
    //获取文章分类列表
    function getList() {
        $.ajax({
            url: '/my/article/list',
            type: 'GET',
            data: query,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                let htmlStr = template('trTpl', res)
                // console.log( htmlStr );
                $('tbody').html(htmlStr)
                // 渲染展示分页功能
               renderPage(res.total)   //实参
            }
        })
    }
    //定义分页函数
    function renderPage(total) {
            //执行一个laypage实例
            laypage.render({
                curr: query.pagenum,  //当前分页的页码值
                limit: query.pagesize,
                elem: 'pageBox', //注意，这里的 pageBox 是 ID，不用加 # 号
                count: total, //数据总数，从服务端得到
                limits:[1,2,3,5],
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                jump: function(obj, first){
                    //obj包含了当前分页的所有参数，比如：
                    // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    // console.log(obj.limit); //得到每页显示的条数
                    // console.log(first);   //true   first是否为分页初始渲染
                    
                    //jump触发执行的时机：
                        // 1.分页初始渲染 的时候，jump就会执行一次，first值为true
                        // 2.点击分页的时候，jump也会触发执行，此时first参数为undefined
                    
                      // 点击分页，需要修改query的pagenum的值  修改为obj.curr  
                       //   重新发送ajax
                    query.pagenum = obj.curr
                    query.pagesize = obj.limit;
                    //首次不执  行
                    if(!first){   //点击的时候  if就会成立
                        // console.log('ha')
                        getList()  //只有执行！first这个函数 后再调用getlist请求，否则会陷入递归死循环
                    }
                  }
            });
    }
    const paddZero = (n) => (n < 10 ? "0" + n : n);
    //美化时间
    template.defaults.imports.formatTime = function (time) {
        // console.log(time)
        let t=new Date(time)
        let y=t.getFullYear()
        let mon= paddZero(t.getMonth()+1)
        let d = paddZero(t.getDate())
        let h =paddZero(t.getHours()) 
        let m=paddZero(t.getMinutes()) 
        let s= paddZero(t.getSeconds())
        return `${y}-${mon}-${d}-${h}:${m}:${s}`
    }

  //获取文章分类类别的数据
    $.ajax({
        url: '/my/article/cates',
        success:function (res) {
            // console.log(res)
            if (res.status !== 0) {
                return layer.msg('获取文章分类列表失败！')
            }
            let htmlStr = ''  //用来装option的字符串
            let data = res.data
            data.forEach(item => {
                // console.log(item)
                htmlStr += `
                  <option value="${item.Id}">${item.name}</option>
                `
                // console.log(htmlStr)
            })
            $('[name=cate_id]').append(htmlStr)   //此处有坑   增加的option出不来，需要以下处理
            form.render()
        }
    })

   //筛选功能
    $('#form').on('submit',function (e) {
        e.preventDefault()
        // console.log('f');
        // 修改query的值
        // console.log( $('[name=cata_id]').val() );
        // console.log($('[name=state]').val());

        // let query = {
        //     pagenum: 1,//页码值
        //     pagesize: 2,//每页显示的数据条数
        //     cata_id: $('[name=cata_id]').val(),
        //     state:$('[name=state]').val()
        //  }    //为啥这样写不行
        query.cate_id = $("[name=cate_id]").val();
        query.state = $("[name=state]").val();
         getList()

    })

//  删除功能
    $('tbody').on('click','.delBtn',function () {
         let id=$(this).attr('data-id')
        // console.log(id)
        // 需要做个判断：判断tbody中的删除按钮的个数是否为1，如果为1，则该页面点击删除后就没有数据了，需要将pagenum-1，即上一页的数据。pagenum最小值为1
        if ($('.delBtn').length === 1) {
            if (query.pagenum===1) {
                query.pagenum=1
            } else {
                query.pagenum=query.pagenum-1
            }
        }
        $.ajax({
            url: '/my/article/delete/' + id,
            success:function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg('删除文章分类失败')
                }
                layer.msg('删除文章分类成功')
                getList()
            }
        })
    })

    // 编辑功能
    $('tbody').on('click','.editBtn',function () {
        let id = $(this).attr('data-id')
        console.log(id)
    })
    
})