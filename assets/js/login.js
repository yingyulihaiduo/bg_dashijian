$(function() {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function() {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function() {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 从 layui 中获取 form 对象
  var form = layui.form
  
  //引入layui的弹出层
  var layer = layui.layer
  
  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function(value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })



$('#form_reg').on('submit',function(e){
	// 阻住form表单的默认行为。。这里的默认行为是指自动跳转
  e.preventDefault();	
	
	$.post('/api/reguser',
	// 得到用户名框中的数据
	{username:$('#form_reg [name=username]').val(), 
	// 得到密码框中的数据
	password:$('#form_reg [name=repassword]').val()
	},
	function(res){
		//如果请求不成功返回服务器的数据
		if(res.status!==0){
			// return console.log(res.message);
			return layer.msg(res.message)
		}else{
			//否则登录成功
			// console.log("注册成功");
			layer.msg('注册成功，请登录！')
			
			//注册成功跳转到登录界面//模拟人的点击行为
		    $('#link_login').click()
		}
		
	})
})






$('#form_login').on('submit',function(e){
	// 阻住form表单的默认行为。。这里的默认行为是指自动跳转
	e.preventDefault();
	
	$.ajax({
		  url: '/api/login',
		  method: 'POST',
	    // 快速获取表单中的数据
         data: $(this).serialize(),
		 
		 
		  success:function(res){
			  if(res.status!==0){
				  return layer.msg('登录失败')
			  }else{
				  layer.msg('登录成功')
				  // console.log(res.token);
				  // 将token值存到本地
				  localStorage.setItem('token', res.token)
				  location.href = '/index.html'
			  }
			  
		  }
		  
		  
	})
	
	
	
})













  // // 监听登录表单的提交事件
  // $('#form_login').submit(function(e) {
  //   // 阻止默认提交行为
  //   e.preventDefault()
  //   $.ajax({
  //     url: 'http://www.liulongbin.top:3007/api/login',
  //     method: 'POST',
  //     // 快速获取表单中的数据
  //     data: $(this).serialize(),
  //     success: function(res) {
  //       if (res.status !== 0) {
  //         return layer.msg('登录失败！')
  //       }
  //       layer.msg('登录成功！')
  //       // 将登录成功得到的 token 字符串，保存到 localStorage 中
  //       // localStorage.setItem('token', res.token)
  //       // // 跳转到后台主页
  //       // location.href = '/index.html'
  //     }
  //   })
  // })
})
