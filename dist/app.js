'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _constant = require('./utils/constant.js');

var _api = require('./api/api.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/start/start'],
      window: {
        backgroundTextStyle: 'dark',
        navigationBarBackgroundColor: '#FFFFFF',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black',
        enablePullDownRefresh: false,
        backgroundColor: '#EFEFEF'
      },
      "tabBar": {
        "color": "#999999",
        "selectedColor": "#ff6a3c",
        "backgroundColor": "#ffffff",
        "borderStyle": "black",
        "list": [{
          "pagePath": "pages/start/start",
          "text": "首页",
          "iconPath": "images/icon_home.png",
          "selectedIconPath": "images/icon_home_active.png"
        }, {
          "pagePath": "pages/start/start",
          "text": "分类",
          "iconPath": "images/icon_classify.png",
          "selectedIconPath": "images/icon_classify_active.png"
        }, {
          "pagePath": "pages/start/start",
          "text": "购物车",
          "iconPath": "images/icon_shop_cart.png",
          "selectedIconPath": "images/icon_shop_cart_active.png"
        }, {
          "pagePath": "pages/start/start",
          "text": "我",
          "iconPath": "images/icon_info.png",
          "selectedIconPath": "images/icon_info_active.png"
        }]
      }
    };
    _this.globalData = {
      userInfo: null,
      appid: "",
      secret: "",
      subDomain: 'tz'
    };

    _this.use('requestfix');
    _this.use('promisify');

    return _this;
  }
  //  onLaunch() {
  //   var that = this;
  //   //  获取商城名称
  //   wx.request({
  //     url: 'https://api.it120.cc/'+ that.globalData.subDomain +'/config/get-value',
  //     data: {
  //       key: 'mallName'
  //     },
  //     success: function(res) {
  //       if (res.data.code == 0) {
  //         wx.setStorageSync('mallName', res.data.data.value);
  //       }
  //     }
  //   })
  //   wx.request({
  //     url: 'https://api.it120.cc/' + that.globalData.subDomain + '/score/send/rule',
  //     data: {
  //       code: 'goodReputation'
  //     },
  //     success: function (res) {
  //       if (res.data.code == 0) {
  //         that.globalData.order_reputation_score = res.data.data[0].score;
  //       }
  //     }
  //   })
  //   wx.request({
  //     url: 'https://api.it120.cc/' + that.globalData.subDomain + '/config/get-value',
  //     data: {
  //       key: 'recharge_amount_min'
  //     },
  //     success: function (res) {
  //       if (res.data.code == 0) {
  //         that.globalData.recharge_amount_min = res.data.data.value;
  //       }
  //     }
  //   })
  //   this.login();
  // };
  // login  () {
  //   var that = this;
  //   var token = that.globalData.token;
  //   if (token) {
  //     wx.request({
  //       url: 'https://api.it120.cc/' + that.globalData.subDomain + '/user/check-token',
  //       data: {
  //         token: token
  //       },
  //       success: function (res) {
  //         if (res.data.code != 0) {
  //           that.globalData.token = null;
  //           that.login();
  //         }
  //       }
  //     })
  //     return;
  //   }
  //   wx.login({
  //     success: function (res) {
  //       wx.request({
  //         url: 'https://api.it120.cc/'+ that.globalData.subDomain +'/user/wxapp/login',
  //         data: {
  //           code: res.code
  //         },
  //         success: function(res) {
  //           if (res.data.code == 10000) {
  //             // 去注册
  //             that.registerUser();
  //             return;
  //           }
  //           if (res.data.code != 0) {
  //             // 登录错误
  //             wx.hideLoading();
  //             wx.showModal({
  //               title: '提示',
  //               content: '无法登录，请重试',
  //               showCancel:false
  //             })
  //             return;
  //           }
  //           //console.log(res.data.data)
  //           that.globalData.token = res.data.data.token;
  //           that.globalData.uid = res.data.data.uid;
  //         }
  //       })
  //     }
  //   })
  // };
  // registerUser () {
  //   var that = this;
  //   wx.login({
  //     success: function (res) {
  //       var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
  //       wx.getUserInfo({
  //         success: function (res) {
  //           var iv = res.iv;
  //           var encryptedData = res.encryptedData;
  //           // 下面开始调用注册接口
  //           wx.request({
  //             url: 'https://api.it120.cc/' + that.globalData.subDomain +'/user/wxapp/register/complex',
  //             data: {code:code,encryptedData:encryptedData,iv:iv}, // 设置请求的 参数
  //             success: (res) =>{
  //               wx.hideLoading();
  //               that.login();
  //             }
  //           })
  //         }
  //       })
  //     }
  //   })
  // };
  // sendTempleMsg (orderId, trigger, template_id, form_id, page, postJsonString){
  //   var that = this;
  //   wx.request({
  //     url: 'https://api.it120.cc/' + that.globalData.subDomain + '/template-msg/put',
  //     method:'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     data: {
  //       token: that.globalData.token,
  //       type:0,
  //       module:'order',
  //       business_id: orderId,
  //       trigger: trigger,
  //       template_id: template_id,
  //       form_id: form_id,
  //       url:page,
  //       postJsonString: postJsonString
  //     },
  //     success: (res) => {
  //       //console.log('*********************');
  //       //console.log(res.data);
  //       //console.log('*********************');
  //     }
  //   })
  // };
  // sendTempleMsgImmediately (template_id, form_id, page, postJsonString) {
  //   var that = this;
  //   wx.request({
  //     url: 'https://api.it120.cc/' + that.globalData.subDomain + '/template-msg/put',
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     data: {
  //       token: that.globalData.token,
  //       type: 0,
  //       module: 'immediately',
  //       template_id: template_id,
  //       form_id: form_id,
  //       url: page,
  //       postJsonString: postJsonString
  //     },
  //     success: (res) => {
  //       console.log('*********************');
  //       console.log(res.data);
  //       console.log('*********************');
  //     }
  //   })
  // };
  // getUserInfo (cb) {
  //   var that = this
  //   if (this.globalData.userInfo) {
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   } else {
  //     //调用登陆接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             that.globalData.userInfo = res.userInfo
  //             typeof cb == "function" && cb(that.globalData.userInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  //
  // };
  // // sleep (s) {
  // //   return new Promise((resolve, reject) => {
  // //     setTimeout(() => {
  // //       resolve('promise resolved')
  // //     }, s * 1000)
  // //   })
  // // }
  // //
  // // async testAsync () {
  // //   const data = await this.sleep(3)
  // //   console.log(data)
  // // }
  // //
  // // getUserInfo(cb) {
  // //   const that = this
  // //   if (this.globalData.userInfo) {
  // //     return this.globalData.userInfo
  // //   }
  // //   wepy.getUserInfo({
  // //     success (res) {
  // //       that.globalData.userInfo = res.userInfo
  // //       cb && cb(res.userInfo)
  // //     }
  // //   })
  // // }


  _createClass(_default, [{
    key: 'onLaunch',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var that, userSpecialInfo, userInfo, res, d, c, systemInfo, url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;
                //用户信息

                userSpecialInfo = _wepy2.default.getStorageSync(_constant.USER_SPECICAL_INFO) || {};
                // 用户普通信息

                userInfo = _wepy2.default.getStorageSync(_constant.USER_INFO) || {};

                //如果信息过期

                if (!((!userSpecialInfo.openid || (userSpecialInfo.expires_in || Date.now()) < Date.now() + 600) && !userInfo.nickName)) {
                  _context.next = 22;
                  break;
                }

                _context.next = 6;
                return _wepy2.default.login();

              case 6:
                res = _context.sent;

                console.log("safsfsdfsdfsdfsdfsf");
                console.log(res);

                if (!res.code) {
                  _context.next = 21;
                  break;
                }

                d = that.globalData; //这里存储了appid、secret、token串    
                //存储userInfo 

                _context.next = 13;
                return _wepy2.default.getUserInfo();

              case 13:
                c = _context.sent;

                _wepy2.default.setStorageSync(_constant.USER_INFO, c.userInfo);

                //存储系统信息 
                systemInfo = _wepy2.default.getSystemInfoSync();

                _wepy2.default.setStorageSync(_constant.SYSTEM_INFO, systemInfo);
                (0, _api.wxJsCode2Session)({
                  query: {
                    jsCode: res.code,
                    nickName: c.userInfo.nickName
                  }
                }).then(function (resp) {
                  var rlt = resp.data;
                  console.log("wxJsCode2Session..." + JSON.stringify(rlt));
                  if (rlt.result) {
                    var data = rlt.data;
                    if (data.openid) {
                      var obj = {};
                      obj.openid = data.openid;
                      obj.expires_in = Date.now() + data.expires_in;
                      //存储openid 
                      _wepy2.default.setStorageSync(_constant.USER_SPECICAL_INFO, obj);
                    }
                  } else {
                    var _obj = {};
                    _obj.openid = "oeuj50KHMqsh5kYZYWQJuwmY5yG0";
                    _obj.expires_in = "7200";
                    //存储openid 
                    _wepy2.default.setStorageSync(_constant.USER_SPECICAL_INFO, _obj);
                  }
                });

                url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';

                /* let b = await wepy.request({
                     url: url,
                     data: {},
                     method: 'POST',
                     header: {
                         'content-Type': 'application/x-www-form-urlencoded'
                     }
                 });
                 if (b.data.openid) {
                     let obj = {};
                     obj.openid = b.data.openid;
                     obj.expires_in = Date.now() + b.data.expires_in;
                      //存储openid 
                     wepy.setStorageSync(USER_SPECICAL_INFO, obj);
                      //存储userInfo 
                     let c = await wepy.getUserInfo();
                     wepy.setStorageSync(USER_INFO, c.userInfo);
                      //存储系统信息 
                     let systemInfo = await wepy.getSystemInfoSync();
                     wepy.setStorageSync(SYSTEM_INFO, systemInfo);
                     console.log(b, '登陆成功')
                 }*/

                _context.next = 22;
                break;

              case 21:
                console.log('获取用户登录态失败！' + res.errMsg);

              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLaunch() {
        return _ref.apply(this, arguments);
      }

      return onLaunch;
    }()
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJiYWNrZ3JvdW5kQ29sb3IiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJhcHBpZCIsInNlY3JldCIsInN1YkRvbWFpbiIsInVzZSIsInRoYXQiLCJ1c2VyU3BlY2lhbEluZm8iLCJnZXRTdG9yYWdlU3luYyIsIm9wZW5pZCIsImV4cGlyZXNfaW4iLCJEYXRlIiwibm93Iiwibmlja05hbWUiLCJsb2dpbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJjb2RlIiwiZCIsImdldFVzZXJJbmZvIiwiYyIsInNldFN0b3JhZ2VTeW5jIiwic3lzdGVtSW5mbyIsImdldFN5c3RlbUluZm9TeW5jIiwicXVlcnkiLCJqc0NvZGUiLCJ0aGVuIiwicmx0IiwicmVzcCIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzdWx0Iiwib2JqIiwidXJsIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQU9BOzs7Ozs7Ozs7Ozs7Ozs7QUFxREUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQWhEZkEsTUFnRGUsR0FoRE47QUFDUEMsYUFBTyxDQUNMLG1CQURLLENBREE7QUFLUEMsY0FBUTtBQUNOQyw2QkFBcUIsTUFEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLFFBSGxCO0FBSU5DLGdDQUF3QixPQUpsQjtBQUtOQywrQkFBdUIsS0FMakI7QUFNTkMseUJBQWlCO0FBTlgsT0FMRDtBQWFQLGdCQUFVO0FBQ1IsaUJBQVMsU0FERDtBQUVSLHlCQUFpQixTQUZUO0FBR1IsMkJBQW1CLFNBSFg7QUFJUix1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LEtBQTFELEdBQWtFLFVBQWxFLEdBQStFaUIsRUFBRWhCLE1BQWpGLEdBQTBGLFdBQTFGLEdBQXdHWSxJQUFJRyxJQUE1RyxHQUFtSCxnQzs7QUFFN0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQUYsd0JBQVFDLEdBQVIsQ0FBWSxlQUFlRixJQUFJcUIsTUFBL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEvVXFCLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuaW1wb3J0IHtcbiAgVVNFUl9TUEVDSUNBTF9JTkZPLFxuICBVU0VSX0lORk8sXG4gIFNZU1RFTV9JTkZPLFxuICBBRERSRVNTX0lELFxuICBTRUxfQ0xBU1NfQ09ERVxufSBmcm9tIFwiLi91dGlscy9jb25zdGFudFwiO1xuaW1wb3J0IHtcbiAgd3hKc0NvZGUyU2Vzc2lvbixcbiAgdXNlcjJzZXNzaW9uXG59IGZyb20gJy4vYXBpL2FwaSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvc3RhcnQvc3RhcnQnLFxuXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyxcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRUZFRkVGJ1xuICAgIH0sXG4gICAgXCJ0YWJCYXJcIjoge1xuICAgICAgXCJjb2xvclwiOiBcIiM5OTk5OTlcIixcbiAgICAgIFwic2VsZWN0ZWRDb2xvclwiOiBcIiNmZjZhM2NcIixcbiAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgXCJib3JkZXJTdHlsZVwiOiBcImJsYWNrXCIsXG4gICAgICBcImxpc3RcIjogW3tcbiAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL3N0YXJ0L3N0YXJ0XCIsXG4gICAgICAgIFwidGV4dFwiOiBcIummlumhtVwiLFxuICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25faG9tZS5wbmdcIixcbiAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25faG9tZV9hY3RpdmUucG5nXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL3N0YXJ0L3N0YXJ0XCIsXG4gICAgICAgIFwidGV4dFwiOiBcIuWIhuexu1wiLFxuICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25fY2xhc3NpZnkucG5nXCIsXG4gICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9pY29uX2NsYXNzaWZ5X2FjdGl2ZS5wbmdcIlxuICAgICAgfSwge1xuICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvc3RhcnQvc3RhcnRcIixcbiAgICAgICAgXCJ0ZXh0XCI6IFwi6LSt54mp6L2mXCIsXG4gICAgICAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvaWNvbl9zaG9wX2NhcnQucG5nXCIsXG4gICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9pY29uX3Nob3BfY2FydF9hY3RpdmUucG5nXCJcbiAgICAgIH0sIHtcbiAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL3N0YXJ0L3N0YXJ0XCIsXG4gICAgICAgIFwidGV4dFwiOiBcIuaIkVwiLFxuICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25faW5mby5wbmdcIixcbiAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25faW5mb19hY3RpdmUucG5nXCJcbiAgICAgIH1dXG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICBhcHBpZDpcIlwiLFxuICAgIHNlY3JldDpcIlwiLFxuICAgIHN1YkRvbWFpbjondHonLFxuICB9XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIHRoaXMudXNlKCdwcm9taXNpZnknKTtcblxuICB9XG4gIC8vICBvbkxhdW5jaCgpIHtcbiAgLy8gICB2YXIgdGhhdCA9IHRoaXM7XG4gIC8vICAgLy8gIOiOt+WPluWVhuWfjuWQjeensFxuICAvLyAgIHd4LnJlcXVlc3Qoe1xuICAvLyAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaXQxMjAuY2MvJysgdGhhdC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArJy9jb25maWcvZ2V0LXZhbHVlJyxcbiAgLy8gICAgIGRhdGE6IHtcbiAgLy8gICAgICAga2V5OiAnbWFsbE5hbWUnXG4gIC8vICAgICB9LFxuICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gIC8vICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09IDApIHtcbiAgLy8gICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnbWFsbE5hbWUnLCByZXMuZGF0YS5kYXRhLnZhbHVlKTtcbiAgLy8gICAgICAgfVxuICAvLyAgICAgfVxuICAvLyAgIH0pXG4gIC8vICAgd3gucmVxdWVzdCh7XG4gIC8vICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArICcvc2NvcmUvc2VuZC9ydWxlJyxcbiAgLy8gICAgIGRhdGE6IHtcbiAgLy8gICAgICAgY29kZTogJ2dvb2RSZXB1dGF0aW9uJ1xuICAvLyAgICAgfSxcbiAgLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgLy8gICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT0gMCkge1xuICAvLyAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS5vcmRlcl9yZXB1dGF0aW9uX3Njb3JlID0gcmVzLmRhdGEuZGF0YVswXS5zY29yZTtcbiAgLy8gICAgICAgfVxuICAvLyAgICAgfVxuICAvLyAgIH0pXG4gIC8vICAgd3gucmVxdWVzdCh7XG4gIC8vICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArICcvY29uZmlnL2dldC12YWx1ZScsXG4gIC8vICAgICBkYXRhOiB7XG4gIC8vICAgICAgIGtleTogJ3JlY2hhcmdlX2Ftb3VudF9taW4nXG4gIC8vICAgICB9LFxuICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAvLyAgICAgICBpZiAocmVzLmRhdGEuY29kZSA9PSAwKSB7XG4gIC8vICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnJlY2hhcmdlX2Ftb3VudF9taW4gPSByZXMuZGF0YS5kYXRhLnZhbHVlO1xuICAvLyAgICAgICB9XG4gIC8vICAgICB9XG4gIC8vICAgfSlcbiAgLy8gICB0aGlzLmxvZ2luKCk7XG4gIC8vIH07XG4gIC8vIGxvZ2luICAoKSB7XG4gIC8vICAgdmFyIHRoYXQgPSB0aGlzO1xuICAvLyAgIHZhciB0b2tlbiA9IHRoYXQuZ2xvYmFsRGF0YS50b2tlbjtcbiAgLy8gICBpZiAodG9rZW4pIHtcbiAgLy8gICAgIHd4LnJlcXVlc3Qoe1xuICAvLyAgICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArICcvdXNlci9jaGVjay10b2tlbicsXG4gIC8vICAgICAgIGRhdGE6IHtcbiAgLy8gICAgICAgICB0b2tlbjogdG9rZW5cbiAgLy8gICAgICAgfSxcbiAgLy8gICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAvLyAgICAgICAgIGlmIChyZXMuZGF0YS5jb2RlICE9IDApIHtcbiAgLy8gICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS50b2tlbiA9IG51bGw7XG4gIC8vICAgICAgICAgICB0aGF0LmxvZ2luKCk7XG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgICB9XG4gIC8vICAgICB9KVxuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy8gICB3eC5sb2dpbih7XG4gIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gIC8vICAgICAgIHd4LnJlcXVlc3Qoe1xuICAvLyAgICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLml0MTIwLmNjLycrIHRoYXQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKycvdXNlci93eGFwcC9sb2dpbicsXG4gIC8vICAgICAgICAgZGF0YToge1xuICAvLyAgICAgICAgICAgY29kZTogcmVzLmNvZGVcbiAgLy8gICAgICAgICB9LFxuICAvLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAvLyAgICAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT0gMTAwMDApIHtcbiAgLy8gICAgICAgICAgICAgLy8g5Y675rOo5YaMXG4gIC8vICAgICAgICAgICAgIHRoYXQucmVnaXN0ZXJVc2VyKCk7XG4gIC8vICAgICAgICAgICAgIHJldHVybjtcbiAgLy8gICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgIGlmIChyZXMuZGF0YS5jb2RlICE9IDApIHtcbiAgLy8gICAgICAgICAgICAgLy8g55m75b2V6ZSZ6K+vXG4gIC8vICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gIC8vICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gIC8vICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAvLyAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfml6Dms5XnmbvlvZXvvIzor7fph43or5UnLFxuICAvLyAgICAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2VcbiAgLy8gICAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICAgICAgcmV0dXJuO1xuICAvLyAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhKVxuICAvLyAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnRva2VuID0gcmVzLmRhdGEuZGF0YS50b2tlbjtcbiAgLy8gICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51aWQgPSByZXMuZGF0YS5kYXRhLnVpZDtcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgIH0pXG4gIC8vICAgICB9XG4gIC8vICAgfSlcbiAgLy8gfTtcbiAgLy8gcmVnaXN0ZXJVc2VyICgpIHtcbiAgLy8gICB2YXIgdGhhdCA9IHRoaXM7XG4gIC8vICAgd3gubG9naW4oe1xuICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAvLyAgICAgICB2YXIgY29kZSA9IHJlcy5jb2RlOyAvLyDlvq7kv6HnmbvlvZXmjqXlj6Pov5Tlm57nmoQgY29kZSDlj4LmlbDvvIzkuIvpnaLms6jlhozmjqXlj6PpnIDopoHnlKjliLBcbiAgLy8gICAgICAgd3guZ2V0VXNlckluZm8oe1xuICAvLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgLy8gICAgICAgICAgIHZhciBpdiA9IHJlcy5pdjtcbiAgLy8gICAgICAgICAgIHZhciBlbmNyeXB0ZWREYXRhID0gcmVzLmVuY3J5cHRlZERhdGE7XG4gIC8vICAgICAgICAgICAvLyDkuIvpnaLlvIDlp4vosIPnlKjms6jlhozmjqXlj6NcbiAgLy8gICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAvLyAgICAgICAgICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArJy91c2VyL3d4YXBwL3JlZ2lzdGVyL2NvbXBsZXgnLFxuICAvLyAgICAgICAgICAgICBkYXRhOiB7Y29kZTpjb2RlLGVuY3J5cHRlZERhdGE6ZW5jcnlwdGVkRGF0YSxpdjppdn0sIC8vIOiuvue9ruivt+axgueahCDlj4LmlbBcbiAgLy8gICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT57XG4gIC8vICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgLy8gICAgICAgICAgICAgICB0aGF0LmxvZ2luKCk7XG4gIC8vICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgICB9KVxuICAvLyAgICAgfVxuICAvLyAgIH0pXG4gIC8vIH07XG4gIC8vIHNlbmRUZW1wbGVNc2cgKG9yZGVySWQsIHRyaWdnZXIsIHRlbXBsYXRlX2lkLCBmb3JtX2lkLCBwYWdlLCBwb3N0SnNvblN0cmluZyl7XG4gIC8vICAgdmFyIHRoYXQgPSB0aGlzO1xuICAvLyAgIHd4LnJlcXVlc3Qoe1xuICAvLyAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuaXQxMjAuY2MvJyArIHRoYXQuZ2xvYmFsRGF0YS5zdWJEb21haW4gKyAnL3RlbXBsYXRlLW1zZy9wdXQnLFxuICAvLyAgICAgbWV0aG9kOidQT1NUJyxcbiAgLy8gICAgIGhlYWRlcjoge1xuICAvLyAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgLy8gICAgIH0sXG4gIC8vICAgICBkYXRhOiB7XG4gIC8vICAgICAgIHRva2VuOiB0aGF0Lmdsb2JhbERhdGEudG9rZW4sXG4gIC8vICAgICAgIHR5cGU6MCxcbiAgLy8gICAgICAgbW9kdWxlOidvcmRlcicsXG4gIC8vICAgICAgIGJ1c2luZXNzX2lkOiBvcmRlcklkLFxuICAvLyAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyLFxuICAvLyAgICAgICB0ZW1wbGF0ZV9pZDogdGVtcGxhdGVfaWQsXG4gIC8vICAgICAgIGZvcm1faWQ6IGZvcm1faWQsXG4gIC8vICAgICAgIHVybDpwYWdlLFxuICAvLyAgICAgICBwb3N0SnNvblN0cmluZzogcG9zdEpzb25TdHJpbmdcbiAgLy8gICAgIH0sXG4gIC8vICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gIC8vICAgICAgIC8vY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqKicpO1xuICAvLyAgICAgICAvL2NvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgLy8gICAgICAgLy9jb25zb2xlLmxvZygnKioqKioqKioqKioqKioqKioqKioqJyk7XG4gIC8vICAgICB9XG4gIC8vICAgfSlcbiAgLy8gfTtcbiAgLy8gc2VuZFRlbXBsZU1zZ0ltbWVkaWF0ZWx5ICh0ZW1wbGF0ZV9pZCwgZm9ybV9pZCwgcGFnZSwgcG9zdEpzb25TdHJpbmcpIHtcbiAgLy8gICB2YXIgdGhhdCA9IHRoaXM7XG4gIC8vICAgd3gucmVxdWVzdCh7XG4gIC8vICAgICB1cmw6ICdodHRwczovL2FwaS5pdDEyMC5jYy8nICsgdGhhdC5nbG9iYWxEYXRhLnN1YkRvbWFpbiArICcvdGVtcGxhdGUtbXNnL3B1dCcsXG4gIC8vICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgLy8gICAgIGhlYWRlcjoge1xuICAvLyAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgLy8gICAgIH0sXG4gIC8vICAgICBkYXRhOiB7XG4gIC8vICAgICAgIHRva2VuOiB0aGF0Lmdsb2JhbERhdGEudG9rZW4sXG4gIC8vICAgICAgIHR5cGU6IDAsXG4gIC8vICAgICAgIG1vZHVsZTogJ2ltbWVkaWF0ZWx5JyxcbiAgLy8gICAgICAgdGVtcGxhdGVfaWQ6IHRlbXBsYXRlX2lkLFxuICAvLyAgICAgICBmb3JtX2lkOiBmb3JtX2lkLFxuICAvLyAgICAgICB1cmw6IHBhZ2UsXG4gIC8vICAgICAgIHBvc3RKc29uU3RyaW5nOiBwb3N0SnNvblN0cmluZ1xuICAvLyAgICAgfSxcbiAgLy8gICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgLy8gICAgICAgY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqKicpO1xuICAvLyAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gIC8vICAgICAgIGNvbnNvbGUubG9nKCcqKioqKioqKioqKioqKioqKioqKionKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9KVxuICAvLyB9O1xuICAvLyBnZXRVc2VySW5mbyAoY2IpIHtcbiAgLy8gICB2YXIgdGhhdCA9IHRoaXNcbiAgLy8gICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gIC8vICAgICB0eXBlb2YgY2IgPT0gXCJmdW5jdGlvblwiICYmIGNiKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbylcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgLy/osIPnlKjnmbvpmYbmjqXlj6NcbiAgLy8gICAgIHd4LmxvZ2luKHtcbiAgLy8gICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAvLyAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgLy8gICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgLy8gICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gIC8vICAgICAgICAgICAgIHR5cGVvZiBjYiA9PSBcImZ1bmN0aW9uXCIgJiYgY2IodGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvKVxuICAvLyAgICAgICAgICAgfVxuICAvLyAgICAgICAgIH0pXG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH0pXG4gIC8vICAgfVxuICAvL1xuICAvLyB9O1xuICAvLyAvLyBzbGVlcCAocykge1xuICAvLyAvLyAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIC8vIC8vICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgLy8gLy8gICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXG4gIC8vIC8vICAgICB9LCBzICogMTAwMClcbiAgLy8gLy8gICB9KVxuICAvLyAvLyB9XG4gIC8vIC8vXG4gIC8vIC8vIGFzeW5jIHRlc3RBc3luYyAoKSB7XG4gIC8vIC8vICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuc2xlZXAoMylcbiAgLy8gLy8gICBjb25zb2xlLmxvZyhkYXRhKVxuICAvLyAvLyB9XG4gIC8vIC8vXG4gIC8vIC8vIGdldFVzZXJJbmZvKGNiKSB7XG4gIC8vIC8vICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgLy8gLy8gICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gIC8vIC8vICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gIC8vIC8vICAgfVxuICAvLyAvLyAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAvLyAvLyAgICAgc3VjY2VzcyAocmVzKSB7XG4gIC8vIC8vICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAvLyAvLyAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXG4gIC8vIC8vICAgICB9XG4gIC8vIC8vICAgfSlcbiAgLy8gLy8gfVxuICBhc3luYyBvbkxhdW5jaCgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgLy/nlKjmiLfkv6Hmga9cbiAgICBsZXQgdXNlclNwZWNpYWxJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8pIHx8IHt9O1xuICAgIC8vIOeUqOaIt+aZrumAmuS/oeaBr1xuICAgIGxldCB1c2VySW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9JTkZPKSB8fCB7fTtcblxuICAgIC8v5aaC5p6c5L+h5oGv6L+H5pyfXG4gICAgaWYgKCghdXNlclNwZWNpYWxJbmZvLm9wZW5pZCB8fCAodXNlclNwZWNpYWxJbmZvLmV4cGlyZXNfaW4gfHwgRGF0ZS5ub3coKSkgPCAoRGF0ZS5ub3coKSArIDYwMCkpICYmICghdXNlckluZm8ubmlja05hbWUpKSB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgd2VweS5sb2dpbigpO1xuICAgICAgY29uc29sZS5sb2coXCJzYWZzZnNkZnNkZnNkZnNkZnNmXCIpO1xuICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgIGlmIChyZXMuY29kZSkge1xuICAgICAgICBsZXQgZCA9IHRoYXQuZ2xvYmFsRGF0YTsgLy/ov5nph4zlrZjlgqjkuoZhcHBpZOOAgXNlY3JldOOAgXRva2Vu5LiywqDCoMKgwqBcbiAgICAgICAgLy/lrZjlgqh1c2VySW5mb8KgXG4gICAgICAgIGxldCBjID0gYXdhaXQgd2VweS5nZXRVc2VySW5mbygpO1xuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFVTRVJfSU5GTywgYy51c2VySW5mbyk7XG5cbiAgICAgICAgLy/lrZjlgqjns7vnu5/kv6Hmga/CoFxuICAgICAgICBsZXQgc3lzdGVtSW5mbyA9IHdlcHkuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhTWVNURU1fSU5GTywgc3lzdGVtSW5mbyk7XG4gICAgICAgIHd4SnNDb2RlMlNlc3Npb24oe1xuICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICBqc0NvZGU6IHJlcy5jb2RlLFxuICAgICAgICAgICAgbmlja05hbWU6IGMudXNlckluZm8ubmlja05hbWVcbiAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4ocmVzcCA9PiB7XG4gICAgICAgICAgdmFyIHJsdCA9IHJlc3AuZGF0YTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInd4SnNDb2RlMlNlc3Npb24uLi5cIiArIEpTT04uc3RyaW5naWZ5KHJsdCkpO1xuICAgICAgICAgIGlmIChybHQucmVzdWx0KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJsdC5kYXRhO1xuICAgICAgICAgICAgaWYgKGRhdGEub3BlbmlkKSB7XG4gICAgICAgICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgICAgICAgb2JqLm9wZW5pZCA9IGRhdGEub3BlbmlkO1xuICAgICAgICAgICAgICBvYmouZXhwaXJlc19pbiA9IERhdGUubm93KCkgKyBkYXRhLmV4cGlyZXNfaW47XG4gICAgICAgICAgICAgIC8v5a2Y5YKob3BlbmlkwqBcbiAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8sIG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgICAgIG9iai5vcGVuaWQgPSBcIm9ldWo1MEtITXFzaDVrWVpZV1FKdXdtWTV5RzBcIjtcbiAgICAgICAgICAgIG9iai5leHBpcmVzX2luID0gXCI3MjAwXCI7XG4gICAgICAgICAgICAvL+WtmOWCqG9wZW5pZMKgXG4gICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTywgb2JqKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCB1cmwgPSAnaHR0cHM6Ly9hcGkud2VpeGluLnFxLmNvbS9zbnMvanNjb2RlMnNlc3Npb24/YXBwaWQ9JyArIGQuYXBwaWQgKyAnJnNlY3JldD0nICsgZC5zZWNyZXQgKyAnJmpzX2NvZGU9JyArIHJlcy5jb2RlICsgJyZncmFudF90eXBlPWF1dGhvcml6YXRpb25fY29kZSc7XG5cbiAgICAgICAgLyogbGV0IGIgPSBhd2FpdCB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgIGRhdGE6IHt9LFxuICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAnY29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICAgICAgIGlmIChiLmRhdGEub3BlbmlkKSB7XG4gICAgICAgICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgICAgICAgIG9iai5vcGVuaWQgPSBiLmRhdGEub3BlbmlkO1xuICAgICAgICAgICAgIG9iai5leHBpcmVzX2luID0gRGF0ZS5ub3coKSArIGIuZGF0YS5leHBpcmVzX2luO1xuXG4gICAgICAgICAgICAgLy/lrZjlgqhvcGVuaWTCoFxuICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPLCBvYmopO1xuXG4gICAgICAgICAgICAgLy/lrZjlgqh1c2VySW5mb8KgXG4gICAgICAgICAgICAgbGV0IGMgPSBhd2FpdCB3ZXB5LmdldFVzZXJJbmZvKCk7XG4gICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhVU0VSX0lORk8sIGMudXNlckluZm8pO1xuXG4gICAgICAgICAgICAgLy/lrZjlgqjns7vnu5/kv6Hmga/CoFxuICAgICAgICAgICAgIGxldCBzeXN0ZW1JbmZvID0gYXdhaXQgd2VweS5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoU1lTVEVNX0lORk8sIHN5c3RlbUluZm8pO1xuICAgICAgICAgICAgIGNvbnNvbGUubG9nKGIsICfnmbvpmYbmiJDlip8nKVxuICAgICAgICAgfSovXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bnlKjmiLfnmbvlvZXmgIHlpLHotKXvvIEnICsgcmVzLmVyck1zZylcbiAgICAgIH1cblxuICAgIH1cbiAgfVxufVxuIl19