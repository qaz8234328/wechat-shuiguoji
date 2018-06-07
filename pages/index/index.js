//index.js
//获取应用实例

Page({
 
  data: {
    awardList:[],
    isRunning:false,//是否正在抽奖
    indexSelect: 0,//被选中的奖品index
    colorAwardDefault: 'blue',//奖品默认颜色
    colorAwardSelect: 'white',//奖品选中颜色
    barNumber: 0,//bar数量
    sevenNumber: 0,//数字7数量
    starNumber: 0,//星星数量
    alarmNumber: 0,//铃铛数量
    appleNumber: 0,//苹果数量
    my_balance: 0,//可用金币
    win_number:0,//当前赢取
    _jumpnum: 1,//这些需要算出来
    _total:200,//默认分数
    _currentshowlist:[1],
    imageAward: [
      '../../images/icons/apple.png', //0
      '../../images/icons/alarm_2.png', //1
      '../../images/icons/b_bar.png', //2
      '../../images/icons/alarm.png', //3
      '../../images/icons/apple.png', //4
      '../../images/icons/b_star_2.png', //5
      '../../images/icons/apple_2.png', //6
      '../../images/icons/cha.png', //7
      '../../images/icons/cha.png', //8
      '../../images/icons/alarm.png', //9
      '../../images/icons/b_star.png', //10
      '../../images/icons/apple.png', //11
      '../../images/icons/b_star.png', //12
      '../../images/icons/77.png', //13
      '../../images/icons/77_2.png', //14
      '../../images/icons/apple.png', //15
    ],//奖品图片数组
  },
  onLoad:function(){
  var index=0;
  var awardList=[];
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        if (i == 0 || j == 0 || i == 4 || j == 4) {
         
          console.log("i:"+i+"j:"+j+"i*j"+i*j);
          console.log("index:"+index);

          var tpleft = j * (150);
          var tptop = i * (150) ;

          var imageAward = this.data.imageAward[index];
          awardList.push({ topAward: tptop, leftAward: tpleft, imageAward: imageAward });
          //awardList.push({ topAward: tptop, leftAward: tpleft});
          index++;
        }
      }
    }
    var _this = this;
    var my_balance = _this.getStorage("my_balance");

    console.log("my_balance:" + my_balance);
    this.setData({
      awardList: awardList,
      my_balance: my_balance
    })
  },
  //开始按钮
  start:function(){
    
    console.log(this.data.isRunning);
    //if (this.data.isRunning){
    //  return false;
    //}
   
    var i = 0;
    var _this = this;
   
    var indexSelect = 0
    var indexArray=[0,1,2,3,4,6,8,10,15,14,13,12,11,9,7,5];
    var _index=0;
    var jumpindex = 0;
    var time = 500;
    var jumpmax = 2*15 + parseInt(Math.random() * (100 - 1 + 1) + 1);
    var timer = null;
    _this.setData({
      isRunning: true
    })


    var flag= _this.isAction();
    function timerdo() {
      if (_index > 15) {
        _index = 0;
      }
      time = _this.changeshowlist(jumpindex);
      //console.log("speed:" + this.data._currentshowlist);
     
      jumpindex++;
      //console.log(jumpmax);
      if (jumpindex >= jumpmax) {
        //debugger;
        clearTimeout(timer);
       // self._startbox = self._endbox;
      
        setTimeout(function () { 
          
         
          _this.result();

         }, 200);
      }
      else {
        timer = setTimeout(timerdo, time);
      
       
        _this.setData({
          indexSelect: indexArray[_index]
        });
        _index++;
      }
    }
    if (flag){
        timerdo();
    }
    flag=true;
   
  },
  clearMoney:function(){//清空下注
    var _this=this;
    _this.setData({
      barNumber:0,
      sevenNumber:0,
      starNumber:0,
      alarmNumber:0,
      appleNumber:0
    })
  },
  isAction: function (){
    //1.先判断是否下注
    var barNumber = this.data.barNumber;
    var sevenNumber = this.data.sevenNumber;
    var starNumber = this.data.starNumber;
    var alarmNumber = this.data.alarmNumber;
    var appleNumber = this.data.appleNumber;
    var _this=this;
   
    if (barNumber == 0 && sevenNumber == 0 && starNumber == 0 && alarmNumber == 0 && appleNumber == 0) {
      _this.showModal("提示", "您还未下注");
     
      return false;
    }
    return true;
  },
  
  account:function(){
  


  },
  result :function(){
    var cardinalNumber=5;
    var barNumber = this.data.barNumber;
    var sevenNumber = this.data.sevenNumber;
    var starNumber = this.data.starNumber;
    var alarmNumber = this.data.alarmNumber;
    var appleNumber = this.data.appleNumber;
    var totle=0;
    //获取余额
    var _this = this;
    var my_balance = _this.getStorage("my_balance");
    console.log(my_balance);



    var indexSelect = this.data.indexSelect;
    var awardList = this.data.awardList;
    console.log(indexSelect);
    console.log(awardList);
    var winnerName="";
    if (indexSelect == 0 || indexSelect == 4 || indexSelect == 11 || indexSelect == 15 ){//苹果 两倍积分
      totle+= appleNumber * cardinalNumber *2;
      winnerName = "苹果";
      
    }
    if (indexSelect==1){//铃铛*2 三倍积分
      totle += alarmNumber * cardinalNumber * 2 + cardinalNumber;

      winnerName = "铃铛*2";
    }
    if(indexSelect==2){//bar*30 30倍积分
      //barNumber
      totle += barNumber * cardinalNumber * 30;
      winnerName = "bar*30";
    }
    if(indexSelect==3||indexSelect==9){//铃铛 
      totle += alarmNumber * cardinalNumber * 2;
      winnerName = "铃铛";
    }
    if(indexSelect==5){//星星*2 三积分
     
      totle += starNumber * cardinalNumber * 3 + cardinalNumber;
      winnerName = "星星*2";
    }
    if(indexSelect==6){//苹果*2 两倍积分
      totle += starNumber * cardinalNumber * 2 + cardinalNumber;
      winnerName = "苹果*2";
    }
    if (indexSelect == 7 || indexSelect == 8){ //幸运数字 十倍积分
     // totle += (barNumber + sevenNumber + starNumber + alarmNumber + appleNumber) * cardinalNumber *5
      totle+=20;
      winnerName = "幸运数字";
    }
    if (indexSelect == 10 || indexSelect == 12) { //星星 三倍积分
      totle += starNumber * cardinalNumber * 2;
      winnerName = "星星";
    }
    if(indexSelect==13){//一个7 五倍积分
      console.log("一个7");
      totle += sevenNumber * cardinalNumber * 3;
      winnerName = "一个7";
    }
    if(indexSelect==14){//7*2 5倍积分
      console.log("7*2");
      totle += sevenNumber * cardinalNumber * 3 + cardinalNumber;
      winnerName = "7*2";
    }
    if(totle==0){
      _this.showModal("很遗憾", "未获得金币");
    }else{
      _this.showModal("恭喜您", "获得了" + totle + "金币");
    }

    var my_balance = this.data.my_balance;
    this.setData({
      my_balance: my_balance + totle,
      win_number: totle
    })

    _this.setStorage("my_balance", this.data.my_balance);
  },
  showModal:function(title,content){
    var _this= this;
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,//去掉取消按钮
      success: function (res) {
        //清空投注
        _this.clearMoney();
        _this.setData({
          isRunning: false
        })
      }
    })
  },
  getStorage:function(key){
  
    try {
      var value = wx.getStorageSync(key)
      if (!value) {
        //用户首次登陆送200金币
        wx.setStorage({
          key: 'my_balance',
          data: '200',
        })
      }
      return value;
    } catch (e) {
      var _this=this;
      _this.showModal("提示","网络异常,请重新登录");
      // Do something when catch error
    }
  },
  setStorage:function(key,value){
      try {
        wx.setStorageSync(key, value);
      } catch (e) {
        var _this = this;
        _this.showModal("提示", "网络异常,请重新登录");
      }
  },
  changeshowlist: function (jumpindex){
    //debugger;
    var i,
      len = this.data._currentshowlist.length,
      jumpmax = this.data._jumpnum;
    switch (jumpindex) {  
      case 0:
        var v = this.data._currentshowlist[0] + 1;
        this.data._currentshowlist.length = 0;
        v = v > 24 ? v - 24 : v;
        this.data._currentshowlist[0] = v;
        return 400;
      case 1:
        if (len == 1) {
          var v = this.data._currentshowlist[0] + 1;
          v = v > 24 ? v - 24 : v;
          this.data._currentshowlist.push(v);
        }
        return 350;
      case 2:
        if (len == 2) {
          var v = this.data._currentshowlist[1] + 1;
          v = v > 24 ? v - 24 : v;
          this.data._currentshowlist.push(v);
        }
        return 300;
      case 3:
        if (len == 3) {
          var v = this.data._currentshowlist[2] + 1;
          v = v > 24 ? v - 24 : v;
          this.data._currentshowlist.push(v);
        }
        return 200;
      case jumpmax - 1:
        var v = this.data._currentshowlist[0] + 1;
        this.data._currentshowlist.length = 0;
        v = v > 24 ? v - 24 : v;
        this.data._currentshowlist[0] = v;
        return 800;
      case jumpmax - 2:
        var v = this.data._currentshowlist[0] + 1;
        this.data._currentshowlist.length = 0;
        v = v > 24 ? v - 24 : v;
        this.data._currentshowlist[0] = v;
        return 700;
      case jumpmax - 3:
        var v = this.data._currentshowlist[0] + 1;
        this.data._currentshowlist.length = 0;
        v = v > 24 ? v - 24 : v;
        this.data._currentshowlist[0] = v;
        return 600;
      case jumpmax - 4:
        var v = this.data._currentshowlist[0] + 1;
        this.data._currentshowlist.length = 0;
        v = v > 24 ? v - 24 : v;
        this.data._currentshowlist[0] = v;
        return 400;
      case jumpmax - 5:
        var v = this.data._currentshowlist[0] + 1;
        this.data._currentshowlist.length = 0;
        v = v > 24 ? v - 24 : v;
        this.data._currentshowlist[0] = v;
        return 300;
      case jumpmax - 6:
        var v = this.data._currentshowlist[1] + 1;
        this.data._currentshowlist.length = 0;
        v = v > 24 ? v - 24 : v;
        this.data._currentshowlist[0] = v;
        return 200;
      case jumpmax - 7:
        var v1 = this.data._currentshowlist[1] + 1;
        var v2 = this.data._currentshowlist[2] + 1;
        this.data._currentshowlist.length = 0;
        v1 = v1 > 24 ? v1 - 24 : v1;
        v2 = v2 > 24 ? v2 - 24 : v2;
        this.data._currentshowlist[0] = v1;
        this.data._currentshowlist[1] = v2;
        return 100;
      case jumpmax - 8:
        var v1 = this.data._currentshowlist[1] + 1;
        var v2 = this.data._currentshowlist[2] + 1;
        var v3 = this.data._currentshowlist[3] + 1;
        this.data._currentshowlist.length = 0;
        v1 = v1 > 24 ? v1 - 24 : v1;
        v2 = v2 > 24 ? v2 - 24 : v2;
        v3 = v3 > 24 ? v3 - 24 : v3;
        this.data._currentshowlist[0] = v1;
        this.data._currentshowlist[1] = v2;
        this.data._currentshowlist[2] = v3;
        return 50;
      default:
        for (i = 0; i < len; i++) {
          this.data._currentshowlist[i]++;
          if (this.data._currentshowlist[i] > 24) {
            this.data._currentshowlist[i] -= 24;
          }
        }
        return 30;
    }
  },
  bar_click:function(){
    var my_balance = this.data.my_balance; 
    if (my_balance <= 0) return false;
     
    var num = this.data.barNumber+1;
    this.setData({
      barNumber:  num,
      my_balance: my_balance -5
    })


  },
  seven_click:function(){
    var my_balance = this.data.my_balance;
    if (my_balance <= 0) return false;

    var num = this.data.sevenNumber + 1;
    this.setData({
      sevenNumber:  num,
      my_balance: my_balance - 5
    })
  },
  star_click: function () {
    var my_balance = this.data.my_balance;
    if (my_balance <= 0) return false;

    var num = this.data.starNumber + 1;
    this.setData({
      starNumber:  num,
      my_balance: my_balance - 5
    })
  },
  alarm_click: function () {
    var my_balance = this.data.my_balance;
    if (my_balance <= 0) return false;
    
    var num = this.data.alarmNumber + 1;
    this.setData({
      alarmNumber: num,
      my_balance: my_balance - 5
    })
  },

  apple_click: function () {
    var my_balance = this.data.my_balance;
    if (my_balance <= 0) return false;

    var num = this.data.appleNumber + 1;
    this.setData({
      appleNumber:  num,
      my_balance: my_balance - 5
    })
  },
  //分享信息
  onShareAppMessage: function (res) {
    console.log(res);
    try {
      var value = wx.getStorageSync('money');
      var _this=this;
      if (value) {
        // Do something with return value
      
        //_this.setStorage("my_balance", this.data.my_balance+50);
      }else{
        console.log("success");
      }
    } catch (e) {
      // Do something when catch error
      console.log("fail");
    }

    wx.showShareMenu({
      withShareTicket: true
    })
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
        var _this=this;
        console.log("成功");
        //_this.showModal("很遗憾", "未获得金币");
      },
      fail: function (res) {
        // 转发失败
        console.log("失败");
      }
    }
  }



})
