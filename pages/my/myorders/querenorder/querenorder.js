// pages/my/myorders/querenorder/querenorder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:'',
    userid:0,
    address:[],
    suc:[],
    alldata:[],
	  carIds: "",
    index:1,
    count:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
	  if (options.caris) {
		  var resData = getApp().globalData.resData;
		  that.setData({
			  alldata: resData.data,
			  address: resData.data.deaddr,
        suc: resData.data.suc,
        userid: wx.getStorageSync("user").id,
		  });
	}else{
		var info = "[{'shopId': '" + options.shopid + "','infos': [{'productId': '" + options.goodsid + "','num': '1'}]}]";
		that.setData({
			info: info,
			userid: wx.getStorageSync("user").id,
		});
		that.getorder();
	}
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**获取订单信息
  */
  getorder:function(){
    var that=this;
    var url='/order/confirmOrder';
	  var data = { userId: that.data.userid, info: that.data.info, carIds: that.data.carIds};
      app.post(url,data,function(resData){
        console.log(resData);
        that.setData({
          alldata:resData.data,
          address:resData.data.deaddr,
          suc:resData.data.suc,
        });
      });
  },
  /* 加数 */
  addCount: function (e) {
    var sindex=e.target.dataset.sindex;
    var index = e.target.dataset.index;
    console.log(index);
    console.log("刚刚您点击了加+");
    var count = this.data.count;
    var totalOrderAmount=this.data.alldata.totalOrderAmount;
    var addprice=this.data.suc[sindex].infos[index].price;
    console.log(totalOrderAmount);
    console.log(addprice);
    // 商品总数量+1
    this.setData({
      count: count+1,
      //alldata.totalOrderAmount:totalOrderAmount+addprice,
    });


  },
  /* 减数 */
  delCount: function (e) {
    var index = e.target.dataset.index;
    console.log(index);
    console.log("刚刚您点击了加一");
    var count = this.data.count;
    // 商品总数量-1
    if (count > 1) {
      this.setData({
        count: count-1
      });
    }

  },



  //提交订单
  tijiao:function(){
    var that=this;
    var suc=that.data.suc;
    var addressid=that.data.address.addrId;
    var allinfo=[];
    suc.forEach(function(value,index,array){
      var myinfos=[];
      value.infos.forEach(function(v,index,array){
         var info={
           productId:v.productId,
           num:v.num,
           //secondId:'4c22812356a0414383046bf7eea2bd3b'
         }
         myinfos.push(info);
      });

      var myshop={
        shopId:value.shopId,
        addrId:addressid,
        //couponId:'4',
        infos:myinfos,
      };
      allinfo.push(myshop);
    });
    //数组转json
    var info=JSON.stringify(allinfo);
    console.log(info);


     //var info="[{'shopId': '店铺id','addrId':'收获地址id ','couponId':'优惠卷id','infos': [{'productId': '商品id','num': '购买数量','secondId':'次卡id'}]}]";
     var url='/order/createOrder';
       var data={userId:that.data.userid,info:info};
       app.post(url,data,function(resData){
         console.log(resData);
			if(resData.code === 0) {
				wx.redirectTo({
					url: '/pages/pay/pay?payid=' + resData.data.payid + "&payAmount=" + resData.data.payAmount + "&payNum=" + resData.data.payNum,
				})
			}
       });
  },

})
