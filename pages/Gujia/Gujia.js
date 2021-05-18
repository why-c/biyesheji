// pages/Gujia/Gujia.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array1: ["iphone12", 'iphoneX', 'iphone7', 'iphone6 Plus', 'iphone5', ],
    array2: ["32G", '64G', '256G',],
    array3: ["保修期剩余大于一个自然月", '过保或保修期小于一个自然月'],
    array4: ["全新未使用", '完好无损无使用痕迹', '有轻微划痕', '有严重磕碰', '机身有破裂', ],
    array5:["1年",'2年','3年及以上'],
    index1:0,
    index2:0,
    index3:0,
    index4:0,
    index5:0,
    price:0,
    isShowPrice: false,
  },

  bindPickerChange(e) {
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2(e) {
    this.setData({
      index2: e.detail.value
    })
  },
  bindPickerChange3(e) {
    this.setData({
      index3: e.detail.value
    })
  },
  bindPickerChange4(e) {
    this.setData({
      index4: e.detail.value
    })
  },
  bindPickerChange5(e) {
    this.setData({
      index5: e.detail.value
    })
  },
  gujia(e){
    var phonePrice=["4000","3000",'1980','680'];
    var cachePrice=['1','1.1','1.3'];
    var fixPrice=['1','0.95'];
    var usePrice=['1', '0.95','0.9','0.85','0.8','0.7'];
    var timePrice=['0.8','0.7','0.5'] 
    
    var p=(phonePrice[this.data.index1]*cachePrice[this.data.index2]*fixPrice[this.data.index3])*usePrice[this.data.index4]*timePrice[this.data.index5]  
    console.log("估价为",p)
    this.setData({
      isShowPrice:true,
      price:p
    })
  }
})