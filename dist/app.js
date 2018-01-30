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
      pages: ['pages/mainshop/mainshop', 'pages/apply/apply', 'pages/myorder/myorder',
      // 'pages/sign/sign',
      // 'pages/start/start',
      'pages/creditmall/creditmall', 'pages/home/home', 'pages/me/me', 'pages/sign/sign'],
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
          "pagePath": "pages/home/home",
          "text": "首页",
          "iconPath": "images/icon_home.png",
          "selectedIconPath": "images/icon_home_active.png"
        }, {
          "pagePath": "pages/home/home",
          "text": "分类",
          "iconPath": "images/icon_classify.png",
          "selectedIconPath": "images/icon_classify_active.png"
        }, {
          "pagePath": "pages/home/home",
          "text": "购物车",
          "iconPath": "images/icon_shop_cart.png",
          "selectedIconPath": "images/icon_shop_cart_active.png"
        }, {
          "pagePath": "pages/me/me",
          "text": "我",
          "iconPath": "images/icon_info.png",
          "selectedIconPath": "images/icon_info_active.png"
        }]
      }
    };
    _this.globalData = {
      userInfo: null,
      appid: 'wx6b121941b200ea50',
      secret: '36a76b0682bd2c3f1541fd012fac66f5'
    };

    _this.use('requestfix');
    _this.use('promisify');

    return _this;
  }

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJiYWNrZ3JvdW5kQ29sb3IiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJhcHBpZCIsInNlY3JldCIsInVzZSIsInRoYXQiLCJ1c2VyU3BlY2lhbEluZm8iLCJnZXRTdG9yYWdlU3luYyIsIm9wZW5pZCIsImV4cGlyZXNfaW4iLCJEYXRlIiwibm93Iiwibmlja05hbWUiLCJsb2dpbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJjb2RlIiwiZCIsImdldFVzZXJJbmZvIiwiYyIsInNldFN0b3JhZ2VTeW5jIiwic3lzdGVtSW5mbyIsImdldFN5c3RlbUluZm9TeW5jIiwicXVlcnkiLCJqc0NvZGUiLCJ0aGVuIiwicmx0IiwicmVzcCIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzdWx0Iiwib2JqIiwidXJsIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOztBQUNBOztBQU9BOzs7Ozs7Ozs7Ozs7Ozs7QUE4REUsc0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxVQXhEZEEsTUF3RGMsR0F4REw7QUFDUEMsYUFBTyxDQUNMLHlCQURLLEVBRUwsbUJBRkssRUFHTCx1QkFISztBQUlMO0FBQ0E7QUFDQSxtQ0FOSyxFQU9MLGlCQVBLLEVBUUwsYUFSSyxFQVNMLGlCQVRLLENBREE7QUFZUEMsY0FBUTtBQUNOQyw2QkFBcUIsTUFEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLFFBSGxCO0FBSU5DLGdDQUF3QixPQUpsQjtBQUtOQywrQkFBdUIsS0FMakI7QUFNTkMseUJBQWlCOztBQU5YLE9BWkQ7QUFx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QW1ILGdDOztBQUU3SDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBRix3QkFBUUMsR0FBUixDQUFZLGVBQWVGLElBQUlxQixNQUEvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTNJcUIsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcbiAgaW1wb3J0IHtcbiAgICBVU0VSX1NQRUNJQ0FMX0lORk8sXG4gICAgVVNFUl9JTkZPLFxuICAgIFNZU1RFTV9JTkZPLFxuICAgIEFERFJFU1NfSUQsXG4gICAgU0VMX0NMQVNTX0NPREVcbiAgfSBmcm9tIFwiLi91dGlscy9jb25zdGFudFwiO1xuICBpbXBvcnQge1xuICAgIHd4SnNDb2RlMlNlc3Npb24sXG4gICAgdXNlcjJzZXNzaW9uXG4gIH0gZnJvbSAnLi9hcGkvYXBpJztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBwYWdlczogW1xuICAgICAgICAncGFnZXMvbWFpbnNob3AvbWFpbnNob3AnLFxuICAgICAgICAncGFnZXMvYXBwbHkvYXBwbHknLFxuICAgICAgICAncGFnZXMvbXlvcmRlci9teW9yZGVyJyxcbiAgICAgICAgLy8gJ3BhZ2VzL3NpZ24vc2lnbicsXG4gICAgICAgIC8vICdwYWdlcy9zdGFydC9zdGFydCcsXG4gICAgICAgICdwYWdlcy9jcmVkaXRtYWxsL2NyZWRpdG1hbGwnLFxuICAgICAgICAncGFnZXMvaG9tZS9ob21lJyxcbiAgICAgICAgJ3BhZ2VzL21lL21lJyxcbiAgICAgICAgJ3BhZ2VzL3NpZ24vc2lnbidcbiAgICAgIF0sXG4gICAgICB3aW5kb3c6IHtcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRicsXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdXZUNoYXQnLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snLFxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRUZFRkVGJ1xuXG4gICAgICB9LFxuICAgICAgXCJ0YWJCYXJcIjoge1xuICAgICAgICBcImNvbG9yXCI6IFwiIzk5OTk5OVwiLFxuICAgICAgICBcInNlbGVjdGVkQ29sb3JcIjogXCIjZmY2YTNjXCIsXG4gICAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgICBcImJvcmRlclN0eWxlXCI6IFwiYmxhY2tcIixcbiAgICAgICAgXCJsaXN0XCI6IFt7XG4gICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL2hvbWUvaG9tZVwiLFxuICAgICAgICAgIFwidGV4dFwiOiBcIummlumhtVwiLFxuICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvaWNvbl9ob21lLnBuZ1wiLFxuICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9pY29uX2hvbWVfYWN0aXZlLnBuZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvaG9tZS9ob21lXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwi5YiG57G7XCIsXG4gICAgICAgICAgXCJpY29uUGF0aFwiOiBcImltYWdlcy9pY29uX2NsYXNzaWZ5LnBuZ1wiLFxuICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9pY29uX2NsYXNzaWZ5X2FjdGl2ZS5wbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL2hvbWUvaG9tZVwiLFxuICAgICAgICAgIFwidGV4dFwiOiBcIui0reeJqei9plwiLFxuICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvaWNvbl9zaG9wX2NhcnQucG5nXCIsXG4gICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25fc2hvcF9jYXJ0X2FjdGl2ZS5wbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL21lL21lXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwi5oiRXCIsXG4gICAgICAgICAgXCJpY29uUGF0aFwiOiBcImltYWdlcy9pY29uX2luZm8ucG5nXCIsXG4gICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25faW5mb19hY3RpdmUucG5nXCJcbiAgICAgICAgfV1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBnbG9iYWxEYXRhID0ge1xuICAgICAgdXNlckluZm86IG51bGwsXG4gICAgICBhcHBpZDogJ3d4NmIxMjE5NDFiMjAwZWE1MCcsXG4gICAgICBzZWNyZXQ6ICczNmE3NmIwNjgyYmQyYzNmMTU0MWZkMDEyZmFjNjZmNScsXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpXG4gICAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gICAgICB0aGlzLnVzZSgncHJvbWlzaWZ5Jyk7XG5cbiAgICB9XG4gICAgYXN5bmMgb25MYXVuY2goKSB7XG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAvL+eUqOaIt+S/oeaBr1xuICAgICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPKSB8fCB7fTtcbiAgICAgIC8vIOeUqOaIt+aZrumAmuS/oeaBr1xuICAgICAgbGV0IHVzZXJJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhVU0VSX0lORk8pIHx8IHt9O1xuXG4gICAgICAvL+WmguaenOS/oeaBr+i/h+acn1xuICAgICAgaWYgKCghdXNlclNwZWNpYWxJbmZvLm9wZW5pZCB8fCAodXNlclNwZWNpYWxJbmZvLmV4cGlyZXNfaW4gfHwgRGF0ZS5ub3coKSkgPCAoRGF0ZS5ub3coKSArIDYwMCkpICYmICghdXNlckluZm8ubmlja05hbWUpKSB7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB3ZXB5LmxvZ2luKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2Fmc2ZzZGZzZGZzZGZzZGZzZlwiKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgaWYgKHJlcy5jb2RlKSB7XG4gICAgICAgICAgbGV0IGQgPSB0aGF0Lmdsb2JhbERhdGE7IC8v6L+Z6YeM5a2Y5YKo5LqGYXBwaWTjgIFzZWNyZXTjgIF0b2tlbuS4ssKgwqDCoMKgXG4gICAgICAgICAgLy/lrZjlgqh1c2VySW5mb8KgXG4gICAgICAgICAgbGV0IGMgPSBhd2FpdCB3ZXB5LmdldFVzZXJJbmZvKCk7XG4gICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhVU0VSX0lORk8sIGMudXNlckluZm8pO1xuXG4gICAgICAgICAgLy/lrZjlgqjns7vnu5/kv6Hmga/CoFxuICAgICAgICAgIGxldCBzeXN0ZW1JbmZvID0gd2VweS5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoU1lTVEVNX0lORk8sIHN5c3RlbUluZm8pO1xuICAgICAgICAgIHd4SnNDb2RlMlNlc3Npb24oe1xuICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAganNDb2RlOiByZXMuY29kZSxcbiAgICAgICAgICAgICAgbmlja05hbWU6IGMudXNlckluZm8ubmlja05hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS50aGVuKHJlc3AgPT4ge1xuICAgICAgICAgICAgdmFyIHJsdCA9IHJlc3AuZGF0YTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid3hKc0NvZGUyU2Vzc2lvbi4uLlwiICsgSlNPTi5zdHJpbmdpZnkocmx0KSk7XG4gICAgICAgICAgICBpZiAocmx0LnJlc3VsdCkge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJsdC5kYXRhO1xuICAgICAgICAgICAgICBpZiAoZGF0YS5vcGVuaWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0ge307XG4gICAgICAgICAgICAgICAgb2JqLm9wZW5pZCA9IGRhdGEub3BlbmlkO1xuICAgICAgICAgICAgICAgIG9iai5leHBpcmVzX2luID0gRGF0ZS5ub3coKSArIGRhdGEuZXhwaXJlc19pbjtcbiAgICAgICAgICAgICAgICAvL+WtmOWCqG9wZW5pZMKgXG4gICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8sIG9iaik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgICAgICAgb2JqLm9wZW5pZCA9IFwib2V1ajUwS0hNcXNoNWtZWllXUUp1d21ZNXlHMFwiO1xuICAgICAgICAgICAgICBvYmouZXhwaXJlc19pbiA9IFwiNzIwMFwiO1xuICAgICAgICAgICAgICAvL+WtmOWCqG9wZW5pZMKgXG4gICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPLCBvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgbGV0IHVybCA9ICdodHRwczovL2FwaS53ZWl4aW4ucXEuY29tL3Nucy9qc2NvZGUyc2Vzc2lvbj9hcHBpZD0nICsgZC5hcHBpZCArICcmc2VjcmV0PScgKyBkLnNlY3JldCArICcmanNfY29kZT0nICsgcmVzLmNvZGUgKyAnJmdyYW50X3R5cGU9YXV0aG9yaXphdGlvbl9jb2RlJztcblxuICAgICAgICAgIC8qIGxldCBiID0gYXdhaXQgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICdjb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICB9KTtcbiAgICAgICAgICAgaWYgKGIuZGF0YS5vcGVuaWQpIHtcbiAgICAgICAgICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgICAgICAgIG9iai5vcGVuaWQgPSBiLmRhdGEub3BlbmlkO1xuICAgICAgICAgICAgICAgb2JqLmV4cGlyZXNfaW4gPSBEYXRlLm5vdygpICsgYi5kYXRhLmV4cGlyZXNfaW47XG5cbiAgICAgICAgICAgICAgIC8v5a2Y5YKob3BlbmlkwqBcbiAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPLCBvYmopO1xuXG4gICAgICAgICAgICAgICAvL+WtmOWCqHVzZXJJbmZvwqBcbiAgICAgICAgICAgICAgIGxldCBjID0gYXdhaXQgd2VweS5nZXRVc2VySW5mbygpO1xuICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhVU0VSX0lORk8sIGMudXNlckluZm8pO1xuXG4gICAgICAgICAgICAgICAvL+WtmOWCqOezu+e7n+S/oeaBr8KgXG4gICAgICAgICAgICAgICBsZXQgc3lzdGVtSW5mbyA9IGF3YWl0IHdlcHkuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoU1lTVEVNX0lORk8sIHN5c3RlbUluZm8pO1xuICAgICAgICAgICAgICAgY29uc29sZS5sb2coYiwgJ+eZu+mZhuaIkOWKnycpXG4gICAgICAgICAgIH0qL1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPlueUqOaIt+eZu+W9leaAgeWksei0pe+8gScgKyByZXMuZXJyTXNnKVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuIl19