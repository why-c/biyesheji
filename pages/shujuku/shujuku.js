// pages/shujuku/shujuku.js
let app=getApp();
let searchKey ='';
let userOrder='';
  Page({
    data: {
      banner: [{
          picUrl: '/image/top1.png'
        },
        {
          picUrl: '/image/top2.png'
        }
      ],
      Good:[]
    },
    //页面可见
    onShow() {
      this.getTopBanner(); //请求顶部轮播图
      this.getHotGood()
    },
    getTopBanner() {
      wx.cloud.database().collection("lunbotu")
        .get()
        .then(res => {
          console.log("首页banner成功", res.data)
          if (res.data && res.data.length > 0) {
            //如果后台配置轮播图就用后台的，没有的话就用默认的
            this.setData({
              banner: res.data
            })
          }
        }).catch(res => {
          console.log("首页banner失败", res)
        })
    },
    // wx.cloud.database().collection('goods')
    // .get({
    //   //请求成功
    //   success(res){
    //     console.log('请求成功',res)
    //     this.setData({
    //       list:res.data
    //     })
    //   },
    //   fall(err){
    //     console.log('请求失败',err)
    //   }
    // })//查询

    //es6简洁写法

  getSearchKey(e) {
    // 动态获得input值，e.detail.value
    searchKey=e.detail.value
    console.log(searchKey)
  } ,  
  getHotGood() {
    let userInfo = app.globalData.userInfo;
    if (!userInfo || !userInfo.nickName) {
      return;
    }
    wx.cloud.callFunction({
      name:"getOrderList",
      data:{
        action:'all'
      }
    }).then(res=>{
      let mylist=res.result.data
      console.log("处理前信息",mylist)
      let user=[];
      let tempArr=[];
      mylist.forEach(item => {
        if (tempArr.indexOf(item._openid) === -1) {
          user.push({
            title: item._openid,
            list: [item.good._id]
          });
          tempArr.push(item._openid);
        } else {
          for (let j = 0; j < user.length; j++) {
            if (user[j].title == item._openid) {
              if(user[j].list.indexOf(item.good._id) === -1){
                user[j].list.push(item.good._id);
              }
              break;
            }
          }
        }
      })
      console.log("处理后信息",user)
      let myopenid = app.globalData.openid;
      let myself = [];
      let another=[];
      var max = 0;
      console.log("openid",myopenid)
      user.forEach(item=>{
        if(item.title===myopenid){
          myself = item;
        }
      })
      user.forEach(item=>{
        var mymax=0; 
        console.log("每次循环",item)   
        for (let i = 0; i < myself.list.length; i++) {
            for (let j = 0; j < item.list.length; j++) {
                if(myself.list[j] === item.list[i]){
                    mymax=mymax+1;  
                }
        }}  
        if((mymax!==myself.list.length&&mymax>max)){
          max=mymax; 
          another=item;
        }
      })
       let tuijian=[]
       for (let j = 0; j < another.list.length ;j++) {
        if(myself.list.indexOf(another.list[j])===-1){
          tuijian.push(another.list[j]);
        }
      }
       console.log("tuijian",tuijian)
      wx.cloud.callFunction({
        name: "getGoodList",
        data: {
          action: 'getHot',
          myarray: tuijian
        }
      }).then(res => {
        console.log("首页推荐商品数据", res.result)
        this.setData({
          goodList: res.result.data,
        })
      }).catch(res => {
        console.log("商品数据请求失败", res)
      })
      })
      .catch(res=>{
        console.log("订单信息获得失败",res)
      })     
    //    wx.cloud.callFunction({
    //   name: "getGoodList",
    //   data: {
    //     action: 'getTuijian',
    //     myarray: Good
    //   }
    // }).then(res => {
    //   console.log("首页推荐商品数据", res.result)
    //   this.setData({
    //     goodList: res.result.data,
    //   })
    // }).catch(res => {
    //   console.log("商品数据请求失败", res)
    // })    
  },
  goSearch(){
    wx.navigateTo({     
      url: '/pages/newgood/newgood?searchKey='+searchKey,
    })
  },
  goToMall(){
    wx.navigateTo({
      url: '/pages/Mall/Mall',
    })
  },
  goToPhone(){
    wx.navigateTo({
      url: '/pages/Phone/Phone',
    })
  },
  goToNew(){
    wx.navigateTo({
      url: '/pages/New/New',
    })
  },
  goHuiShou(){
    wx.navigateTo({
      url: '/pages/huishou/huishou',
    })
  },
  // e.currentTarget.dataset.id js接受前端数据的方法 data-xx
  goDetail(e) {
    // console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/detail/detail?goodid=' + e.currentTarget.dataset.id
    })
  },
  goToGujia(){
    wx.navigateTo({
      url: '/pages/Gujia/Gujia',
    })
  }, 
   onPullDownRefresh: function () {
    this.getHotGood()
  },


  })
