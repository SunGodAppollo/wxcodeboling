// pages/withdrawal/withdrawal.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		money: ""
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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

	//改变data.money
	changeMoneyFunc: function (event) {
		this.setData({
			money: event.detail.value
		})
	},

	//提现
	submitFunc: function() {
		var self = this;
		var money = self.data.money;
		if (money === '') {
			wx.showToast({
				title: "请输入提现金额",
				icon: 'none',
				duration: 2000
			})
			return;
		}
		getApp().post('/appUser/withdrawCash',{
			userId: wx.getStorageSync('user').id,
			money: money
		},function(r) {
			if(r.code === 0) {
				wx.showToast({
					title: "操作成功",
					icon: 'success',
					duration: 2000
				})
				setTimeout(function(r){
					wx.navigateBack({
						delta: 1
					})
				},2000)
			}
		})
	}
})