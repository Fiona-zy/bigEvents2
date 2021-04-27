//ajax基本配置
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;


    if (options.url.indexOf('/my/') !== -1) {
        
        options.headers = {
            Authorization:localStorage.getItem('token')
        }
    };
    options.complete=function (xhr) {
        //形参获取到xhr对象
        // console.log(xhr)
        if (xhr.responseJSON.status === 1 &&
            xhr.responseJSON.message === "身份认证失败！"
        ) {
            //重新登录,并且清除掉token
            localStorage.removeItem('token')
            location.href="login.html"
        }
    }
    
    
});