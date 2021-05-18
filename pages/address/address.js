// pages/address/address.js
let address =''
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getSearchKey(e) {
    address=e.detail.value
    console.log(address)
  } ,
  addAddress(){
    
  }
})