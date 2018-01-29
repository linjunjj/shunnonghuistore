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
      pages: ['pages/myorder/myorder',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJiYWNrZ3JvdW5kQ29sb3IiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJhcHBpZCIsInNlY3JldCIsInVzZSIsInRoYXQiLCJ1c2VyU3BlY2lhbEluZm8iLCJnZXRTdG9yYWdlU3luYyIsIm9wZW5pZCIsImV4cGlyZXNfaW4iLCJEYXRlIiwibm93Iiwibmlja05hbWUiLCJsb2dpbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJjb2RlIiwiZCIsImdldFVzZXJJbmZvIiwiYyIsInNldFN0b3JhZ2VTeW5jIiwic3lzdGVtSW5mbyIsImdldFN5c3RlbUluZm9TeW5jIiwicXVlcnkiLCJqc0NvZGUiLCJ0aGVuIiwicmx0IiwicmVzcCIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzdWx0Iiwib2JqIiwidXJsIiwiZXJyTXNnIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOztBQUNBOztBQU9BOzs7Ozs7Ozs7Ozs7Ozs7QUE0REUsc0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxVQXREZEEsTUFzRGMsR0F0REw7QUFDUEMsYUFBTyxDQUNMLHVCQURLO0FBRUw7QUFDQTtBQUNBLG1DQUpLLEVBS0wsaUJBTEssRUFNTCxhQU5LLEVBT0wsaUJBUEssQ0FEQTtBQVVQQyxjQUFRO0FBQ05DLDZCQUFxQixNQURmO0FBRU5DLHNDQUE4QixTQUZ4QjtBQUdOQyxnQ0FBd0IsUUFIbEI7QUFJTkMsZ0NBQXdCLE9BSmxCO0FBS05DLCtCQUF1QixLQUxqQjtBQU1OQyx5QkFBaUI7O0FBTlgsT0FWRDtBQW1CUCxnQkFBVTtBQUNSLGlCQUFTLFNB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkFGLHdCQUFRQyxHQUFSLENBQVksZUFBZUYsSUFBSXFCLE1BQS9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBeklxQixlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuICBpbXBvcnQge1xuICAgIFVTRVJfU1BFQ0lDQUxfSU5GTyxcbiAgICBVU0VSX0lORk8sXG4gICAgU1lTVEVNX0lORk8sXG4gICAgQUREUkVTU19JRCxcbiAgICBTRUxfQ0xBU1NfQ09ERVxuICB9IGZyb20gXCIuL3V0aWxzL2NvbnN0YW50XCI7XG4gIGltcG9ydCB7XG4gICAgd3hKc0NvZGUyU2Vzc2lvbixcbiAgICB1c2VyMnNlc3Npb25cbiAgfSBmcm9tICcuL2FwaS9hcGknO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIHBhZ2VzOiBbXG4gICAgICAgICdwYWdlcy9teW9yZGVyL215b3JkZXInLFxuICAgICAgICAvLyAncGFnZXMvc2lnbi9zaWduJyxcbiAgICAgICAgLy8gJ3BhZ2VzL3N0YXJ0L3N0YXJ0JyxcbiAgICAgICAgJ3BhZ2VzL2NyZWRpdG1hbGwvY3JlZGl0bWFsbCcsXG4gICAgICAgICdwYWdlcy9ob21lL2hvbWUnLFxuICAgICAgICAncGFnZXMvbWUvbWUnLFxuICAgICAgICAncGFnZXMvc2lnbi9zaWduJ1xuICAgICAgXSxcbiAgICAgIHdpbmRvdzoge1xuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXG4gICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJyxcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXG4gICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycsXG4gICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNFRkVGRUYnXG5cbiAgICAgIH0sXG4gICAgICBcInRhYkJhclwiOiB7XG4gICAgICAgIFwiY29sb3JcIjogXCIjOTk5OTk5XCIsXG4gICAgICAgIFwic2VsZWN0ZWRDb2xvclwiOiBcIiNmZjZhM2NcIixcbiAgICAgICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgIFwiYm9yZGVyU3R5bGVcIjogXCJibGFja1wiLFxuICAgICAgICBcImxpc3RcIjogW3tcbiAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvaG9tZS9ob21lXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwi6aaW6aG1XCIsXG4gICAgICAgICAgXCJpY29uUGF0aFwiOiBcImltYWdlcy9pY29uX2hvbWUucG5nXCIsXG4gICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25faG9tZV9hY3RpdmUucG5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9ob21lL2hvbWVcIixcbiAgICAgICAgICBcInRleHRcIjogXCLliIbnsbtcIixcbiAgICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25fY2xhc3NpZnkucG5nXCIsXG4gICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25fY2xhc3NpZnlfYWN0aXZlLnBuZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvaG9tZS9ob21lXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwi6LSt54mp6L2mXCIsXG4gICAgICAgICAgXCJpY29uUGF0aFwiOiBcImltYWdlcy9pY29uX3Nob3BfY2FydC5wbmdcIixcbiAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJpbWFnZXMvaWNvbl9zaG9wX2NhcnRfYWN0aXZlLnBuZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvbWUvbWVcIixcbiAgICAgICAgICBcInRleHRcIjogXCLmiJFcIixcbiAgICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL2ljb25faW5mby5wbmdcIixcbiAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJpbWFnZXMvaWNvbl9pbmZvX2FjdGl2ZS5wbmdcIlxuICAgICAgICB9XVxuICAgICAgfVxuICAgIH1cblxuICAgIGdsb2JhbERhdGEgPSB7XG4gICAgICB1c2VySW5mbzogbnVsbCxcbiAgICAgIGFwcGlkOiAnd3g2YjEyMTk0MWIyMDBlYTUwJyxcbiAgICAgIHNlY3JldDogJzM2YTc2YjA2ODJiZDJjM2YxNTQxZmQwMTJmYWM2NmY1JyxcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKClcbiAgICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgICAgIHRoaXMudXNlKCdwcm9taXNpZnknKTtcblxuICAgIH1cbiAgICBhc3luYyBvbkxhdW5jaCgpIHtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIC8v55So5oi35L+h5oGvXG4gICAgICBsZXQgdXNlclNwZWNpYWxJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8pIHx8IHt9O1xuICAgICAgLy8g55So5oi35pmu6YCa5L+h5oGvXG4gICAgICBsZXQgdXNlckluZm8gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFVTRVJfSU5GTykgfHwge307XG5cbiAgICAgIC8v5aaC5p6c5L+h5oGv6L+H5pyfXG4gICAgICBpZiAoKCF1c2VyU3BlY2lhbEluZm8ub3BlbmlkIHx8ICh1c2VyU3BlY2lhbEluZm8uZXhwaXJlc19pbiB8fCBEYXRlLm5vdygpKSA8IChEYXRlLm5vdygpICsgNjAwKSkgJiYgKCF1c2VySW5mby5uaWNrTmFtZSkpIHtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHdlcHkubG9naW4oKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzYWZzZnNkZnNkZnNkZnNkZnNmXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICBpZiAocmVzLmNvZGUpIHtcbiAgICAgICAgICBsZXQgZCA9IHRoYXQuZ2xvYmFsRGF0YTsgLy/ov5nph4zlrZjlgqjkuoZhcHBpZOOAgXNlY3JldOOAgXRva2Vu5LiywqDCoMKgwqBcbiAgICAgICAgICAvL+WtmOWCqHVzZXJJbmZvwqBcbiAgICAgICAgICBsZXQgYyA9IGF3YWl0IHdlcHkuZ2V0VXNlckluZm8oKTtcbiAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFVTRVJfSU5GTywgYy51c2VySW5mbyk7XG5cbiAgICAgICAgICAvL+WtmOWCqOezu+e7n+S/oeaBr8KgXG4gICAgICAgICAgbGV0IHN5c3RlbUluZm8gPSB3ZXB5LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhTWVNURU1fSU5GTywgc3lzdGVtSW5mbyk7XG4gICAgICAgICAgd3hKc0NvZGUyU2Vzc2lvbih7XG4gICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICBqc0NvZGU6IHJlcy5jb2RlLFxuICAgICAgICAgICAgICBuaWNrTmFtZTogYy51c2VySW5mby5uaWNrTmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLnRoZW4ocmVzcCA9PiB7XG4gICAgICAgICAgICB2YXIgcmx0ID0gcmVzcC5kYXRhO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3eEpzQ29kZTJTZXNzaW9uLi4uXCIgKyBKU09OLnN0cmluZ2lmeShybHQpKTtcbiAgICAgICAgICAgIGlmIChybHQucmVzdWx0KSB7XG4gICAgICAgICAgICAgIHZhciBkYXRhID0gcmx0LmRhdGE7XG4gICAgICAgICAgICAgIGlmIChkYXRhLm9wZW5pZCkge1xuICAgICAgICAgICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgICAgICAgICBvYmoub3BlbmlkID0gZGF0YS5vcGVuaWQ7XG4gICAgICAgICAgICAgICAgb2JqLmV4cGlyZXNfaW4gPSBEYXRlLm5vdygpICsgZGF0YS5leHBpcmVzX2luO1xuICAgICAgICAgICAgICAgIC8v5a2Y5YKob3BlbmlkwqBcbiAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFVTRVJfU1BFQ0lDQUxfSU5GTywgb2JqKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgICAgICAgICBvYmoub3BlbmlkID0gXCJvZXVqNTBLSE1xc2g1a1laWVdRSnV3bVk1eUcwXCI7XG4gICAgICAgICAgICAgIG9iai5leHBpcmVzX2luID0gXCI3MjAwXCI7XG4gICAgICAgICAgICAgIC8v5a2Y5YKob3BlbmlkwqBcbiAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8sIG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBsZXQgdXJsID0gJ2h0dHBzOi8vYXBpLndlaXhpbi5xcS5jb20vc25zL2pzY29kZTJzZXNzaW9uP2FwcGlkPScgKyBkLmFwcGlkICsgJyZzZWNyZXQ9JyArIGQuc2VjcmV0ICsgJyZqc19jb2RlPScgKyByZXMuY29kZSArICcmZ3JhbnRfdHlwZT1hdXRob3JpemF0aW9uX2NvZGUnO1xuXG4gICAgICAgICAgLyogbGV0IGIgPSBhd2FpdCB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgIH0pO1xuICAgICAgICAgICBpZiAoYi5kYXRhLm9wZW5pZCkge1xuICAgICAgICAgICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgICAgICAgICAgb2JqLm9wZW5pZCA9IGIuZGF0YS5vcGVuaWQ7XG4gICAgICAgICAgICAgICBvYmouZXhwaXJlc19pbiA9IERhdGUubm93KCkgKyBiLmRhdGEuZXhwaXJlc19pbjtcblxuICAgICAgICAgICAgICAgLy/lrZjlgqhvcGVuaWTCoFxuICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhVU0VSX1NQRUNJQ0FMX0lORk8sIG9iaik7XG5cbiAgICAgICAgICAgICAgIC8v5a2Y5YKodXNlckluZm/CoFxuICAgICAgICAgICAgICAgbGV0IGMgPSBhd2FpdCB3ZXB5LmdldFVzZXJJbmZvKCk7XG4gICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFVTRVJfSU5GTywgYy51c2VySW5mbyk7XG5cbiAgICAgICAgICAgICAgIC8v5a2Y5YKo57O757uf5L+h5oGvwqBcbiAgICAgICAgICAgICAgIGxldCBzeXN0ZW1JbmZvID0gYXdhaXQgd2VweS5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhTWVNURU1fSU5GTywgc3lzdGVtSW5mbyk7XG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhiLCAn55m76ZmG5oiQ5YqfJylcbiAgICAgICAgICAgfSovXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W55So5oi355m75b2V5oCB5aSx6LSl77yBJyArIHJlcy5lcnJNc2cpXG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4iXX0=