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
      pages: [
      // 'pages/start/start',
      'pages/home/home', 'pages/me/me'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJiYWNrZ3JvdW5kQ29sb3IiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJhcHBpZCIsInNlY3JldCIsInVzZSIsInRoYXQiLCJ1c2VyU3BlY2lhbEluZm8iLCJnZXRTdG9yYWdlU3luYyIsIm9wZW5pZCIsImV4cGlyZXNfaW4iLCJEYXRlIiwibm93Iiwibmlja05hbWUiLCJsb2dpbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJjb2RlIiwiZCIsImdldFVzZXJJbmZvIiwiYyIsInNldFN0b3JhZ2VTeW5jIiwic3lzdGVtSW5mbyIsImdldFN5c3RlbUluZm9TeW5jIiwicXVlcnkiLCJqc0NvZGUiLCJ0aGVuIiwicmx0IiwicmVzcCIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzdWx0Iiwib2JqIiwidXJsIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOztBQUNBOztBQU9BOzs7Ozs7Ozs7Ozs7Ozs7QUF3REUsc0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxVQWxEZEEsTUFrRGMsR0FsREw7QUFDUEMsYUFBTztBQUNMO0FBQ0EsdUJBRkssRUFHTCxhQUhLLENBREE7QUFNUEMsY0FBUTtBQUNOQyw2QkFBcUIsTUFEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLFFBSGxCO0FBSU5DLGdDQUF3QixPQUpsQjtBQUtOQywrQkFBdUIsS0FMakI7QUFNTkMseUJBQWlCOztBQU5YLE9BTkQ7QUFlUCxnQkFBVTtBQUNSLGlCQUFTLFNBREQ7QUFFUix5QkFBaUIsU0FGVDtBQUdSLDJCQUFtQixTQUhYO0FBSVIsdUJBQWUsT0FKUDtBQUtSLGdCQUFRLENBQUM7QUFDUCxzQkFBWSxpQkFETDtBQUVQLGtCQUFRLElBRkQ7QUFHUCxzQkFBWSxzQkFITDtBQUlQLDhCQUFvQjtBQUpiLFNBQUQsRUFLTDtBQUNELHNCQUFZLGlCQURYO0FBRUQsa0JBQVEsSUFGUDtBQUdELHNCQUFZLDBCQUhYO0FBSUQsOEJBQW9CO0FBSm5CLFNBTEssRUFVTDtBQUNELHNCQUFZLGlCQURYO0FBRUQsa0JBQVEsS0FGUDtBQUdELHNCQUFZLDJCQUhYO0FBSUQsOEJBQW9CO0FBSm5CLFNBVkssRUFlTDtBQUNELHNCQUFZLGFBRFg7QUFFRCxrQkFBUSxHQUZQO0FBR0Qsc0JBQVksc0JBSFg7QUFJRCw4QkFBb0I7QUFKbkIsU0FmSztBQUxBO0FBZkgsS0FrREs7QUFBQSxVQU5kQyxVQU1jLEdBTkQ7QUFDWEMsZ0JBQVUsSUFEQztBQUVYQyxhQUFPLG9CQUZJO0FBR1hDLGNBQVE7QUFIRyxLQU1DOztBQUVaLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBQ0EsVUFBS0EsR0FBTCxDQUFTLFdBQVQ7O0FBSFk7QUFLYjs7Ozs7Ozs7Ozs7QUFFS0Msb0IsR0FBTyxJO0FBQ1g7O0FBQ0lDLCtCLEdBQWtCLGVBQUtDLGNBQUwsa0NBQTJDLEU7QUFDakU7O0FBQ0lOLHdCLEdBQVcsZUFBS00sY0FBTCx5QkFBa0MsRTs7QUFFakQ7O3NCQUNJLENBQUMsQ0FBQ0QsZ0JBQWdCRSxNQUFqQixJQUEyQixDQUFDRixnQkFBZ0JHLFVBQWhCLElBQThCQyxLQUFLQyxHQUFMLEVBQS9CLElBQThDRCxLQUFLQyxHQUFMLEtBQWEsR0FBdkYsS0FBaUcsQ0FBQ1YsU0FBU1csUTs7Ozs7O3VCQUM3RixlQUFLQyxLQUFMLEU7OztBQUFaQyxtQjs7QUFDSkMsd0JBQVFDLEdBQVIsQ0FBWSxxQkFBWjtBQUNBRCx3QkFBUUMsR0FBUixDQUFZRixHQUFaOztxQkFDSUEsSUFBSUcsSTs7Ozs7QUFDRkMsaUIsR0FBSWIsS0FBS0wsVSxFQUFZO0FBQ3pCOzs7dUJBQ2MsZUFBS21CLFdBQUwsRTs7O0FBQVZDLGlCOztBQUNKLCtCQUFLQyxjQUFMLHNCQUErQkQsRUFBRW5CLFFBQWpDOztBQUVBO0FBQ0lxQiwwQixHQUFhLGVBQUtDLGlCQUFMLEU7O0FBQ2pCLCtCQUFLRixjQUFMLHdCQUFpQ0MsVUFBakM7QUFDQSwyQ0FBaUI7QUFDZkUseUJBQU87QUFDTEMsNEJBQVFYLElBQUlHLElBRFA7QUFFTEwsOEJBQVVRLEVBQUVuQixRQUFGLENBQVdXO0FBRmhCO0FBRFEsaUJBQWpCLEVBS0djLElBTEgsQ0FLUSxnQkFBUTtBQUNkLHNCQUFJQyxNQUFNQyxLQUFLQyxJQUFmO0FBQ0FkLDBCQUFRQyxHQUFSLENBQVksd0JBQXdCYyxLQUFLQyxTQUFMLENBQWVKLEdBQWYsQ0FBcEM7QUFDQSxzQkFBSUEsSUFBSUssTUFBUixFQUFnQjtBQUNkLHdCQUFJSCxPQUFPRixJQUFJRSxJQUFmO0FBQ0Esd0JBQUlBLEtBQUtyQixNQUFULEVBQWlCO0FBQ2YsMEJBQUl5QixNQUFNLEVBQVY7QUFDQUEsMEJBQUl6QixNQUFKLEdBQWFxQixLQUFLckIsTUFBbEI7QUFDQXlCLDBCQUFJeEIsVUFBSixHQUFpQkMsS0FBS0MsR0FBTCxLQUFha0IsS0FBS3BCLFVBQW5DO0FBQ0E7QUFDQSxxQ0FBS1ksY0FBTCwrQkFBd0NZLEdBQXhDO0FBQ0Q7QUFDRixtQkFURCxNQVNPO0FBQ0wsd0JBQUlBLE9BQU0sRUFBVjtBQUNBQSx5QkFBSXpCLE1BQUosR0FBYSw4QkFBYjtBQUNBeUIseUJBQUl4QixVQUFKLEdBQWlCLE1BQWpCO0FBQ0E7QUFDQSxtQ0FBS1ksY0FBTCwrQkFBd0NZLElBQXhDO0FBQ0Q7QUFDRixpQkF4QkQ7O0FBMEJJQyxtQixHQUFNLHdEQUF3RGhCLEVBQUVoQixLQUExRCxHQUFrRSxVQUFsRSxHQUErRWdCLEVBQUVmLE1BQWpGLEdBQTBGLFdBQTFGLEdBQXdHVyxJQUFJRyxJQUE1RyxHQUFtSCxnQzs7QUFFN0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQUYsd0JBQVFDLEdBQVIsQ0FBWSxlQUFlRixJQUFJcUIsTUFBL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFySXFCLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG4gIGltcG9ydCB7XG4gICAgVVNFUl9TUEVDSUNBTF9JTkZPLFxuICAgIFVTRVJfSU5GTyxcbiAgICBTWVNURU1fSU5GTyxcbiAgICBBRERSRVNTX0lELFxuICAgIFNFTF9DTEFTU19DT0RFXG4gIH0gZnJvbSBcIi4vdXRpbHMvY29uc3RhbnRcIjtcbiAgaW1wb3J0IHtcbiAgICB3eEpzQ29kZTJTZXNzaW9uLFxuICAgIHVzZXIyc2Vzc2lvblxuICB9IGZyb20gJy4vYXBpL2FwaSc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gICAgY29uZmlnID0ge1xuICAgICAgcGFnZXM6IFtcbiAgICAgICAgLy8gJ3BhZ2VzL3N0YXJ0L3N0YXJ0JyxcbiAgICAgICAgJ3BhZ2VzL2hvbWUvaG9tZScsXG4gICAgICAgICdwYWdlcy9tZS9tZScsXG4gICAgICBdLFxuICAgICAgd2luZG93OiB7XG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcbiAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcbiAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyxcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI0VGRUZFRidcblxuICAgICAgfSxcbiAgICAgIFwidGFiQmFyXCI6IHtcbiAgICAgICAgXCJjb2xvclwiOiBcIiM5OTk5OTlcIixcbiAgICAgICAgXCJzZWxlY3RlZENvbG9yXCI6IFwiI2ZmNmEzY1wiLFxuICAgICAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICAgICAgXCJib3JkZXJTdHlsZVwiOiBcImJsYWNrXCIsXG4gICAgICAgIFwibGlzdFwiOiBbe1xuICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9ob21lL2hvbWVcIixcbiAgICAgICAgICBcInRleHRcIjogXCLpppbpobVcIixcbiAgICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25faG9tZS5wbmdcIixcbiAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJpbWFnZXMvaWNvbl9ob21lX2FjdGl2ZS5wbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL2hvbWUvaG9tZVwiLFxuICAgICAgICAgIFwidGV4dFwiOiBcIuWIhuexu1wiLFxuICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvaWNvbl9jbGFzc2lmeS5wbmdcIixcbiAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJpbWFnZXMvaWNvbl9jbGFzc2lmeV9hY3RpdmUucG5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9ob21lL2hvbWVcIixcbiAgICAgICAgICBcInRleHRcIjogXCLotK3nianovaZcIixcbiAgICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25fc2hvcF9jYXJ0LnBuZ1wiLFxuICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9pY29uX3Nob3BfY2FydF9hY3RpdmUucG5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9tZS9tZVwiLFxuICAgICAgICAgIFwidGV4dFwiOiBcIuaIkVwiLFxuICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvaWNvbl9pbmZvLnBuZ1wiLFxuICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9pY29uX2luZm9fYWN0aXZlLnBuZ1wiXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2xvYmFsRGF0YSA9IHtcbiAgICAgIHVzZXJJbmZvOiBudWxsLFxuICAgICAgYXBwaWQ6ICd3eDZiMTIxOTQxYjIwMGVhNTAnLFxuICAgICAgc2VjcmV0OiAnMzZhNzZiMDY4MmJkMmMzZjE1NDFmZDAxMmZhYzY2ZjUnLFxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKVxuICAgICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgICAgdGhpcy51c2UoJ3Byb21pc2lmeScpO1xuXG4gICAgfVxuICAgIGFzeW5jIG9uTGF1bmNoKCkge1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgLy/nlKjmiLfkv6Hmga9cbiAgICAgIGxldCB1c2VyU3BlY2lhbEluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTykgfHwge307XG4gICAgICAvLyDnlKjmiLfmma7pgJrkv6Hmga9cbiAgICAgIGxldCB1c2VySW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoVVNFUl9JTkZPKSB8fCB7fTtcblxuICAgICAgLy/lpoLmnpzkv6Hmga/ov4fmnJ9cbiAgICAgIGlmICgoIXVzZXJTcGVjaWFsSW5mby5vcGVuaWQgfHwgKHVzZXJTcGVjaWFsSW5mby5leHBpcmVzX2luIHx8IERhdGUubm93KCkpIDwgKERhdGUubm93KCkgKyA2MDApKSAmJiAoIXVzZXJJbmZvLm5pY2tOYW1lKSkge1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgd2VweS5sb2dpbigpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInNhZnNmc2Rmc2Rmc2Rmc2Rmc2ZcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIGlmIChyZXMuY29kZSkge1xuICAgICAgICAgIGxldCBkID0gdGhhdC5nbG9iYWxEYXRhOyAvL+i/memHjOWtmOWCqOS6hmFwcGlk44CBc2VjcmV044CBdG9rZW7kuLLCoMKgwqDCoFxuICAgICAgICAgIC8v5a2Y5YKodXNlckluZm/CoFxuICAgICAgICAgIGxldCBjID0gYXdhaXQgd2VweS5nZXRVc2VySW5mbygpO1xuICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoVVNFUl9JTkZPLCBjLnVzZXJJbmZvKTtcblxuICAgICAgICAgIC8v5a2Y5YKo57O757uf5L+h5oGvwqBcbiAgICAgICAgICBsZXQgc3lzdGVtSW5mbyA9IHdlcHkuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFNZU1RFTV9JTkZPLCBzeXN0ZW1JbmZvKTtcbiAgICAgICAgICB3eEpzQ29kZTJTZXNzaW9uKHtcbiAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgIGpzQ29kZTogcmVzLmNvZGUsXG4gICAgICAgICAgICAgIG5pY2tOYW1lOiBjLnVzZXJJbmZvLm5pY2tOYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkudGhlbihyZXNwID0+IHtcbiAgICAgICAgICAgIHZhciBybHQgPSByZXNwLmRhdGE7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInd4SnNDb2RlMlNlc3Npb24uLi5cIiArIEpTT04uc3RyaW5naWZ5KHJsdCkpO1xuICAgICAgICAgICAgaWYgKHJsdC5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSBybHQuZGF0YTtcbiAgICAgICAgICAgICAgaWYgKGRhdGEub3BlbmlkKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgICAgICAgICAgIG9iai5vcGVuaWQgPSBkYXRhLm9wZW5pZDtcbiAgICAgICAgICAgICAgICBvYmouZXhwaXJlc19pbiA9IERhdGUubm93KCkgKyBkYXRhLmV4cGlyZXNfaW47XG4gICAgICAgICAgICAgICAgLy/lrZjlgqhvcGVuaWTCoFxuICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoVVNFUl9TUEVDSUNBTF9JTkZPLCBvYmopO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsZXQgb2JqID0ge307XG4gICAgICAgICAgICAgIG9iai5vcGVuaWQgPSBcIm9ldWo1MEtITXFzaDVrWVpZV1FKdXdtWTV5RzBcIjtcbiAgICAgICAgICAgICAgb2JqLmV4cGlyZXNfaW4gPSBcIjcyMDBcIjtcbiAgICAgICAgICAgICAgLy/lrZjlgqhvcGVuaWTCoFxuICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTywgb2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGxldCB1cmwgPSAnaHR0cHM6Ly9hcGkud2VpeGluLnFxLmNvbS9zbnMvanNjb2RlMnNlc3Npb24/YXBwaWQ9JyArIGQuYXBwaWQgKyAnJnNlY3JldD0nICsgZC5zZWNyZXQgKyAnJmpzX2NvZGU9JyArIHJlcy5jb2RlICsgJyZncmFudF90eXBlPWF1dGhvcml6YXRpb25fY29kZSc7XG5cbiAgICAgICAgICAvKiBsZXQgYiA9IGF3YWl0IHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgIGRhdGE6IHt9LFxuICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAnY29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSk7XG4gICAgICAgICAgIGlmIChiLmRhdGEub3BlbmlkKSB7XG4gICAgICAgICAgICAgICBsZXQgb2JqID0ge307XG4gICAgICAgICAgICAgICBvYmoub3BlbmlkID0gYi5kYXRhLm9wZW5pZDtcbiAgICAgICAgICAgICAgIG9iai5leHBpcmVzX2luID0gRGF0ZS5ub3coKSArIGIuZGF0YS5leHBpcmVzX2luO1xuXG4gICAgICAgICAgICAgICAvL+WtmOWCqG9wZW5pZMKgXG4gICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTywgb2JqKTtcblxuICAgICAgICAgICAgICAgLy/lrZjlgqh1c2VySW5mb8KgXG4gICAgICAgICAgICAgICBsZXQgYyA9IGF3YWl0IHdlcHkuZ2V0VXNlckluZm8oKTtcbiAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoVVNFUl9JTkZPLCBjLnVzZXJJbmZvKTtcblxuICAgICAgICAgICAgICAgLy/lrZjlgqjns7vnu5/kv6Hmga/CoFxuICAgICAgICAgICAgICAgbGV0IHN5c3RlbUluZm8gPSBhd2FpdCB3ZXB5LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFNZU1RFTV9JTkZPLCBzeXN0ZW1JbmZvKTtcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGIsICfnmbvpmYbmiJDlip8nKVxuICAgICAgICAgICB9Ki9cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bnlKjmiLfnmbvlvZXmgIHlpLHotKXvvIEnICsgcmVzLmVyck1zZylcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiJdfQ==