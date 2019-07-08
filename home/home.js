// pages/home/home.js
Page({
  data: {
       movielist:[]//保存电影列表
  },
  loadMore2:function(){
     //1:请求自己创建服务器
     wx.request({
       url: 'http://127.0.0.1:3000/movielist',
       data:{pno:1,pageSize:10},
       success:res=>{
          //console.log(res);
          var list = res.data.data;
          var rows = this.data.movielist.concat(list);
          this.setData({
            movielist:rows
          })
       }
     })

  },


  loadMore:function(){
    //加载更多
    //1:调云函数 movielist2
    wx.cloud.callFunction({
      name: "movielist2",  //云函数名称
      data: {
        start: this.data.movielist.length,
        count: 10
      }
    }).then(res => {
      //将字符串转js对象
      var obj = JSON.parse(res.result);
      //电影列表
      this.setData({
        movielist: this.data.movielist
           .concat(obj.subjects)
      });

    }).catch(err => {
      console.log(err);
    });
  },
  jumpComment:function(e){
    //跳转:关闭并且跳转
    //wx.redirectTo({
    //  url: '/pages/comment/comment',
    //});
    //获取电影id
    //e 事件对象;target 触发事件元素 button
    //dataset所有自定义属性
    var id = e.target.dataset.movieid;
    //跳转:保存并且跳转
    wx.navigateTo({
      url: '/pages/comment/comment?id='+id,
    })

  },
  onLoad: function (options) {
    //this.loadMore2(); 
    this.loadMore();  
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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})