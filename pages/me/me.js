
const app = getApp();
Page({
  // 页面的初始数据
  data: {
    isShowUserName: false,
    userInfo: null,
  },
  // button获取用户信息
  // onGotUserInfo: function (e) {
  //   console.log('用户信息', e)
  //   if (e.detail.userInfo) {
  //     var user = e.detail.userInfo;
  //     this.setData({
  //       isShowUserName: true,
  //       userInfo: e.detail.userInfo,
  //     })
  //     user.openid = app.globalData.openid;
  //     app._saveUserInfo(user);
  //   } else {
  //     app.showErrorToastUtils('登陆需要允许授权');
  //   }
  // },
  getUserProfile(){
    wx.getUserProfile({
      desc:'授权登入',
      success:(res)=>{
        console.log('获得用户信息',res)
        let user=res.userInfo
        wx.setStorageSync('user', user)
        app.globalData.userInfo=user
        this.setData({
          isShowUserName:true,
          userInfo:user,
        })
      },
      fail:res=>{
        console.log('无法获得用户信息',res)
      }
    })
  },
  //退出登录
  tuichu() {
    this.setData({
      isShowUserName: false,
      userInfo: null,
    })
    app._saveUserInfo(null);
  },
  // 去我的订单页
  goToMyOrder: function () {
    wx.navigateTo({
      url: '/pages/dingDan/dingDan',
    })
  },
  // 去我的评论页
  goToMyComment: function () {
    wx.navigateTo({
      url: '/pages/myComment/myComment',
    })
  },
  //去我的发布页
  goToSeller() {
    wx.navigateTo({
      url: '/pages/seller/seller',
    })
  },
  onShow() {
    var user = app.globalData.userInfo;
    if (user && user.nickName) {
      this.setData({
        isShowUserName: true,
        userInfo: user,
      })
    }
  },
  goToAddress(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  }
})