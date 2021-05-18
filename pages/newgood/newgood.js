// pages/newgood/newgood.js
const db=wx.cloud.database({});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey:'',//搜索关键词
    list:[],//存放搜索结果
  },
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?goodid=' + e.currentTarget.dataset.id
    })
  },
  getSearchKey(e) {
    console.log(e)
    this.setData({
      searchKey: e.detail.value //搜索词
    })
  },
  goSearch() {   
    let that=this
    const _ = db.command
    let searchKey=that.data.searchKey
    if(searchKey){
      wx.cloud.database().collection('goods').where({
        name:{
        $regex:'.*'+ searchKey,//模糊搜索，所有带searchKey的值
        $options: 'i'//搜索不区分大小写
      },
        num:_.gt(0)
    }
      )
      .get()
      .then(res => {
           console.log('222请求成功',res.data)
           this.setData({
             list:res.data
           })
        })
        .catch(err=>{
          console.log('222请求失败',res)
        } )
    }
  },
  onLoad (e) {
    const _ = db.command
    let searchKey=e.searchKey
    console.log(searchKey)
    if(searchKey){
      wx.cloud.database().collection('goods').where({name:{
        $regex:'.*'+ searchKey,//模糊搜索，所有带searchKey的值
        $options: 'i'//搜索不区分大小写
      },
        num: _.gt(0)}
      )
      .get()
      .then(res => {
           console.log('222请求成功',res.data)
           this.setData({
             list:res.data
           })
        })
        .catch(err=>{
          console.log('222请求失败',res)
        } )
    }
    }
  },
  
)