//app.js
App({
  globalData:{
    token:'',
    cartList: []
  },
  onLaunch: function () {
    // 1、存储中取token
    const token = wx.getStorageSync('token')
    // 判断有效
    if(token && token.length !== 0){
      this.check_token(token)
    }else{
      this.login();
    }   
  },
  addToCart(obj) {
    // 1.判断是否已经添加进来
    const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid)
    if (oldInfo) {
      oldInfo.count += 1
    } else {
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
    }

    // // 2.购物车回调
    if (this.addCartCallback) {
      this.addCartCallback()
    }
  },
  check_token(token){
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      method: 'post',
      header: {
        token
      },
      success: (res) => {
        if(!res.data.errCode){
          this.globalData.token = token;
          console.log("token有效");
        }else{
          this.login()
        }
      },
      fail:(err)=>{
        // console.log(err)
      }
    })
  },
  login(){
    // 登录操作
    wx.login({
      success: (res) => {
        //  1.获取code
        // console.log(res);
        const code = res.code;
        //  2、向自己服务器发送请求
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: 'post',
          data: {
            code
          },
          success: (res) => {
            // console.log(res);
            const token = res.data.token;
            this.globalData.token = token;
            // 本地存储
            wx.setStorageSync('token', token)
          }
        })
      }
    })
  }
})