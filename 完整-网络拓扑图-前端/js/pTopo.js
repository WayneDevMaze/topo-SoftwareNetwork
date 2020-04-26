/*!
 * pTopo.js v0.0.6
 * (c) 2018-2018 Point
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  String.prototype.getChineseNum = function () {
    var len = 0;

    for (var i = 0; i < this.length; i++) {
      if (this.charCodeAt(i) > 127 || this.charCodeAt(i) === 94) {
        len += 1;
      }
    }

    return len;
  };

  Array.prototype.del = function (indexOrValue) {
    if ("number" !== typeof indexOrValue) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === indexOrValue) {
          return this.slice(0, i).concat(this.slice(i + 1, this.length));
        }
      }

      return this;
    }

    return 0 > indexOrValue ? this : this.slice(0, indexOrValue).concat(this.slice(indexOrValue + 1, this.length));
  };

  Array.prototype.unique = function () {
    this.sort();
    var res = [this[0]];

    for (var i = 1; i < this.length; i++) {
      if (this[i] !== res[res.length - 1]) {
        res.push(this[i]);
      }
    }

    return res;
  };

  CanvasRenderingContext2D.prototype.PTopoRoundRect = function (x, y, w, h, borderRadius, borderDashed) {
    !borderRadius && (borderRadius = 5);

    if (borderDashed) {
      this.beginPath();
      this.PTopoDashedLineTo(x + borderRadius, y, x + w - borderRadius, y);
      this.quadraticCurveTo(x + w, y, x + w, y + borderRadius);
      this.PTopoDashedLineTo(x + w, y + borderRadius, x + w, y + h - borderRadius);
      this.quadraticCurveTo(x + w, y + h, x + w - borderRadius, y + h);
      this.PTopoDashedLineTo(x + w - borderRadius, y + h, x + borderRadius, y + h);
      this.quadraticCurveTo(x, y + h, x, y + h - borderRadius);
      this.PTopoDashedLineTo(x, y + h - borderRadius, x, y + borderRadius);
      this.quadraticCurveTo(x, y, x + borderRadius, y);
      this.PTopoDashedLineTo(x, y, x + borderRadius, y);
      this.closePath();
    } else {
      this.beginPath();
      this.moveTo(x + borderRadius, y);
      this.lineTo(x + w - borderRadius, y);
      this.quadraticCurveTo(x + w, y, x + w, y + borderRadius);
      this.lineTo(x + w, y + h - borderRadius);
      this.quadraticCurveTo(x + w, y + h, x + w - borderRadius, y + h);
      this.lineTo(x + borderRadius, y + h);
      this.quadraticCurveTo(x, y + h, x, y + h - borderRadius);
      this.lineTo(x, y + borderRadius);
      this.quadraticCurveTo(x, y, x + borderRadius, y);
      this.closePath();
    }
  };

  CanvasRenderingContext2D.prototype.PTopoDashedLineTo = function (x1, y1, x2, y2, dashedLineSpacing) {
    !dashedLineSpacing && (dashedLineSpacing = 5);
    var w = x2 - x1;
    var h = y2 - y1;
    var len = Math.floor(Math.sqrt(w * w + h * h));
    var dashedLineSpacingAmount = 0 >= dashedLineSpacing ? len : len / dashedLineSpacing;
    var dashedLineSpacingH = h / len * dashedLineSpacing;
    var dashedLineSpacingW = w / len * dashedLineSpacing;
    this.beginPath();

    for (var stepAmount = 0; dashedLineSpacingAmount > stepAmount; stepAmount++) {
      stepAmount % 2 ? this.lineTo(x1 + stepAmount * dashedLineSpacingW, y1 + stepAmount * dashedLineSpacingH) : this.moveTo(x1 + stepAmount * dashedLineSpacingW, y1 + stepAmount * dashedLineSpacingH);
    }

    this.stroke();
  };

  CanvasRenderingContext2D.prototype.PTopoDrawPointPath = function (x1, y1, x2, y2, strokeStyle, PointPathColor) {
    var animSpeed = new Date() / 10;
    var w = x2 - x1;
    var h = y2 - y1;
    var l = Math.floor(Math.sqrt(w * w + h * h));
    var pointPathLen = 50;
    var wLen;
    var hLen;

    if (l === 0) {
      wLen = 0;
      hLen = 0;
    } else {
      wLen = w / l;
      hLen = h / l;
    }

    var colorpoint = animSpeed % (l + pointPathLen) - pointPathLen;

    for (var i = 0; i < l; i++) {
      if (i > colorpoint && i < colorpoint + pointPathLen) {
        this.beginPath();
        this.strokeStyle = strokeStyle;
        this.moveTo(x1 + (i - 1) * wLen, y1 + (i - 1) * hLen);
        this.lineTo(x1 + i * wLen, y1 + i * hLen);
        this.stroke();
      } else {
        this.beginPath();
        this.strokeStyle = PointPathColor;
        this.moveTo(x1 + (i - 1) * wLen, y1 + (i - 1) * hLen);
        this.lineTo(x1 + i * wLen, y1 + i * hLen);
        this.stroke();
      }
    }
  };

  var Element =
  /*#__PURE__*/
  function () {
    function Element() {
      _classCallCheck(this, Element);

      this.elementType = 'element';
      this.serializedProperties = ['elementType'];
      this.propertiesStack = [];
      this._id = "" + new Date().getTime();
    }

    _createClass(Element, [{
      key: "destory",
      value: function destory() {}
    }, {
      key: "removeHandler",
      value: function removeHandler() {}
    }, {
      key: "attr",
      value: function attr(k, v) {
        if (k && v) {
          this[k] = v;
        } else if (k) {
          return this[k];
        }

        return this;
      }
    }, {
      key: "save",
      value: function save() {
        var self = this;
        var data = {};
        this.serializedProperties.forEach(function (key) {
          data[key] = self[key];
        });
        this.propertiesStack.push(data);
      }
    }, {
      key: "restore",
      value: function restore() {
        if (this.propertiesStack && this.propertiesStack.length) {
          var self = this;
          var data = self.propertiesStack.pop();
          self.serializedProperties.forEach(function (key) {
            self[key] = data[key];
          });
        }
      }
    }, {
      key: "toJson",
      value: function toJson() {
        var self = this;
        var len = this.serializedProperties.length;
        var dataJsonStr = "{";
        this.serializedProperties.forEach(function (key, i) {
          var val = self[key];
          "string" === typeof val && (val = '"' + val + '"');
          dataJsonStr += '"' + key + '":' + val;
          len > i + 1 && (dataJsonStr += ",");
        });
        dataJsonStr += "}";
        return dataJsonStr;
      }
    }]);

    return Element;
  }();

  var DisplayElement =
  /*#__PURE__*/
  function (_Element) {
    _inherits(DisplayElement, _Element);

    function DisplayElement() {
      var _this;

      _classCallCheck(this, DisplayElement);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(DisplayElement).call(this));
      _this.elementType = 'displayElement';
      _this.x = 0;
      _this.y = 0;
      _this.width = 32;
      _this.height = 32;
      _this.visible = true;
      _this.alpha = 1;
      _this.rotate = 0;
      _this.scaleX = 1;
      _this.scaleY = 1;
      _this.strokeColor = '22, 124, 255';
      _this.borderColor = '22, 124, 255';
      _this.fillColor = '22,124,255';
      _this.shadow = false;
      _this.shadowBlur = 5;
      _this.shadowColor = 'rgba(0,0,0,.5)';
      _this.shadowOffsetX = 3;
      _this.shadowOffsetY = 6;
      _this.transformAble = false;
      _this.zIndex = 0;
      var keyArr = "x,y,width,height,visible,alpha,rotate,scaleX,scaleY,strokeColor,fillColor,shadow,shadowColor,shadowOffsetX,shadowOffsetY,transformAble,zIndex".split(",");
      _this.serializedProperties = _this.serializedProperties.concat(keyArr);
      return _this;
    }

    _createClass(DisplayElement, [{
      key: "paint",
      value: function paint(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + this.fillColor + ',' + this.alpha + ')';
        ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      }
    }, {
      key: "getLocation",
      value: function getLocation() {
        return {
          x: this.x,
          y: this.y
        };
      }
    }, {
      key: "setLocation",
      value: function setLocation(x, y) {
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "getCenterLocation",
      value: function getCenterLocation() {
        return {
          x: this.x + this.width / 2,
          y: this.y + this.height / 2
        };
      }
    }, {
      key: "setCenterLocation",
      value: function setCenterLocation(x, y) {
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
        return this;
      }
    }, {
      key: "getSize",
      value: function getSize() {
        return {
          width: this.width,
          height: this.height
        };
      }
    }, {
      key: "setSize",
      value: function setSize(w, h) {
        this.width = w;
        this.height = h;
        return this;
      }
    }, {
      key: "getBound",
      value: function getBound() {
        return {
          left: this.x,
          top: this.y,
          right: this.x + this.width,
          bottom: this.y + this.height,
          width: this.width,
          height: this.height
        };
      }
    }, {
      key: "setBound",
      value: function setBound(x, y, w, h) {
        this.setLocation(x, y);
        this.setSize(w, h);
        return this;
      }
    }, {
      key: "getDisplayBound",
      value: function getDisplayBound() {
        return {
          left: this.x,
          top: this.y,
          right: this.x + this.width * this.scaleX,
          bottom: this.y + this.height * this.scaleY
        };
      }
    }, {
      key: "getDisplaySize",
      value: function getDisplaySize() {
        return {
          width: this.width * this.scaleX,
          height: this.height * this.scaleY
        };
      }
    }, {
      key: "getPosition",
      value: function getPosition(posDesc) {
        var x;
        var y;
        var boundObj = this.getBound();

        switch (posDesc) {
          case 'Top_Left':
            x = boundObj.left;
            y = boundObj.top;
            break;

          case 'Top_Center':
            x = this.cx;
            y = boundObj.top;
            break;

          case 'Top_Right':
            x = boundObj.right;
            y = boundObj.top;
            break;

          case 'Middle_Left':
            x = boundObj.left;
            y = this.cy;
            break;

          case 'Middle_Center':
            x = this.cx;
            y = this.cy;
            break;

          case 'Middle_Right':
            x = boundObj.right;
            y = this.cy;
            break;

          case 'Bottom_Left':
            x = boundObj.left;
            y = boundObj.bottom;
            break;

          case 'Bottom_Center':
            x = this.cx;
            y = boundObj.bottom;
            break;

          case 'Bottom_Right':
            x = boundObj.right;
            y = boundObj.bottom;
            break;
        }

        return {
          x: x,
          y: y
        };
      }
    }, {
      key: "cx",
      get: function get() {
        return this.x + this.width / 2;
      },
      set: function set(cx) {
        this.x = cx - this.width / 2;
      }
    }, {
      key: "cy",
      get: function get() {
        return this.y + this.height / 2;
      },
      set: function set(cy) {
        this.y = cy - this.height / 2;
      }
    }]);

    return DisplayElement;
  }(Element);

  var EventEmitter =
  /*#__PURE__*/
  function () {
    function EventEmitter(type) {
      _classCallCheck(this, EventEmitter);

      this.name = type;
      this.messageMap = {};
      this.messageCount = 0;
    }

    _createClass(EventEmitter, [{
      key: "subscribe",
      value: function subscribe(type, listener) {
        var handler = this.messageMap[type];
        !handler && (this.messageMap[type] = []);
        this.messageMap[type].push(listener);
        this.messageCount++;
      }
    }, {
      key: "unsubscribe",
      value: function unsubscribe(type) {
        var handler = this.messageMap[type];

        if (handler) {
          this.messageMap[type] = null;
          delete this.messageMap[type];
          this.messageCount--;
        }
      }
    }, {
      key: "publish",
      value: function publish(type, eObj, sign) {
        var handler = this.messageMap[type];
        handler && handler.forEach(function (listener) {
          sign ? !function (listener, eObj) {
            setTimeout(function () {
              listener(eObj);
            }, 10);
          }(listener, eObj) : listener(eObj);
        });
      }
    }, {
      key: "on",
      value: function on(type, eObj) {}
    }, {
      key: "emit",
      value: function emit(type, args) {}
    }, {
      key: "off",
      value: function off(type) {}
    }, {
      key: "once",
      value: function once(type, eObj) {}
    }]);

    return EventEmitter;
  }();

  var InteractiveElement =
  /*#__PURE__*/
  function (_DisplayElement) {
    _inherits(InteractiveElement, _DisplayElement);

    function InteractiveElement() {
      var _this;

      _classCallCheck(this, InteractiveElement);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(InteractiveElement).call(this));
      _this.elementType = 'interactiveElement';
      _this.dragable = false;
      _this.selected = false;
      _this.showSelected = true;
      _this.selectedLocation = null;
      _this.isMouseOver = false;
      var keyArr = "dragable,selected,showSelected,isMouseOver".split(",");
      _this.serializedProperties = _this.serializedProperties.concat(keyArr);
      return _this;
    }

    _createClass(InteractiveElement, [{
      key: "paintSelected",
      value: function paintSelected(ctx) {
        if (this.showSelected) {
          ctx.save();
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(168,202,255,.9)';
          ctx.fillStyle = 'rgba(168,202,236,0.7)';
          ctx.rect(-this.width / 2 - 3, -this.height / 2 - 3, this.width + 6, this.height + 6);
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
        }
      }
    }, {
      key: "paintMouseover",
      value: function paintMouseover(ctx) {
        return this.paintSelected(ctx);
      }
    }, {
      key: "isInBound",
      value: function isInBound(x, y) {
        return x > this.x && x < this.x + this.width * Math.abs(this.scaleX) && y > this.y && y < this.y + this.height * Math.abs(this.scaleY);
      }
    }, {
      key: "addEventListener",
      value: function addEventListener(type, fn) {
        var self = this;

        var listener = function listener(args) {
          fn.call(self, args);
        };

        this.eventEmitter || (this.eventEmitter = new EventEmitter());
        this.eventEmitter.subscribe(type, listener);
        return this;
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(type, e) {
        if (this.eventEmitter) {
          this.eventEmitter.publish(type, e);
          return this;
        } else {
          return null;
        }
      }
    }, {
      key: "selectedHandler",
      value: function selectedHandler() {
        this.selected = true;
        this.selectedLocation = {
          x: this.x,
          y: this.y
        };
      }
    }, {
      key: "unselectedHandler",
      value: function unselectedHandler() {
        this.selected = false;
        this.selectedLocation = null;
      }
    }, {
      key: "clickHandler",
      value: function clickHandler(e) {
        this.dispatchEvent('click', e);
      }
    }, {
      key: "dbclickHandler",
      value: function dbclickHandler(e) {
        this.dispatchEvent("dbclick", e);
      }
    }, {
      key: "mousedownHander",
      value: function mousedownHander(e) {
        this.dispatchEvent("mousedown", e);
      }
    }, {
      key: "mouseupHandler",
      value: function mouseupHandler(e) {
        this.dispatchEvent("mouseup", e);
      }
    }, {
      key: "mouseoverHandler",
      value: function mouseoverHandler(e) {
        this.isMouseOver = true;
        this.dispatchEvent("mouseover", e);
      }
    }, {
      key: "mousemoveHandler",
      value: function mousemoveHandler(e) {
        this.dispatchEvent("mousemove", e);
      }
    }, {
      key: "mouseoutHandler",
      value: function mouseoutHandler(e) {
        this.isMouseOver = false;
        this.dispatchEvent("mouseout", e);
      }
    }, {
      key: "mousedragHandler",
      value: function mousedragHandler(e) {
        var x = this.selectedLocation.x + e.dx;
        var y = this.selectedLocation.y + e.dy;
        this.setLocation(x, y);
        this.dispatchEvent("mousedrag", e);
      }
    }, {
      key: "removeEventListener",
      value: function removeEventListener(type) {
        this.eventEmitter.unsubscribe(type);
      }
    }, {
      key: "removeAllEventListener",
      value: function removeAllEventListener() {
        this.eventEmitter = new EventEmitter();
      }
    }, {
      key: "click",
      value: function click(fn) {
        fn ? this.addEventListener('click', fn) : this.dispatchEvent('click');
      }
    }, {
      key: "dbclick",
      value: function dbclick(fn) {
        fn ? this.addEventListener('dbclick', fn) : this.dispatchEvent('dbclick');
      }
    }, {
      key: "mousedown",
      value: function mousedown(fn) {
        fn ? this.addEventListener('mousedown', fn) : this.dispatchEvent('mousedown');
      }
    }, {
      key: "mouseup",
      value: function mouseup(fn) {
        fn ? this.addEventListener('mouseup', fn) : this.dispatchEvent('mouseup');
      }
    }, {
      key: "mouseover",
      value: function mouseover(fn) {
        fn ? this.addEventListener('mouseover', fn) : this.dispatchEvent('mouseover');
      }
    }, {
      key: "mouseout",
      value: function mouseout(fn) {
        fn ? this.addEventListener('mouseout', fn) : this.dispatchEvent('mouseout');
      }
    }, {
      key: "mousemove",
      value: function mousemove(fn) {
        fn ? this.addEventListener('mousemove', fn) : this.dispatchEvent('mousemove');
      }
    }, {
      key: "mousedrag",
      value: function mousedrag(fn) {
        fn ? this.addEventListener('mousedrag', fn) : this.dispatchEvent('mousedrag');
      }
    }, {
      key: "touchstart",
      value: function touchstart(fn) {
        fn ? this.addEventListener('touchstart', fn) : this.dispatchEvent('touchstart');
      }
    }, {
      key: "touchmove",
      value: function touchmove(fn) {
        fn ? this.addEventListener('touchmove', fn) : this.dispatchEvent('touchmove');
      }
    }, {
      key: "touchend",
      value: function touchend(fn) {
        fn ? this.addEventListener('touchend', fn) : this.dispatchEvent('touchend');
      }
    }]);

    return InteractiveElement;
  }(DisplayElement);

  var zIndex_Container = 1;
  var zIndex_Link = 2;
  var zIndex_Node = 3;
  var SceneMode = {
    normal: "normal",
    drag: "drag",
    edit: "edit",
    select: "select"
  };
  var MouseCursor = {
    normal: "default",
    pointer: "pointer",
    top_left: "nw-resize",
    top_center: "n-resize",
    top_right: "ne-resize",
    middle_left: "e-resize",
    middle_right: "e-resize",
    bottom_left: "ne-resize",
    bottom_center: "n-resize",
    bottom_top: "n-resize",
    bottom_right: "nw-resize",
    move: "move"
  };

  var posArr = ["Top_Left", "Top_Center", "Top_Right", "Middle_Left", "Middle_Right", "Bottom_Left", "Bottom_Center", "Bottom_Right"];

  var EditableElement =
  /*#__PURE__*/
  function (_InteractiveElement) {
    _inherits(EditableElement, _InteractiveElement);

    function EditableElement() {
      var _this;

      _classCallCheck(this, EditableElement);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(EditableElement).call(this));
      _this.editAble = false;
      _this.selectedPoint = null;
      return _this;
    }

    _createClass(EditableElement, [{
      key: "getCtrlPosition",
      value: function getCtrlPosition(posDesc) {
        var dx = 5;
        var dy = 5;
        var posObj = this.getPosition(posDesc);
        return {
          left: posObj.x - dx,
          top: posObj.y - dy,
          right: posObj.x + dx,
          bottom: posObj.y + dy
        };
      }
    }, {
      key: "selectedHandler",
      value: function selectedHandler(b) {
        _get(_getPrototypeOf(EditableElement.prototype), "selectedHandler", this).apply(this, arguments);

        this.selectedSize = {
          width: this.width,
          height: this.height
        };
        b.scene.mode === SceneMode.edit && (this.editAble = true);
      }
    }, {
      key: "unselectedHandler",
      value: function unselectedHandler() {
        _get(_getPrototypeOf(EditableElement.prototype), "unselectedHandler", this).apply(this, arguments);

        this.selectedSize = null;
        this.editAble = false;
      }
    }, {
      key: "paintCtrl",
      value: function paintCtrl(ctx) {
        if (this.editAble) {
          ctx.save();

          for (var i = 0; i < posArr.length; i++) {
            var ctrlPosObj = this.getCtrlPosition(posArr[i]);
            ctrlPosObj.left -= this.cx;
            ctrlPosObj.right -= this.cx;
            ctrlPosObj.top -= this.cy;
            ctrlPosObj.bottom -= this.cy;
            var w = ctrlPosObj.right - ctrlPosObj.left;
            var h = ctrlPosObj.bottom - ctrlPosObj.top;
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0,0,0,.8)';
            ctx.rect(ctrlPosObj.left, ctrlPosObj.top, w, h);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255,255,255,.3)';
            ctx.rect(ctrlPosObj.left + 1, ctrlPosObj.top + 1, w - 2, h - 2);
            ctx.stroke();
            ctx.closePath();
          }

          ctx.restore();
        }
      }
    }, {
      key: "isInBound",
      value: function isInBound(x, y) {
        this.selectedPoint = null;

        if (this.editAble) {
          for (var i = 0; i < posArr.length; i++) {
            var ctrlPosObj = this.getCtrlPosition(posArr[i]);

            if (x > ctrlPosObj.left && x < ctrlPosObj.right && y > ctrlPosObj.top && y < ctrlPosObj.bottom) {
              this.selectedPoint = posArr[i];
              return true;
            }
          }
        }

        return _get(_getPrototypeOf(EditableElement.prototype), "isInBound", this).apply(this, arguments);
      }
    }, {
      key: "mousedragHandler",
      value: function mousedragHandler(e) {
        if (!this.selectedPoint) {
          var x = this.selectedLocation.x + e.dx;
          var y = this.selectedLocation.y + e.dy;
          this.setLocation(x, y);
          this.dispatchEvent('mousedrag', e);
        } else {
          var w = this.selectedSize.width - e.dx;
          var w1 = this.selectedSize.width + e.dx;
          var h = this.selectedSize.height - e.dy;
          var h1 = this.selectedSize.height + e.dy;

          var _x = this.selectedLocation.x + e.dx;

          var _y = this.selectedLocation.y + e.dy;

          switch (this.selectedPoint) {
            case 'Top_Left':
              if (_x < this.x + this.width) {
                this.x = _x;
                this.width = w;
              }

              if (_y < this.y + this.height) {
                this.y = _y;
                this.height = h;
              }

              break;

            case 'Top_Center':
              if (_y < this.y + this.height) {
                this.y = _y;
                this.height = h;
              }

              break;

            case 'Top_Right':
              if (_y < this.y + this.height) {
                this.y = _y;
                this.height = this.selectedSize.height - e.dy;
              }

              w1 > 1 && (this.width = w1);
              break;

            case 'Middle_Left':
              _x < this.x + this.width && (this.x = _x);
              w > 1 && (this.width = w);
              break;

            case 'Middle_Right':
              w1 > 1 && (this.width = w1);
              break;

            case 'Bottom_Left':
              if (w > 1) {
                this.x = _x;
                this.width = w;
              }

              h1 > 1 && (this.height = h1);
              break;

            case 'Bottom_Center':
              h1 > 1 && (this.height = h1);
              break;

            case 'Bottom_Top':
              h1 > 1 && (this.height = h1);
              break;

            case 'Bottom_Right':
              w1 > 1 && (this.width = w1);
              h1 > 1 && (this.height = h1);
              break;
          }

          this.dispatchEvent("resize", e);
        }
      }
    }]);

    return EditableElement;
  }(InteractiveElement);



  var Element$1 = /*#__PURE__*/Object.freeze({
    Element: Element,
    EditableElement: EditableElement,
    DisplayElement: DisplayElement,
    InteractiveElement: InteractiveElement
  });

  function rotatePoint(x1, y1, x2, y2, rad) {
    var w = x2 - x1;
    var h = y2 - y1;
    var l = Math.sqrt(w * w + h * h);
    var tarRad = Math.atan2(h, w) + rad;
    return {
      x: x1 + Math.cos(tarRad) * l,
      y: y1 + Math.sin(tarRad) * l
    };
  }
  function rotatePoints(p1, pointsArr, rad) {
    var tarCoordArr = [];

    for (var i = 0; i < pointsArr.length; i++) {
      var tarRotatePointCoord = rotatePoint(p1.x, p1.y, pointsArr[i].x, pointsArr[i].y, rad);
      tarCoordArr.push(tarRotatePointCoord);
    }

    return tarCoordArr;
  }
  function getDistance(p1, p2, c, d) {
    var w;
    var h;

    if (!c && !d) {
      w = p2.x - p1.x;
      h = p2.y - p1.y;
    } else {
      w = c - p1;
      h = d - p2;
    }

    return Math.sqrt(w * w + h * h);
  }
  function isPointInLine(p1, p2, p3) {
    var d1 = getDistance(p2, p3);
    var d2 = getDistance(p2, p1);
    var d3 = getDistance(p3, p1);
    return Math.abs(d2 + d3 - d1) <= .5;
  }
  function cloneEvent(e) {
    var eObj = {};

    for (var key in e) {
      "returnValue" !== key && "keyLocation" !== key && (eObj[key] = e[key]);
    }

    return eObj;
  }
  function mouseCoords(e) {
    var eObj = cloneEvent(e);

    if (!eObj.pageX) {
      eObj.pageX = eObj.clientX + document.body.scrollLeft - document.body.clientLeft;
      eObj.pageY = eObj.clientY + document.body.scrollTop - document.body.clientTop;
    }

    return eObj;
  }
  function getEventPosition(e) {
    return mouseCoords(e);
  }
  function isPointInRect(point, rect) {
    return point.x > rect.x && point.x < rect.x + rect.width && point.y > rect.y && point.y < rect.y + rect.height;
  }
  function isRectOverlapRect(rect1, rect2) {
    function sugar(rect1, rect2) {
      var rect = rect1;
      var leftTop = {
        x: rect.x,
        y: rect.y
      };
      var leftBottom = {
        x: rect.x,
        y: rect.y + rect.height
      };
      var rightTop = {
        x: rect.x + rect.width,
        y: rect.y
      };
      var rightBottom = {
        x: rect.x + rect.width,
        y: rect.y + rect.height
      };
      return isPointInRect(leftTop, rect2) || isPointInRect(leftBottom, rect2) || isPointInRect(rightTop, rect2) || isPointInRect(rightBottom, rect2);
    }

    return sugar(rect1, rect2) || sugar(rect2, rect1);
  }
  function randomColor() {
    return Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random());
  }
  function getProperties(obj, keys) {
    var propertiesJson = "";

    for (var i = 0; i < keys.length; i++) {
      i > 0 && (propertiesJson += ",");
      var value = obj[keys[i]];
      "string" === typeof value ? value = '"' + value + '"' : !value && (value = null);
      propertiesJson += keys[i] + ":" + value;
    }

    return propertiesJson;
  }
  function lineFn(x1, y1, x2, y2) {
    var k = (y2 - y1) / (x2 - x1);
    var b = y1 - x1 * k;

    function sugar(x) {
      // y = kx + b
      return k * x + b;
    }

    sugar.k = k;
    sugar.b = b;
    sugar.x1 = x1;
    sugar.x2 = x2;
    sugar.y1 = y1;
    sugar.y2 = y2;
    return sugar;
  }
  function inRange(testVal, val1, val2) {
    var d1 = Math.abs(val1 - val2);
    var d2 = Math.abs(val1 - testVal);
    var d3 = Math.abs(val2 - testVal);
    var sign = Math.abs(d1 - (d2 + d3));
    return 1e-6 > sign ? !0 : !1;
  }
  function isPointInLineSeg(x, y, lineFn) {
    return inRange(x, lineFn.x1, lineFn.x2) && inRange(y, lineFn.y1, lineFn.y2);
  }
  function intersection(lineObj1, lineObj2) {
    var x;
    var y;
    return lineObj1.k == lineObj2.k ? null : (1 / 0 == lineObj1.k || lineObj1.k == -1 / 0 ? (x = lineObj1.x1, y = lineObj2(lineObj1.x1)) : 1 / 0 == lineObj2.k || lineObj2.k == -1 / 0 ? (x = lineObj2.x1, y = lineObj1(lineObj2.x1)) : (x = (lineObj2.b - lineObj1.b) / (lineObj1.k - lineObj2.k), y = lineObj1(x)), 0 == isPointInLineSeg(x, y, lineObj1) ? null : 0 == isPointInLineSeg(x, y, lineObj2) ? null : {
      x: x,
      y: y
    }); // let x
    // let y
    //
    // if (lineFn1.k === lineFn2.k) {
    //   return null
    // }
    // else {
    //   if (
    //     1 / 0 === lineFn1.k
    //     || -1 / 0 === lineFn1.k
    //   ) {
    //     x = lineFn1.x1
    //     y = lineFn2(lineFn1.x1)
    //
    //     return {x, y}
    //   }
    //   else {
    //     if (
    //       1 / 0 === lineFn2.k
    //       || -1 / 0 === lineFn2.k
    //     ) {
    //       x = lineFn2.x1
    //       y = lineFn1(lineFn2.x1)
    //
    //       return {x, y}
    //     }
    //     else {
    //       x = (lineFn2.b - lineFn1.b) / (lineFn1.k - lineFn2.k)
    //       y = lineFn1(x)
    //
    //       if (!isPointInLineSeg(x, y, lineFn1)) {
    //         return null
    //       }
    //       else {
    //         if (isPointInLineSeg(x, y, lineFn2)) {
    //           return null
    //         }
    //         else {
    //           return {x, y}
    //         }
    //       }
    //     }
    //   }
    // }
  }
  function createId() {
    return "front" + new Date().getTime() + Math.round(Math.random() * 1000000);
  }
  function copy(jsonObj) {
    return JSON.parse(JSON.stringify(jsonObj));
  }
  function getUrlParam(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);

    if (r) {
      return decodeURIComponent(r[2]);
    }

    return null;
  }
  function getRotateAng(nodeA, nodeZ) {
    var x = nodeA.x - nodeZ.x;
    var y = nodeA.y - nodeZ.y;
    return Math.atan(y / x);
  }
  function clone(jsonObj) {
    var copyJsonObj = {};

    for (var key in jsonObj) {
      copyJsonObj[key] = jsonObj[key];
    }

    return copyJsonObj;
  }
  function findAllPrevNodesAndLinks(id, linksArr, saveObj) {
    var _saveObj = saveObj;

    if (!saveObj) {
      _saveObj = {
        prevNodesId: [],
        prevLinksId: []
      };
    }

    for (var i = 0; i < linksArr.length; i++) {
      var linkObj = linksArr[i];

      if (linkObj.nodeZ.id === id) {
        _saveObj.prevNodesId.push(linkObj.nodeA.id);

        _saveObj.prevLinksId.push(linkObj.id);

        findAllPrevNodesAndLinks(linkObj.nodeA.id, linksArr, _saveObj);
      }
    }

    return _saveObj;
  }
  function findAllNextNodesAndLinks(id, linksArr, saveObj) {
    var _saveObj = saveObj;

    if (!saveObj) {
      _saveObj = {
        nextNodesId: [],
        nextLinksId: []
      };
    }

    for (var i = 0; i < linksArr.length; i++) {
      var linkObj = linksArr[i];

      if (linkObj.nodeA.id === id) {
        _saveObj.nextNodesId.push(linkObj.nodeZ.id);

        _saveObj.nextLinksId.push(linkObj.id);

        findAllNextNodesAndLinks(linkObj.nodeZ.id, linksArr, _saveObj);
      }
    }

    return _saveObj;
  }
  function removeFromArray(arr, tarEle) {
    for (var i = 0; i < arr.length; i++) {
      var curEle = arr[i];

      if (curEle === tarEle) {
        arr = arr.del(i);
        break;
      }
    }

    return arr;
  }
  function getOffsetPosition(ele) {
    if (!ele) {
      return {
        left: 0,
        top: 0
      };
    }

    var top = 0;
    var left = 0;

    do {
      top += ele.offsetTop || 0;
      left += ele.offsetLeft || 0;
      ele = ele.offsetParent;
    } while (ele);

    return {
      top: top,
      left: left
    };
  }

  var util = /*#__PURE__*/Object.freeze({
    rotatePoint: rotatePoint,
    rotatePoints: rotatePoints,
    getDistance: getDistance,
    isPointInLine: isPointInLine,
    cloneEvent: cloneEvent,
    mouseCoords: mouseCoords,
    getEventPosition: getEventPosition,
    isPointInRect: isPointInRect,
    isRectOverlapRect: isRectOverlapRect,
    randomColor: randomColor,
    getProperties: getProperties,
    lineFn: lineFn,
    inRange: inRange,
    isPointInLineSeg: isPointInLineSeg,
    intersection: intersection,
    createId: createId,
    copy: copy,
    getUrlParam: getUrlParam,
    getRotateAng: getRotateAng,
    clone: clone,
    findAllPrevNodesAndLinks: findAllPrevNodesAndLinks,
    findAllNextNodesAndLinks: findAllNextNodesAndLinks,
    removeFromArray: removeFromArray,
    getOffsetPosition: getOffsetPosition
  });

  function intersectionLineBound(lineFn1, bObj) {
    var lineFn2 = lineFn(bObj.left, bObj.top, bObj.left, bObj.bottom);
    var ipObj = intersection(lineFn1, lineFn2);

    if (!ipObj) {
      lineFn2 = lineFn(bObj.left, bObj.top, bObj.right, bObj.top);
      ipObj = intersection(lineFn1, lineFn2);

      if (!ipObj) {
        lineFn2 = lineFn(bObj.right, bObj.top, bObj.right, bObj.bottom);
        ipObj = intersection(lineFn1, lineFn2);

        if (!ipObj) {
          lineFn2 = lineFn(bObj.left, bObj.bottom, bObj.right, bObj.bottom);
          ipObj = intersection(lineFn1, lineFn2);
        }
      }
    }

    return ipObj;
  }

  function getIntersectionPointObj(nodeA, nodeZ) {
    var lineObj = lineFn(nodeA.cx, nodeA.cy, nodeZ.cx, nodeZ.cy);
    var bObj = nodeA.getBound();
    return intersectionLineBound(lineObj, bObj);
  }

  function getSharedLinks(nodeA, nodeZ) {
    function sugar(nodeA, nodeZ) {
      var links = [];
      if (!nodeA || !nodeZ) return links;

      if (nodeA && nodeZ && nodeA.outLinks && nodeZ.inLinks) {
        for (var i = 0; i < nodeA.outLinks.length; i++) {
          var outLink = nodeA.outLinks[i];

          for (var j = 0; j < nodeZ.inLinks.length; j++) {
            var inLink = nodeZ.inLinks[j];
            outLink === inLink && links.push(inLink);
          }
        }
      }

      return links;
    }

    var a_zLinks = sugar(nodeA, nodeZ);
    var z_aLinks = sugar(nodeZ, nodeA);
    return a_zLinks.concat(z_aLinks);
  }

  function unsharedLinks(link) {
    var sharedLinks = getSharedLinks(link.nodeA, link.nodeZ);
    return sharedLinks.filter(function (sharedLink) {
      return link !== sharedLink;
    });
  }
  function getSharedLinksLen(nodeA, nodeZ) {
    return getSharedLinks(nodeA, nodeZ).length;
  }

  var Link =
  /*#__PURE__*/
  function (_InteractiveElement) {
    _inherits(Link, _InteractiveElement);

    function Link(nodeA, nodeZ, text, opts) {
      var _this;

      _classCallCheck(this, Link);

      !opts && (opts = {});
      _this = _possibleConstructorReturn(this, _getPrototypeOf(Link).call(this, nodeA, nodeZ, text, opts));
      _this.elementType = "link";
      _this.zIndex = zIndex_Link;
      _this.text = text;
      _this.nodeA = nodeA;
      _this.nodeA && !_this.nodeA.inLinks && (_this.nodeA.inLinks = []);
      _this.nodeA && !_this.nodeA.outLinks && (_this.nodeA.outLinks = []);
      _this.nodeA && _this.nodeA.outLinks.push(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.nodeZ = nodeZ;
      _this.nodeZ && !_this.nodeZ.inLinks && (_this.nodeZ.inLinks = []);
      _this.nodeZ && !_this.nodeZ.outLinks && (_this.nodeZ.outLinks = []);
      _this.nodeZ && _this.nodeZ.inLinks.push(_assertThisInitialized(_assertThisInitialized(_this)));

      _this.caculateIndex();

      _this.font = opts.font || "12px Consolas";
      _this.fontColor = opts.fontColor || "255,255,255";
      _this.lineWidth = opts.lineWidth || 2;
      _this.lineJoin = opts.lineJoin || "miter";
      _this.transformAble = false;
      _this.bundleOffset = opts.bundleOffset || 20;
      _this.bundleGap = opts.bundleGap || 12;
      _this.textOffsetX = opts.textOffsetX || 0;
      _this.textOffsetY = opts.textOffsetY || 0;
      _this.arrowsRadius = opts.arrowsRadius || null;
      _this.arrowsOffset = opts.arrowsOffset || 0;
      _this.dashedPattern = opts.dashedPattern || null;
      _this.path = opts.path || [];
      var keysArr = "text,font,fontColor,lineWidth,lineJoin".split(",");
      _this.serializedProperties = _this.serializedProperties.concat(keysArr);
      return _this;
    }

    _createClass(Link, [{
      key: "caculateIndex",
      value: function caculateIndex() {
        var len = getSharedLinksLen(this.nodeA, this.nodeZ);
        len && (this.nodeIndex = len - 1);
      }
    }, {
      key: "removeHandler",
      value: function removeHandler() {
        var self = this;

        if (self.nodeA && self.nodeA.outLinks) {
          self.nodeA.outLinks = self.nodeA.outLinks.filter(function (outLink) {
            return outLink !== self;
          });
        }

        if (self.nodeZ && self.nodeZ.inLinks) {
          self.nodeZ.inLinks = self.nodeZ.inLinks.filter(function (inLink) {
            return inLink !== self;
          });
        }

        var unsharedLinksArr = unsharedLinks(self);
        unsharedLinksArr.forEach(function (unsharedLink, index) {
          unsharedLink.nodeIndex = index;
        });
      }
    }, {
      key: "getStartPosition",
      value: function getStartPosition() {
        return {
          x: this.nodeA.cx,
          y: this.nodeA.cy
        };
      }
    }, {
      key: "getEndPosition",
      value: function getEndPosition() {
        var point;
        this.arrowsRadius && (point = getIntersectionPointObj(this.nodeZ, this.nodeA));
        !point && (point = {
          x: this.nodeZ.cx,
          y: this.nodeZ.cy
        });
        return point;
      }
    }, {
      key: "getPath",
      value: function getPath() {
        var pathArr = [];
        var startPos = this.getStartPosition();
        var endPos = this.getEndPosition();
        var len = getSharedLinksLen(this.nodeA, this.nodeZ);
        if (this.nodeA === this.nodeZ) return [startPos, endPos];
        if (1 === len) return [startPos, endPos];
        var f = Math.atan2(endPos.y - startPos.y, endPos.x - startPos.x),
            g = {
          x: startPos.x + this.bundleOffset * Math.cos(f),
          y: startPos.y + this.bundleOffset * Math.sin(f)
        },
            h = {
          x: endPos.x + this.bundleOffset * Math.cos(f - Math.PI),
          y: endPos.y + this.bundleOffset * Math.sin(f - Math.PI)
        },
            i = f - Math.PI / 2,
            j = f - Math.PI / 2,
            k = len * this.bundleGap / 2 - this.bundleGap / 2,
            l = this.bundleGap * this.nodeIndex,
            m = {
          x: g.x + l * Math.cos(i),
          y: g.y + l * Math.sin(i)
        },
            n = {
          x: h.x + l * Math.cos(j),
          y: h.y + l * Math.sin(j)
        };
        m = {
          x: m.x + k * Math.cos(i - Math.PI),
          y: m.y + k * Math.sin(i - Math.PI)
        };
        n = {
          x: n.x + k * Math.cos(j - Math.PI),
          y: n.y + k * Math.sin(j - Math.PI)
        };
        pathArr.push({
          x: startPos.x,
          y: startPos.y
        });
        pathArr.push({
          x: m.x,
          y: m.y
        });
        pathArr.push({
          x: n.x,
          y: n.y
        });
        pathArr.push({
          x: endPos.x,
          y: endPos.y
        });
        return pathArr;
      }
    }, {
      key: "paintPath",
      value: function paintPath(ctx, pathArr) {
        if (this.nodeA === this.nodeZ) return void this.paintLoop(ctx);
        ctx.beginPath();
        ctx.moveTo(pathArr[0].x, pathArr[0].y);

        for (var i = 1, len = pathArr.length; i < len; i++) {
          this.dashedPattern ? ctx.PTopoDashedLineTo(pathArr[i - 1].x, pathArr[i - 1].y, pathArr[i].x, pathArr[i].y, this.dashedPattern) : ctx.lineTo(pathArr[i].x, pathArr[i].y);
        }

        ctx.stroke();
        ctx.closePath();

        if (this.arrowsRadius) {
          var d = pathArr[pathArr.length - 2];
          var e = pathArr[pathArr.length - 1];
          this.paintArrow(ctx, d, e);
        }
      }
    }, {
      key: "paintLoop",
      value: function paintLoop(ctx) {
        ctx.beginPath();
        var b = this.bundleGap * (this.nodeIndex + 1) / 2;
        ctx.arc(this.nodeA.x, this.nodeA.y, b, Math.PI / 2, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
      }
    }, {
      key: "paintArrow",
      value: function paintArrow(ctx, p1, p2) {
        var e = this.arrowsOffset;
        var f = this.arrowsRadius / 2;
        var i = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        var j = getDistance(p1, p2) - this.arrowsRadius;
        var k = p1.x + (j + e) * Math.cos(i);
        var l = p1.y + (j + e) * Math.sin(i);
        var x = p2.x + e * Math.cos(i);
        var y = p2.y + e * Math.sin(i);
        i -= Math.PI / 2;
        var o = {
          x: k + f * Math.cos(i),
          y: l + f * Math.sin(i)
        };
        var p = {
          x: k + f * Math.cos(i - Math.PI),
          y: l + f * Math.sin(i - Math.PI)
        };
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + this.strokeColor + "," + this.alpha + ")";
        ctx.moveTo(o.x, o.y);
        ctx.lineTo(x, y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.closePath();
      }
    }, {
      key: "paint",
      value: function paint(ctx) {
        if (this.nodeA && this.nodeZ) {
          var path = this.getPath(this.nodeIndex);
          this.path = path;
          ctx.strokeStyle = "rgba(" + this.strokeColor + "," + this.alpha + ")";
          ctx.lineWidth = this.lineWidth;
          this.paintPath(ctx, path);
          path && path.length > 0 && this.paintText(ctx, path);
        }
      }
    }, {
      key: "paintText",
      value: function paintText(ctx, path) {
        var c = path[0];
        var d = path[path.length - 1];

        if (4 === path.length) {
          c = path[1];
          d = path[2];
        }

        if (this.text && this.text.length) {
          var e = (d.x + c.x) / 2 + this.textOffsetX,
              f = (d.y + c.y) / 2 + this.textOffsetY;
          ctx.save();
          ctx.beginPath();
          ctx.font = this.font;
          var g = ctx.measureText(this.text).width;
          var h = ctx.measureText("田").width;
          ctx.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";

          if (this.nodeA === this.nodeZ) {
            var i = -(Math.PI / 2 + Math.PI / 4);

            var j = this.bundleGap * (this.nodeIndex + 1) / 2,
                _e = this.nodeA.x + j * Math.cos(i),
                _f = this.nodeA.y + j * Math.sin(i);

            ctx.fillText(this.text, _e, _f);
          } else {
            ctx.fillText(this.text, e - g / 2, f - h / 2);
          }

          ctx.stroke();
          ctx.closePath();
          ctx.restore();
        }
      }
    }, {
      key: "paintSelected",
      value: function paintSelected(ctx) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(0,0,0,1)";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }
    }, {
      key: "isInBound",
      value: function isInBound(x, y) {
        if (this.nodeA === this.nodeZ) {
          var d = this.bundleGap * (this.nodeIndex + 1) / 2;
          var lineLength = getDistance(this.nodeA, {
            x: x,
            y: y
          }) - d;
          return Math.abs(lineLength) <= 3;
        }

        var sign = false;

        for (var i = 1; i < this.path.length; i++) {
          var p1 = this.path[i - 1];
          var p2 = this.path[i];

          if (isPointInLine({
            x: x,
            y: y
          }, p1, p2)) {
            sign = true;
            break;
          }
        }

        return sign;
      }
    }]);

    return Link;
  }(InteractiveElement);

  var CurveLink =
  /*#__PURE__*/
  function (_Link) {
    _inherits(CurveLink, _Link);

    function CurveLink(nodeA, nodeZ, text) {
      _classCallCheck(this, CurveLink);

      return _possibleConstructorReturn(this, _getPrototypeOf(CurveLink).call(this, nodeA, nodeZ, text));
    }

    _createClass(CurveLink, [{
      key: "paintPath",
      value: function paintPath(ctx, pathArr) {
        if (this.nodeA === this.nodeZ) return void this.paintLoop(ctx);
        ctx.beginPath();
        ctx.moveTo(pathArr[0].x, pathArr[0].y);

        for (var i = 1; i < pathArr.length; i++) {
          var p1 = pathArr[i - 1];
          var p2 = pathArr[i];
          var cpx = (p1.x + p2.x) / 2;
          var cpy = (p1.y + p2.y) / 2;
          cpy += (p2.y - p1.y) / 2;
          ctx.strokeStyle = "rgba(" + this.strokeColor + "," + this.alpha + ")";
          ctx.lineWidth = this.lineWidth;
          ctx.moveTo(p1.x, p1.cy);
          ctx.quadraticCurveTo(cpx, cpy, p2.x, p2.y);
          ctx.stroke();
        }

        ctx.stroke();
        ctx.closePath();

        if (this.arrowsRadius) {
          var _p = pathArr[pathArr.length - 2];
          var _p2 = pathArr[pathArr.length - 1];
          this.paintArrow(ctx, _p, _p2);
        }
      }
    }]);

    return CurveLink;
  }(Link);

  var FlexionalLink =
  /*#__PURE__*/
  function (_Link) {
    _inherits(FlexionalLink, _Link);

    function FlexionalLink(nodeA, nodeZ, text) {
      var _this;

      _classCallCheck(this, FlexionalLink);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(FlexionalLink).call(this, nodeA, nodeZ, text));
      _this.direction = "vertical";
      _this.offsetGap = 44;
      return _this;
    }

    _createClass(FlexionalLink, [{
      key: "getStartPosition",
      value: function getStartPosition() {
        var startPos = {
          x: this.nodeA.cx,
          y: this.nodeA.cy
        };

        if ("horizontal" === this.direction) {
          startPos.x = this.nodeZ.cx < startPos.x ? this.nodeA.x : this.nodeA.x + this.nodeA.width;
        } else {
          startPos.y = this.nodeZ.cy < startPos.y ? this.nodeA.y : this.nodeA.y + this.nodeA.height;
        }

        return startPos;
      }
    }, {
      key: "getEndPosition",
      value: function getEndPosition() {
        var endPos = {
          x: this.nodeZ.cx,
          y: this.nodeZ.cy
        };

        if ("horizontal" === this.direction) {
          endPos.x = this.nodeA.cx < endPos.x ? this.nodeZ.x : this.nodeZ.x + this.nodeZ.width;
        } else {
          endPos.y = this.nodeA.cy < endPos.y ? this.nodeZ.y : this.nodeZ.y + this.nodeZ.height;
        }

        return endPos;
      }
    }, {
      key: "getPath",
      value: function getPath(a) {
        var startPos = this.getStartPosition();
        var endPos = this.getEndPosition();
        if (this.nodeA === this.nodeZ) return [startPos, endPos];
        var pathObj = [];
        var length = getSharedLinksLen(this.nodeA, this.nodeZ);
        var g = (length - 1) * this.bundleGap;
        var h = this.bundleGap * a - g / 2;
        var i = this.offsetGap;

        if ("horizontal" === this.direction) {
          this.nodeA.cx > this.nodeZ.cx && (i = -i);
          pathObj.push({
            x: startPos.x,
            y: startPos.y + h
          });
          pathObj.push({
            x: startPos.x + i,
            y: startPos.y + h
          });
          pathObj.push({
            x: endPos.x - i,
            y: endPos.y + h
          });
          pathObj.push({
            x: endPos.x,
            y: endPos.y + h
          });
        } else {
          this.nodeA.cy > this.nodeZ.cy && (i = -i);
          pathObj.push({
            x: startPos.x + h,
            y: startPos.y
          });
          pathObj.push({
            x: startPos.x + h,
            y: startPos.y + i
          });
          pathObj.push({
            x: endPos.x + h,
            y: endPos.y - i
          });
          pathObj.push({
            x: endPos.x + h,
            y: endPos.y
          });
        }

        return pathObj;
      }
    }]);

    return FlexionalLink;
  }(Link);

  var FoldLink =
  /*#__PURE__*/
  function (_Link) {
    _inherits(FoldLink, _Link);

    function FoldLink(nodeA, nodeZ, text) {
      var _this;

      _classCallCheck(this, FoldLink);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(FoldLink).call(this, nodeA, nodeZ, text));
      _this.direction = "horizontal";
      return _this;
    }

    _createClass(FoldLink, [{
      key: "getStartPosition",
      value: function getStartPosition() {
        var startPos = {
          x: this.nodeA.cx,
          y: this.nodeA.cy
        };

        if ("horizontal" === this.direction) {
          this.nodeZ.cx > startPos.x ? startPos.x += this.nodeA.width / 2 : startPos.x -= this.nodeA.width / 2;
        } else {
          this.nodeZ.cy > startPos.y ? startPos.y += this.nodeA.height / 2 : startPos.y -= this.nodeA.height / 2;
        }

        return startPos;
      }
    }, {
      key: "getEndPosition",
      value: function getEndPosition() {
        var endPos = {
          x: this.nodeZ.cx,
          y: this.nodeZ.cy
        };

        if ("horizontal" === this.direction) {
          this.nodeA.cy < endPos.y ? endPos.y -= this.nodeZ.height / 2 : endPos.y += this.nodeZ.height / 2;
        } else {
          endPos.x = this.nodeA.cx < endPos.x ? this.nodeZ.x : this.nodeZ.x + this.nodeZ.width;
        }

        return endPos;
      }
    }, {
      key: "getPath",
      value: function getPath(a) {
        var pathObj = [];
        var startPos = this.getStartPosition();
        var endPos = this.getEndPosition();
        if (this.nodeA === this.nodeZ) return [startPos, endPos];
        var f;
        var g;
        var length = getSharedLinksLen(this.nodeA, this.nodeZ);
        var i = (length - 1) * this.bundleGap;
        var j = this.bundleGap * a - i / 2;

        if ("horizontal" === this.direction) {
          f = endPos.x + j;
          g = startPos.y - j;
          pathObj.push({
            x: startPos.x,
            y: g
          });
          pathObj.push({
            x: f,
            y: g
          });
          pathObj.push({
            x: f,
            y: endPos.y
          });
        } else {
          f = startPos.x + j;
          g = endPos.y - j;
          pathObj.push({
            x: f,
            y: startPos.y
          });
          pathObj.push({
            x: f,
            y: g
          });
          pathObj.push({
            x: endPos.x,
            y: g
          });
        }

        return pathObj;
      }
    }, {
      key: "paintText",
      value: function paintText(ctx, b) {
        if (this.text && this.text.length) {
          var c = b[1];
          var d = c.x + this.textOffsetX;
          var e = c.y + this.textOffsetY;
          ctx.save();
          ctx.beginPath();
          ctx.font = this.font;
          var textW = ctx.measureText(this.text).width;
          var cnW = ctx.measureText("田").width;
          ctx.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
          ctx.fillText(this.text, d - textW / 2, e - cnW / 2);
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
        }
      }
    }]);

    return FoldLink;
  }(Link);



  var Link$1 = /*#__PURE__*/Object.freeze({
    Link: Link,
    CurveLink: CurveLink,
    FlexionalLink: FlexionalLink,
    FoldLink: FoldLink
  });

  var canvas$1 = document.createElement('canvas');
  var flag = {
    canvas: canvas$1,
    graphics: canvas$1.getContext('2d'),
    clearAllAnimateT: false,
    curScene: null,
    linkConfigure: {
      textIsTilt: false,
      textIsNearToNodeZ: false
    },
    nodeConfigure: {
      hoverBg: "rgba(168, 202, 255, 0.5)"
    },
    alarmImageCache: {},
    topoImgMap: null
  };

  function changeColor(ctx, imgEle, tarR, tarG, tarB, oriR, oriG, oriB) {
    var cW = flag.canvas.width = imgEle.width;
    var cH = flag.canvas.height = imgEle.height;
    ctx.clearRect(0, 0, cW, cH);
    ctx.drawImage(imgEle, 0, 0);
    var imgData = ctx.getImageData(0, 0, cW, cH);
    var imgInnerData = imgData.data;

    for (var i = 0; i < cW; i++) {
      for (var j = 0; j < cH; j++) {
        var n = 4 * (i + j * cW);

        if ((oriR || oriG || oriB) && imgInnerData[n] === oriR && imgInnerData[n + 1] === oriG && imgInnerData[n + 2] === oriB) {
          imgInnerData[n] = tarR;
          imgInnerData[n + 1] = tarG;
          imgInnerData[n + 2] = tarB;
        }
      }

      ctx.putImageData(imgData, 0, 0, 0, 0, imgEle.width, imgEle.height);
    }

    var url = flag.canvas.toDataURL();

    if (oriR !== undefined || oriG !== undefined || oriB !== undefined) {
      flag.alarmImageCache[imgEle.src + 'tag' + tarR + tarG + tarB] = url;
    }

    return url;
  }

  function getImageAlarm(imgEle, b) {
    !b && (b = 255);

    try {
      if (alarmImageCache[imgEle.src]) return alarmImageCache[imgEle.src];
      var image = new Image();
      image.src = changeColor(flag.graphics, imgEle, b);
      alarmImageCache[imgEle.src] = image;
      return image;
    } catch (e) {}

    return null;
  }

  var imageCache = {};

  var _Node =
  /*#__PURE__*/
  function (_EditableElement) {
    _inherits(_Node, _EditableElement);

    function _Node(text) {
      var _this;

      _classCallCheck(this, _Node);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_Node).call(this, text));
      _this.elementType = 'node';
      _this.zIndex = zIndex_Node;
      _this.text = text;
      _this.textPosition = 'Bottom_Center';
      _this.textOffsetX = 0;
      _this.textOffsetY = 0;
      _this.font = '20px Consolas';
      _this.fontColor = '255,255,255';
      _this.borderWidth = 0;
      _this.borderColor = '255,255,255';
      _this.borderRadius = null;
      _this.dragable = true;
      _this.transformAble = true;
      _this.inLinks = null;
      _this.outLinks = null;
      var keyArr = "text,font,fontColor,textPosition,textOffsetX,textOffsetY,borderRadius".split(",");
      _this.serializedProperties = _this.serializedProperties.concat(keyArr);
      return _this;
    }

    _createClass(_Node, [{
      key: "paint",
      value: function paint(ctx) {
        if (this.image) {
          var globalAlpha = ctx.globalAlpha;
          ctx.globalAlpha = this.alpha;

          if (this.image.alarm && this.alarm) {
            ctx.drawImage(this.image.alarm, -this.width / 2, -this.height / 2, this.width, this.height);
          } else {
            ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
          }

          ctx.globalAlpha = globalAlpha;
        } else {
          ctx.beginPath();
          ctx.fillStyle = "rgba(" + this.fillColor + "," + this.alpha + ")";
          !this.borderRadius ? ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height) : ctx.PTopoRoundRect(-this.width / 2, -this.height / 2, this.width, this.height, this.borderRadius);
          ctx.fill();
          ctx.closePath();
        }

        this.paintText(ctx);
        this.paintBorder(ctx);
        this.paintCtrl(ctx);
        this.paintAlarmText(ctx);
      }
    }, {
      key: "paintText",
      value: function paintText(ctx) {
        var text = this.text;

        if (text) {
          ctx.beginPath();
          ctx.font = this.font;
          var textW = ctx.measureText(text).width;
          var defaultTextW = ctx.measureText("田").width;
          ctx.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
          var textPosObj = this.getTextPostion(this.textPosition, textW, defaultTextW);
          ctx.fillText(text, textPosObj.x, textPosObj.y);
          ctx.closePath();
        }
      }
    }, {
      key: "paintBorder",
      value: function paintBorder(ctx) {
        if (this.borderWidth) {
          ctx.beginPath();
          ctx.lineWidth = this.borderWidth;
          ctx.strokeStyle = "rgba(" + this.borderColor + "," + this.alpha + ")";
          var halfBW = this.borderWidth / 2;

          if (!this.borderRadius) {
            ctx.rect(-this.width / 2 - halfBW, -this.height / 2 - halfBW, this.width + this.borderWidth, this.height + this.borderWidth);
          } else {
            ctx.PTopoRoundRect(-this.width / 2 - halfBW, -this.height / 2 - halfBW, this.width + this.borderWidth, this.height + this.borderWidth, this.borderRadius);
          }

          ctx.stroke();
          ctx.closePath();
        }
      }
    }, {
      key: "paintAlarmText",
      value: function paintAlarmText(ctx) {
        if (this.alarm) {
          var alarmColor = this.alarmColor || '255,0,0';
          var alarmAlpha = this.alarmAlpha || .5;
          var alarmTextW = ctx.measureText(this.alarm).width + 6;
          var defaultTextW = ctx.measureText("田").width + 6;
          var x = this.width / 2 - alarmTextW / 2;
          var y = -this.height / 2 - defaultTextW - 8;
          ctx.beginPath();
          ctx.font = this.alarmFont || "10px 'Microsoft Yahei'";
          ctx.strokeStyle = "rgba(" + alarmColor + ", " + alarmAlpha + ")";
          ctx.fillStyle = "rgba(" + alarmColor + ", " + alarmAlpha + ")";
          ctx.lineCap = "round";
          ctx.lineWidth = 1;
          ctx.moveTo(x, y);
          ctx.lineTo(x + alarmTextW, y);
          ctx.lineTo(x + alarmTextW, y + defaultTextW);
          ctx.lineTo(x + alarmTextW / 2 + 6, y + defaultTextW);
          ctx.lineTo(x + alarmTextW / 2, y + defaultTextW + 8);
          ctx.lineTo(x + alarmTextW / 2 - 6, y + defaultTextW);
          ctx.lineTo(x, y + defaultTextW);
          ctx.lineTo(x, y);
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
          ctx.beginPath();
          ctx.strokeStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
          ctx.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
          ctx.fillText(this.alarm, x + 2, y + defaultTextW - 4);
          ctx.closePath();
        }
      }
    }, {
      key: "getTextPostion",
      value: function getTextPostion(posDesc, w, h) {
        var textPosObj = null;

        if (posDesc) {
          switch (posDesc) {
            case 'Top_Left':
              textPosObj = {
                x: -this.width / 2 - w,
                y: -this.height / 2 - h / 2
              };
              break;

            case 'Top_Center':
              textPosObj = {
                x: -this.width / 2 + (this.width - w) / 2,
                y: -this.height / 2 - h / 2
              };
              break;

            case 'Top_Right':
              textPosObj = {
                x: this.width / 2,
                y: -this.height / 2 - h / 2
              };
              break;

            case 'Middle_Left':
              textPosObj = {
                x: -this.width / 2 - w,
                y: h / 2
              };
              break;

            case 'Middle_Center':
              textPosObj = {
                x: -this.width / 2 + (this.width - w) / 2,
                y: h / 2
              };
              break;

            case 'Middle_Right':
              textPosObj = {
                x: this.width / 2,
                y: h / 2
              };
              break;

            case 'Bottom_Left':
              textPosObj = {
                x: -this.width / 2 - w,
                y: this.height / 2 + h
              };
              break;

            case 'Bottom_Center':
              textPosObj = {
                x: -this.width / 2 + (this.width - w) / 2,
                y: this.height / 2 + h
              };
              break;

            case 'Bottom_Right':
              textPosObj = {
                x: this.width / 2,
                y: this.height / 2 + h
              };
              break;
          }
        }

        this.textOffsetX && (textPosObj.x += this.textOffsetX);
        this.textOffsetY && (textPosObj.y += this.textOffsetY);
        return textPosObj;
      }
    }, {
      key: "setImage",
      value: function setImage(img, c) {
        if (!img) {
          throw new Error("Node.setImage(): 参数Image对象为空!");
        }

        var self = this;

        if ("string" === typeof img) {
          var image = imageCache[img];

          if (!image) {
            image = new Image();
            image.src = img;

            image.onload = function () {
              imageCache[img] = image;
              1 == c && self.setSize(image.width, image.height);
              var alarm = getImageAlarm(image);
              alarm && (image.alarm = alarm);
              self.image = image;
            };
          } else {
            c && this.setSize(image.width, image.height);
            this.image = image;
          }
        } else {
          this.image = img;
          1 == c && this.setSize(img.width, img.height);
        }
      }
    }, {
      key: "removeHandler",
      value: function removeHandler(node) {
        var self = this;

        if (this.outLinks) {
          this.outLinks.forEach(function (outLink) {
            outLink.nodeA === self && node.remove(outLink);
          });
          this.outLinks = null;
        }

        if (this.inLinks) {
          this.inLinks.forEach(function (inLink) {
            inLink.nodeZ === self && node.remove(inLink);
          });
          this.inLinks = null;
        }
      }
    }]);

    return _Node;
  }(EditableElement);

  var Node =
  /*#__PURE__*/
  function (_Node2) {
    _inherits(Node, _Node2);

    function Node(args) {
      _classCallCheck(this, Node);

      return _possibleConstructorReturn(this, _getPrototypeOf(Node).call(this, args));
    }

    return Node;
  }(_Node);

  var TextNode =
  /*#__PURE__*/
  function (_Node) {
    _inherits(TextNode, _Node);

    function TextNode(text) {
      var _this;

      _classCallCheck(this, TextNode);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(TextNode).call(this));
      _this.text = text;
      _this.elementType = "TextNode";
      return _this;
    }

    _createClass(TextNode, [{
      key: "paint",
      value: function paint(ctx) {
        ctx.beginPath();
        ctx.font = this.font;
        this.width = ctx.measureText(this.text).width;
        this.height = ctx.measureText("田").width;
        ctx.strokeStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
        ctx.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
        ctx.fillText(this.text, -this.width / 2, this.height / 2);
        ctx.closePath();
        this.paintBorder(ctx);
        this.paintCtrl(ctx);
      }
    }]);

    return TextNode;
  }(Node);

  var LinkNode =
  /*#__PURE__*/
  function (_TextNode) {
    _inherits(LinkNode, _TextNode);

    function LinkNode(text, href, target) {
      var _this;

      _classCallCheck(this, LinkNode);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(LinkNode).call(this));
      _this.text = text;
      _this.href = href;
      _this.target = target;
      _this.elementType = "LinkNode";
      _this.isVisited = false;
      _this.visitedColor = null;

      _this.mousemove(function () {
        var oCanvasArr = document.getElementsByTagName("canvas");

        if (oCanvasArr && oCanvasArr.length) {
          for (var i = 0; i < oCanvasArr.length; i++) {
            oCanvasArr[i].style.cursor = "pointer";
          }
        }
      });

      _this.mouseout(function () {
        var oCanvasArr = document.getElementsByTagName("canvas");

        if (oCanvasArr && oCanvasArr.length) {
          for (var i = 0; i < oCanvasArr.length; i++) {
            oCanvasArr[i].style.cursor = "default";
          }
        }
      });

      _this.click(function () {
        if (!this.isStopLinkNodeClick) {
          "_blank" === this.target ? window.open(this.href) : location = this.href;
          this.isVisited = true;
        }
      });

      return _this;
    }

    _createClass(LinkNode, [{
      key: "paint",
      value: function paint(ctx) {
        ctx.beginPath();
        ctx.font = this.font;
        this.width = ctx.measureText(this.text).width;
        this.height = ctx.measureText("田").width;

        if (this.isVisited && this.visitedColor) {
          ctx.strokeStyle = "rgba(" + this.visitedColor + ", " + this.alpha + ")";
          ctx.fillStyle = "rgba(" + this.visitedColor + ", " + this.alpha + ")";
        } else {
          ctx.strokeStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
          ctx.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
        }

        ctx.fillText(this.text, -this.width / 2, this.height / 2);

        if (this.isMouseOver) {
          ctx.moveTo(-this.width / 2, this.height);
          ctx.lineTo(this.width / 2, this.height);
          ctx.stroke();
        }

        ctx.closePath();
        this.paintBorder(ctx);
        this.paintCtrl(ctx);
      }
    }]);

    return LinkNode;
  }(TextNode);

  var BarChartNode =
  /*#__PURE__*/
  function (_Node) {
    _inherits(BarChartNode, _Node);

    function BarChartNode() {
      var _this;

      _classCallCheck(this, BarChartNode);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(BarChartNode).call(this));
      _this.showSelected = false;
      _this.width = 250;
      _this.height = 180;
      _this.colors = ["#3666B0", "#2CA8E0", "#77D1F6"];
      _this.datas = [.3, .3, .4];
      _this.titles = ["A", "B", "C"];
      return _this;
    }

    _createClass(BarChartNode, [{
      key: "paint",
      value: function paint(ctx) {
        var c = 3;
        var w = (this.width - c) / this.datas.length;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#FFFFFF";
        ctx.moveTo(-this.width / 2 - 1, -this.height / 2);
        ctx.lineTo(-this.width / 2 - 1, this.height / 2 + 3);
        ctx.lineTo(this.width / 2 + c + 1, this.height / 2 + 3);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        for (var i = 0; i < this.datas.length; i++) {
          ctx.save();
          ctx.beginPath();
          ctx.fillStyle = this.colors[i];
          var h = this.datas[i];
          var x = i * (w + c) - this.width / 2;
          var y = this.height - h - this.height / 2;
          ctx.fillRect(x, y, w, h);
          var text = "" + parseInt(this.datas[i]);
          var numTextWidth = ctx.measureText(text).width;
          var cnTextWidth = ctx.measureText("田").width;
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(text, x + (w - numTextWidth) / 2, y - cnTextWidth);
          ctx.fillText(this.titles[i], x + (w - numTextWidth) / 2, this.height / 2 + cnTextWidth);
          ctx.fill();
          ctx.closePath();
          ctx.restore();
        }
      }
    }]);

    return BarChartNode;
  }(Node);

  var CircleNode$1 =
  /*#__PURE__*/
  function (_Node) {
    _inherits(CircleNode, _Node);

    function CircleNode(text) {
      var _this;

      _classCallCheck(this, CircleNode);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(CircleNode).call(this, text));
      _this.text = text;
      _this._radius = 20;
      _this.beginDegree = 0;
      _this.endDegree = 2 * Math.PI;
      return _this;
    }

    _createClass(CircleNode, [{
      key: "paint",
      value: function paint(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + this.fillColor + "," + this.alpha + ")";
        ctx.arc(0, 0, this.radius, this.beginDegree, this.endDegree, true);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
        this.paintText(ctx);
        this.paintBorder(ctx);
        this.paintCtrl(ctx);
        this.paintAlarmText(ctx);
      }
    }, {
      key: "paintSelected",
      value: function paintSelected(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "rgba(168, 202, 255, 0.9)";
        ctx.fillStyle = "rgba(168, 202, 236, 0.7)";
        ctx.arc(0, 0, this.radius + 3, this.beginDegree, this.endDegree, true);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
    }, {
      key: "radius",
      get: function get() {
        return this._radius;
      },
      set: function set(r) {
        this._radius = r;
        this.width = 2 * this.radius;
        this.height = 2 * this.radius;
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(w) {
        this._radius = w / 2;
        this._width = w;
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(h) {
        this._radius = h / 2;
        this._height = h;
      }
    }]);

    return CircleNode;
  }(Node);

  var PieChartNode =
  /*#__PURE__*/
  function (_CircleNode) {
    _inherits(PieChartNode, _CircleNode);

    function PieChartNode() {
      var _this;

      _classCallCheck(this, PieChartNode);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(PieChartNode).call(this));
      _this.radius = 150;
      _this.colors = ["#3666B0", "#2CA8E0", "#77D1F6"];
      _this.datas = [.3, .3, .4];
      _this.titles = ["A", "B", "C"];
      return _this;
    }

    _createClass(PieChartNode, [{
      key: "paint",
      value: function paint(ctx) {
        this.width = 2 * this.radius;
        this.height = 2 * this.radius;
        var startAngle = 0;

        for (var i = 0; i < this.datas.length; i++) {
          var g = this.datas[i] * Math.PI * 2;
          ctx.save();
          ctx.beginPath();
          ctx.fillStyle = this.colors[i];
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, this.radius, startAngle, startAngle + g, false);
          ctx.fill();
          ctx.closePath();
          ctx.restore();
          ctx.beginPath();
          ctx.font = this.font;
          var text = this.titles[i] + ": " + (100 * this.datas[i]).toFixed(2) + "%";
          var numTextWidth = ctx.measureText(text).width;
          var j = (startAngle + startAngle + g) / 2;
          var k = this.radius * Math.cos(j);
          var l = this.radius * Math.sin(j);
          j > Math.PI / 2 && j <= Math.PI ? k -= numTextWidth : j > Math.PI && j < 2 * Math.PI * 3 / 4 ? k -= numTextWidth : j > 2 * Math.PI * .75;
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(text, k, l);
          ctx.moveTo(this.radius * Math.cos(j), this.radius * Math.sin(j));
          j > Math.PI / 2 && j < 2 * Math.PI * 3 / 4 && (k -= numTextWidth);
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
          startAngle += g;
        }
      }
    }]);

    return PieChartNode;
  }(CircleNode$1);

  function _Animate1_Node(frameImages, interv, c) {
    this.frameImages = frameImages || [];
    this.frameIndex = 0;
    this.isStop = true;
    var interval = interv || 1e3;
    this.repeatPlay = false;
    var self = this;

    this.nextFrame = function () {
      if (!self.isStop && self.frameImages) {
        self.frameIndex++;

        if (self.frameIndex >= self.frameImages.length) {
          if (!self.repeatPlay) return;
          self.frameIndex = 0;
        }

        self.setImage(self.frameImages[self.frameIndex], c);
        setTimeout(self.nextFrame, interval / frameImages.length);
      }
    };
  }

  _Animate1_Node.prototype = new Node();

  function _Animate2_Node(image, row, col, interv, rOffset) {
    this.setImage(image);
    this.frameIndex = 0;
    this.isPause = true;
    this.repeatPlay = false;
    var interval = interv || 1e3;
    var rowOffset = rOffset || 0;
    var self = this;

    this.paint = function (ctx) {
      if (self.image) {
        var w = self.width;
        var h = self.height;
        var dstX = Math.floor(self.frameIndex % col) * w;
        var dstY = (Math.floor(self.frameIndex / col) + rowOffset) * h;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + self.fillColor + "," + self.alpha + ")";
        ctx.drawImage(self.image, dstX, dstY, w, h, -w / 2, -h / 2, w, h);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
        self.paintText(ctx);
        self.paintBorder(ctx);
        self.paintCtrl(ctx);
      }
    };

    this.nextFrame = function () {
      if (!self.isStop) {
        self.frameIndex++;

        if (self.frameIndex >= row * col) {
          if (!self.repeatPlay) return;
          self.frameIndex = 0;
        }

        setTimeout(function () {
          self.isStop || self.nextFrame();
        }, interval / (row * col));
      }
    };
  }

  _Animate2_Node.prototype = new Node();

  var AnimateNode =
  /*#__PURE__*/
  function (_Node) {
    _inherits(AnimateNode, _Node);

    function AnimateNode() {
      var _this;

      _classCallCheck(this, AnimateNode);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AnimateNode).call(this));
      var animNode = arguments.length <= 3 ? new _Animate1_Node(arguments[0], arguments[1], arguments[2]) : new _Animate2_Node(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);

      animNode.stop = function () {
        animNode.isStop = true;
      };

      animNode.play = function () {
        animNode.isStop = false;
        animNode.frameIndex = 0;
        animNode.nextFrame();
      };

      return _possibleConstructorReturn(_this, animNode);
    }

    return AnimateNode;
  }(Node);



  var Node$1 = /*#__PURE__*/Object.freeze({
    Node: Node,
    LinkNode: LinkNode,
    TextNode: TextNode,
    BarChartNode: BarChartNode,
    CircleNode: CircleNode$1,
    PieChartNode: PieChartNode,
    AnimateNode: AnimateNode
  });

  function getElementsBound(eleArr) {
    var ebObj = {
      left: Number.MAX_VALUE,
      right: Number.MIN_VALUE,
      top: Number.MAX_VALUE,
      bottom: Number.MIN_VALUE
    };

    for (var i = 0; i < eleArr.length; i++) {
      var node = eleArr[i];

      if (!(node instanceof Link)) {
        if (ebObj.left > node.x) {
          ebObj.left = node.x;
          ebObj.leftNode = node;
        }

        if (ebObj.right < node.x + node.width) {
          ebObj.right = node.x + node.width;
          ebObj.rightNode = node;
        }

        if (ebObj.top > node.y) {
          ebObj.top = node.y;
          ebObj.topNode = node;
        }

        if (ebObj.bottom < node.y + node.height) {
          ebObj.bottom = node.y + node.height;
          ebObj.bottomNode = node;
        }
      }
    }

    ebObj.width = ebObj.right - ebObj.left;
    ebObj.height = ebObj.bottom - ebObj.top;
    return ebObj;
  }

  function bbb(fn, interval) {
    var timer;
    var eventEmitter = null;
    return {
      stop: function stop() {
        if (timer) {
          clearInterval(timer);
          eventEmitter && eventEmitter.publish("stop");
        }

        return this;
      },
      start: function start() {
        var self = this;
        timer = setInterval(function () {
          fn.call(self);
        }, interval);
        return this;
      },
      onStop: function onStop(fn) {
        !eventEmitter && (eventEmitter = new EventEmitter());
        eventEmitter.subscribe("stop", fn);
        return this;
      }
    };
  }

  var isStopAll = false;

  var Animate =
  /*#__PURE__*/
  function () {
    function Animate() {
      _classCallCheck(this, Animate);
    }

    _createClass(Animate, [{
      key: "stepByStep",
      value: function stepByStep(node, attrs, time, isNeedCycle, isNeedReverseCycle) {
        var interval = 1000 / 24;
        var h = {};

        for (var attr in attrs) {
          var val = attrs[attr];
          var distance = val - node[attr];
          h[attr] = {
            oldValue: node[attr],
            targetValue: val,
            step: distance / time * interval,
            isDone: function isDone(attr) {
              if (this.step > 0) {
                return node[attr] >= this.targetValue;
              } else if (this.step < 0) {
                return node[attr] <= this.targetValue;
              }
            }
          };
        }

        return new bbb(function () {
          var b = true;

          for (var _attr in attrs) {
            if (!h[_attr].isDone(_attr)) {
              node[_attr] += h[_attr].step;
              b = false;
            }
          }

          if (b) {
            if (!isNeedCycle) return this.stop();

            for (var _attr2 in attrs) {
              if (isNeedReverseCycle) {
                var g = h[_attr2].targetValue;
                h[_attr2].targetValue = h[_attr2].oldValue;
                h[_attr2].oldValue = g;
                h[_attr2].step = -h[_attr2].step;
              } else {
                node[_attr2] = h[_attr2].oldValue;
              }
            }
          }

          return this;
        }, interval);
      }
    }, {
      key: "rotate",
      value: function rotate(a, b) {
        var timer = null;
        var obj = {};
        var v = b.v;

        obj.run = function () {
          timer = setInterval(function () {
            if (isStopAll) {
              return void obj.stop();
            } else {
              a.rotate += v || .2;
              return void a.rotate > 2 * Math.PI && (a.rotate = 0);
            }
          }, 100);
          return obj;
        };

        obj.stop = function () {
          clearInterval(timer);
          obj.onStop && obj.onStop(a);
          return obj;
        };

        obj.onStop = function (cb) {
          obj.onStop = cb;
          return obj;
        };

        return obj;
      }
    }, {
      key: "scale",
      value: function scale(a, b) {
        var scale = b.scale || 1,
            f = .06,
            scaleX = a.scaleX,
            scaleY = a.scaleY,
            obj = {},
            timer = null;

        obj.onStop = function (cb) {
          obj.onStop = cb;
          return obj;
        };

        obj.run = function () {
          timer = setInterval(function () {
            a.scaleX += f;
            a.scaleY += f;
            a.scaleX >= scale && obj.stop();
          }, 100);
          return obj;
        };

        obj.stop = function () {
          obj.onStop && obj.onStop(a);
          a.scaleX = scaleX;
          a.scaleY = scaleY;
          clearInterval(timer);
        };

        return obj;
      }
    }, {
      key: "move",
      value: function move(a, b) {
        var position = b.position,
            easing = b.easing || .2,
            obj = {},
            timer = null;

        obj.onStop = function (cb) {
          obj.onStop = cb;
          return obj;
        };

        obj.run = function () {
          timer = setInterval(function () {
            if (isStopAll) {
              return void obj.stop();
            }

            var b = position.x - a.x,
                c = position.y - a.y,
                h = b * easing,
                i = c * easing;
            a.x += h;
            a.y += i;
            .01 > h && .1 > i && obj.stop();
          }, 100);
          return obj;
        };

        obj.stop = function () {
          clearInterval(timer);
        };

        return obj;
      }
    }, {
      key: "cycle",
      value: function cycle(b, c) {
        var p1 = c.p1,
            p2 = c.p2,
            h = p1.x + (p2.x - p1.x) / 2,
            i = p1.y + (p2.y - p1.y) / 2,
            j = getDistance(p1, p2) / 2,
            k = Math.atan2(i, h),
            speed = c.speed || .2,
            obj = {},
            timer = null;

        obj.run = function () {
          timer = setInterval(function () {
            if (isStopAll) {
              obj.stop();
              return;
            }

            var a = p1.y + h + Math.sin(k) * j;
            b.setLocation(b.x, a);
            k += speed;
          }, 100);
          return obj;
        };

        obj.stop = function () {
          clearInterval(timer);
        };

        return obj;
      }
    }, {
      key: "repeatThrow",
      value: function repeatThrow(a, b) {
        var f = .8,
            context = b.context,
            timer = null,
            obj = {};

        function c(a) {
          a.visible = !0;
          a.rotate = Math.random();
          var b = context.stage.canvas.width / 2;
          a.x = b + Math.random() * (b - 100) - Math.random() * (b - 100);
          a.y = context.stage.canvas.height;
          a.vx = 5 * Math.random() - 5 * Math.random();
          a.vy = -25;
        }

        obj.onStop = function (cb) {
          obj.onStop = cb;
          return obj;
        };

        obj.run = function d() {
          c(a);
          timer = setInterval(function () {
            if (isStopAll) {
              obj.stop();
            } else {
              a.vy += f;
              a.x += a.vx;
              a.y += a.vy;

              if (a.x < 0 || a.x > context.stage.canvas.width || a.y > context.stage.canvas.height) {
                if (obj.onStop) {
                  obj.onStop(a);
                  c(a);
                }
              }
            }
          }, 50);
          return obj;
        };

        obj.stop = function e() {
          clearInterval(timer);
        };

        return obj;
      }
    }, {
      key: "dividedTwoPiece",
      value: function dividedTwoPiece(b, c) {
        var self = this;
        var context = c.context,
            obj = {};

        function d(x, y, radius, startAngle, endAngle) {
          var node = new Node();
          node.setImage(b.image);
          node.setSize(b.width, b.height);
          node.setLocation(x, y);
          node.showSelected = !1;
          node.dragable = !1;

          node.paint = function (ctx) {
            ctx.save();
            ctx.arc(0, 0, radius, startAngle, endAngle);
            ctx.clip();
            ctx.beginPath();

            if (this.image) {
              ctx.drawImage(this.image, -this.width / 2, -this.height / 2);
            } else {
              ctx.fillStyle = "rgba(" + this.style.fillStyle + "," + this.alpha + ")";
              ctx.rect(-this.width / 2, -this.height / 2, this.width / 2, this.height / 2);
              ctx.fill();
            }

            ctx.closePath();
            ctx.restore();
          };

          return node;
        }

        function e(angle, context) {
          var startAngle = angle,
              endAngle = angle + Math.PI,
              h = d(b.x, b.y, b.width, startAngle, endAngle),
              j = d(b.x - 2 + 4 * Math.random(), b.y, b.width, startAngle + Math.PI, startAngle);
          b.visible = !1;
          context.add(h);
          context.add(j);
          self.gravity(h, {
            context: context,
            dx: .3
          }).run().onStop(function () {
            context.remove(h);
            context.remove(j);
            obj.stop();
          });
          self.gravity(j, {
            context: context,
            dx: -.2
          }).run();
        }

        obj.onStop = function (cb) {
          obj.onStop = cb;
          return obj;
        };

        obj.run = function () {
          e(c.angle, context);
          return obj;
        };

        obj.stop = function () {
          obj.onStop && obj.onStop(b);
          return obj;
        };

        return obj;
      }
    }, {
      key: "gravity",
      value: function gravity(a, b) {
        var context = b.context,
            gravity = b.gravity || .1,
            timer = null,
            obj = {};

        obj.run = function () {
          var dx = b.dx || 0;
          var dy = b.dy || 2;
          timer = setInterval(function () {
            if (isStopAll) {
              return void obj.stop();
            } else {
              dy += gravity;

              if (a.y + a.height < context.stage.canvas.height) {
                return void a.setLocation(a.x + dx, a.y + dy);
              } else {
                dy = 0;
                return void stop();
              }
            }
          }, 20);
          return obj;
        };

        obj.stop = function () {
          clearInterval(timer);
          obj.onStop && obj.onStop(a);
          return obj;
        };

        obj.onStop = function (a) {
          obj.onStop = a;
          return obj;
        };

        return obj;
      }
    }, {
      key: "startAll",
      value: function startAll() {
        isStopAll = false;
      }
    }, {
      key: "stopAll",
      value: function stopAll() {
        isStopAll = true;
      }
    }]);

    return Animate;
  }();

  function h(a) {
    var b = 0;
    var c = 0;
    a.forEach(function (a) {
      b += a.width;
      c += a.height;
    });
    return {
      width: b / a.length,
      height: c / a.length
    };
  }

  function i(a, b, c, d) {
    b.x += c;
    b.y += d;
    var e = PTopo.Layout.getNodeChilds(a, b);

    for (var f = 0; f < e.length; f++) {
      i(a, e[f], c, d);
    }
  }

  function j(links, node) {
    function sugar(node, e) {
      var nodeChildsArr = PTopo.Layout.getNodeChilds(links, node);

      if (!d[e]) {
        d[e] = {};
        d[e].nodes = [];
        d[e].childs = [];
      }

      d[e].nodes.push(node);
      d[e].childs.push(nodeChildsArr);

      for (var _i = 0; _i < nodeChildsArr.length; _i++) {
        sugar(nodeChildsArr[_i], e + 1);
        nodeChildsArr[_i].parent = node;
      }
    }

    var d = [];
    sugar(node, 0);
    return d;
  }

  function m(x, y, rows, cols, horizontal, vertical) {
    var pointsArr = [];

    for (var _i2 = 0; rows > _i2; _i2++) {
      for (var _j = 0; cols > _j; _j++) {
        pointsArr.push({
          x: x + _j * horizontal,
          y: y + _i2 * vertical
        });
      }
    }

    return pointsArr;
  }

  function getRotatePoints(x, y, len, r, beginAngle, endAngle) {
    var beginA = beginAngle ? beginAngle : 0;
    var endA = endAngle ? endAngle : 2 * Math.PI;
    var angle = endA - beginA;
    var j = angle / len;
    var rotatePoints = [];
    beginA += j / 2;

    for (var _i3 = beginA; endA >= _i3; _i3 += j) {
      var rotatePointX = x + Math.cos(_i3) * r;
      var rotatePointY = y + Math.sin(_i3) * r;
      rotatePoints.push({
        x: rotatePointX,
        y: rotatePointY
      });
    }

    return rotatePoints;
  }

  function o(x, y, len, w, h, dir) {
    var direction = dir || "bottom";
    var pointsArr = [];

    if ("bottom" === direction) {
      var _i4 = x - len / 2 * w + w / 2;

      for (var _j2 = 0; len >= _j2; _j2++) {
        pointsArr.push({
          x: _i4 + _j2 * w,
          y: y + h
        });
      }
    } else if ("top" === direction) {
      var _i5 = x - len / 2 * w + w / 2;

      for (var _j3 = 0; len >= _j3; _j3++) {
        pointsArr.push({
          x: _i5 + _j3 * w,
          y: y - h
        });
      }
    } else if ("right" === direction) {
      var _i6 = y - len / 2 * w + w / 2;

      for (var _j4 = 0; len >= _j4; _j4++) {
        pointsArr.push({
          x: x + h,
          y: _i6 + _j4 * w
        });
      }
    } else if ("left" === direction) {
      var _i7 = y - len / 2 * w + w / 2;

      for (var _j5 = 0; len >= _j5; _j5++) {
        pointsArr.push({
          x: x - h,
          y: _i7 + _j5 * w
        });
      }
    }

    return pointsArr;
  }

  var Layout = {
    layoutNode: function layoutNode(scene, node, bool) {
      var nodeChildsArr = this.getNodeChilds(scene.childs, node);
      if (!nodeChildsArr.length) return null;
      this.adjustPosition(node, nodeChildsArr);

      if (bool) {
        for (var _i8 = 0; _i8 < nodeChildsArr.length; _i8++) {
          this.layoutNode(scene, nodeChildsArr[_i8], bool);
        }
      }

      return null;
    },
    getNodeChilds: function getNodeChilds(eles, node) {
      var eleChildsArr = [];

      for (var _i9 = 0; _i9 < eles.length; _i9++) {
        eles[_i9] instanceof Link && eles[_i9].nodeA === node && eleChildsArr.push(eles[_i9].nodeZ);
      }

      return eleChildsArr;
    },
    adjustPosition: function adjustPosition(node, nodeChildsArr) {
      if (node.layout) {
        var layout = node.layout;
        var layoutType = layout.type;
        var pointsArr = null;

        if ("circle" === layoutType) {
          var layoutRadius = layout.radius || Math.max(node.width, node.height);
          pointsArr = getRotatePoints(node.cx, node.cy, nodeChildsArr.length, layoutRadius, node.layout.beginAngle, node.layout.endAngle);
        } else if ("tree" === layoutType) {
          var w = layout.width || 50;

          var _h = layout.height || 50;

          var direction = layout.direction;
          pointsArr = o(node.cx, node.cy, nodeChildsArr.length, w, _h, direction);
        } else {
          if ("grid" !== layoutType) return;
          pointsArr = m(node.x, node.y, layout.rows, layout.cols, layout.horizontal || 0, layout.vertical || 0);
        }

        for (var _i10 = 0; _i10 < nodeChildsArr.length; _i10++) {
          nodeChildsArr[_i10].setCenterLocation(pointsArr[_i10].x, pointsArr[_i10].y);
        }
      }
    },
    getTreeDeep: function getTreeDeep(links, node) {
      var deep = 0;
      var self = this;

      function c(links, node, e) {
        var nodeChildsArr = self.getNodeChilds(links, node);
        e > deep && (deep = e);

        for (var _i11 = 0; _i11 < nodeChildsArr.length; _i11++) {
          c(links, nodeChildsArr[_i11], e + 1);
        }
      }

      c(links, node, 0);
      return deep;
    },
    getRootNodes: function getRootNodes(nodes) {
      var nonLinkNodes = [];
      var linkNodes = nodes.filter(function (node) {
        if (node instanceof Link) {
          return !0;
        } else {
          nonLinkNodes.push(node);
          return !1;
        }
      });
      var nonNodeZArrInNonLinkNodes = nonLinkNodes.filter(function (nonLinkNode) {
        for (var _i12 = 0; _i12 < linkNodes.length; _i12++) {
          if (linkNodes[_i12].nodeZ === nonLinkNode) return !1;
        }

        return !0;
      });
      return nonNodeZArrInNonLinkNodes.filter(function (node) {
        for (var _i13 = 0; _i13 < linkNodes.length; _i13++) {
          if (linkNodes[_i13].nodeA === node) return !0;
        }

        return !1;
      });
    },
    getNodesCenter: function getNodesCenter(nodes) {
      var b = 0;
      var c = 0;
      nodes.forEach(function (node) {
        b += node.cx;
        c += node.cy;
      });
      return {
        x: b / nodes.length,
        y: c / nodes.length
      };
    },
    springLayout: function springLayout(ele, scene) {
      var f = .01;
      var g = .95;
      var h = -5;
      var i = 0;
      var j = 0;
      var k = 0; // get elementArr by ClassName in scene, every element is instance of the ClassName

      var eleArr = scene.getElementsByClass(Node);

      function d(ele1, ele2) {
        var dx = ele1.x - ele2.x;
        var dy = ele1.y - ele2.y;
        i += dx * f;
        j += dy * f;
        i *= g;
        j *= g;
        j += h;
        ele2.x += i;
        ele2.y += j;
      }

      function fn() {
        if (!(++k > 150)) {
          for (var _i14 = 0; _i14 < eleArr.length; _i14++) {
            eleArr[_i14] !== ele && d(ele, eleArr[_i14], eleArr);
          }

          setTimeout(fn, 1e3 / 24);
        }
      }

      fn();
    },
    GridLayout: function GridLayout(a, b) {
      return function (c) {
        var d = c.childs;

        if (!(d.length <= 0)) {
          var boundaryObj = c.getBound();
          var f = d[0];
          var g = (boundaryObj.width - f.width) / b;

          var _h2 = (boundaryObj.height - f.height) / a;

          var _i15 = 0;

          for (var _j6 = 0; a > _j6; _j6++) {
            for (var k = 0; b > k; k++) {
              var l = d[_i15++];
              var x = boundaryObj.left + g / 2 + k * g;
              var y = boundaryObj.top + _h2 / 2 + _j6 * _h2;
              l.setLocation(x, y);
              if (_i15 >= d.length) return;
            }
          }
        }
      };
    },
    FlowLayout: function FlowLayout(a, b) {
      !a && (a = 0);
      !b && (b = 0);
      return function (c) {
        var childsArr = c.childs;

        if (!(childsArr.length <= 0)) {
          var boundaryObj = c.getBound();
          var bLeft = boundaryObj.left;
          var bTop = boundaryObj.top;

          for (var _i16 = 0; _i16 < childsArr.length; _i16++) {
            var child = childsArr[_i16];

            if (bLeft + child.width >= boundaryObj.right) {
              bLeft = boundaryObj.left;
              bTop += b + child.height;
            }

            child.setLocation(bLeft + a / 2, bTop + b / 2);
            bLeft += a + child.width;
          }
        }
      };
    },
    AutoBoundLayout: function AutoBoundLayout() {
      return function (a, b) {
        if (b.length) {
          var x = 1e7;
          var d = -1e7;
          var y = 1e7;
          var f = -1e7;
          var w = d - x;

          var _h3 = f - y;

          for (var _i17 = 0; _i17 < b.length; _i17++) {
            var _j7 = b[_i17];
            _j7.x <= x && (x = _j7.x);
            _j7.x >= d && (d = _j7.x);
            _j7.y <= y && (y = _j7.y);
            _j7.y >= f && (f = _j7.y);
            w = d - x + _j7.width;
            _h3 = f - y + _j7.height;
          }

          a.x = x;
          a.y = y;
          a.width = w;
          a.height = _h3;
        }
      };
    },
    CircleLayout: function CircleLayout(b) {
      var self = this;
      return function (ele) {
        function sugar(eleChilds, rootNode, e) {
          var nodeChildsArr = self.getNodeChilds(eleChilds, rootNode);

          if (nodeChildsArr.length) {
            !e && (e = b);
            var g = 2 * Math.PI / nodeChildsArr.length;
            nodeChildsArr.forEach(function (node, index) {
              var x = rootNode.x + e * Math.cos(g * index);
              var y = rootNode.y + e * Math.sin(g * index);
              node.setLocation(x, y);
              sugar(eleChilds, node, e / 2);
            });
          }
        }

        console.log(self);
        var rootNodes = self.getRootNodes(ele.childs);

        if (rootNodes.length > 0) {
          sugar(ele.childs, rootNodes[0]);
          var eleBoundaryObj = getElementsBound(ele.childs);
          var centerLocOfEle = ele.getCenterLocation();
          var x = centerLocOfEle.x - (eleBoundaryObj.left + eleBoundaryObj.right) / 2;
          var y = centerLocOfEle.y - (eleBoundaryObj.top + eleBoundaryObj.bottom) / 2;
          ele.childs.forEach(function (node) {
            if (node instanceof Node) {
              node.x += x;
              node.y += y;
            }
          });
        }
      };
    },
    TreeLayout: function TreeLayout(b, c, d) {
      var self = this;
      return function (e) {
        function f(links, node) {
          var h = self.getTreeDeep(links, node);
          var k = j(links, node);
          var l = k["" + h].nodes;

          for (var _m = 0; _m < l.length; _m++) {
            var n = l[_m];

            var _o = (_m + 1) * (c + 10);

            var p = h * d;

            if ("down" !== b) {
              if ("up" === b) {
                p = -p;
              } else {
                if ("left" === b) {
                  _o = -h * d;
                  p = (_m + 1) * (c + 10);
                } else {
                  if ("right" === b) {
                    _o = h * d;
                    p = (_m + 1) * (c + 10);
                  }
                }
              }
            }

            n.setLocation(_o, p);
          }

          for (var q = h - 1; q >= 0; q--) {
            var r = k["" + q].nodes;
            var s = k["" + q].childs;

            for (var _m2 = 0; _m2 < r.length; _m2++) {
              var t = r[_m2];
              var u = s[_m2];
              "down" === b ? t.y = q * d : "up" == b ? t.y = -q * d : "left" == b ? t.x = -q * d : "right" == b && (t.x = q * d);

              if (u.length) {
                "down" === b || "up" === b ? t.x = (u[0].x + u[u.length - 1].x) / 2 : ("left" === b || "right" === b) && (t.y = (u[0].y + u[u.length - 1].y) / 2);
              } else {
                if (_m2 > 0) {
                  "down" === b || "up" === b ? t.x = r[_m2 - 1].x + r[_m2 - 1].width + c : ("left" === b || "right" === b) && (t.y = r[_m2 - 1].y + r[_m2 - 1].height + c);
                }
              }

              if (_m2 > 0) {
                if ("down" === b || "up" === b) {
                  if (t.x < r[_m2 - 1].x + r[_m2 - 1].width) {
                    var v = r[_m2 - 1].x + r[_m2 - 1].width + c;
                    var w = Math.abs(v - t.x);

                    for (var x = _m2; x < r.length; x++) {
                      i(e.childs, r[x], w, 0);
                    }
                  }
                } else if (("left" === b || "right" === b) && t.y < r[_m2 - 1].y + r[_m2 - 1].height) {
                  var y = r[_m2 - 1].y + r[_m2 - 1].height + c;
                  var z = Math.abs(y - t.y);

                  for (var _x = _m2; _x < r.length; _x++) {
                    i(e.childs, r[_x], 0, z);
                  }
                }
              }
            }
          }
        }

        var g = null;

        if (!c) {
          g = h(e.childs);
          c = g.width;
          "left" === b || "right" === b && (c = g.width + 10);
        }

        if (!d) {
          !g && (g = h(e.childs));
          d = 2 * g.height;
        }

        !b && (b = "down");
        var k = self.getRootNodes(e.childs);

        if (k.length > 0) {
          f(e.childs, k[0]);
          var l = getElementsBound(e.childs);

          var _m3 = e.getCenterLocation();

          var n = _m3.x - (l.left + l.right) / 2;

          var _o2 = _m3.y - (l.top + l.bottom) / 2;

          e.childs.forEach(function (b) {
            if (b instanceof Node) {
              b.x += n;
              b.y += _o2;
            }
          });
        }
      };
    },
    circleLayoutNodes: function circleLayoutNodes(c, d) {
      !d && (d = {});
      var cx = d.cx;
      var cy = d.cy;
      var minRadius = d.minRadius;
      var nodeDiameter = d.nodeDiameter;
      var hScale = d.hScale || 1;
      var vScale = d.vScale || 1;

      if (!cx || !cy) {
        var cPointOfNodes = this.getNodesCenter(c);
        cx = cPointOfNodes.x;
        cy = cPointOfNodes.y;
      }

      var l = 0;
      var m = [];
      var n = [];
      c.forEach(function (a) {
        if (!d.nodeDiameter) {
          a.diameter && (nodeDiameter = a.diameter);
          nodeDiameter = a.radius ? 2 * a.radius : Math.sqrt(2 * a.width * a.height);
          n.push(nodeDiameter);
        } else {
          n.push(nodeDiameter);
          l += nodeDiameter;
        }
      });
      c.forEach(function (a, b) {
        var c = n[b] / l;
        m.push(Math.PI * c);
      });
      var o = m[0] + m[1];
      var p = n[0] / 2 + n[1] / 2;
      var q = p / 2 / Math.sin(o / 2);
      minRadius && minRadius > q && (q = minRadius);
      var r = q * hScale;
      var s = q * vScale;
      var t = d.animate;

      if (t) {
        var u = t.time || 1e3;
        var v = 0;
        c.forEach(function (b, c) {
          v += 0 === c ? m[c] : m[c - 1] + m[c];
          var d = cx + Math.cos(v) * r;
          var g = cy + Math.sin(v) * s;
          Animate.stepByStep(b, {
            x: d - b.width / 2,
            y: g - b.height / 2
          }, u).start();
        });
      } else {
        var _v = 0;
        c.forEach(function (a, i) {
          _v += 0 === i ? m[i] : m[i - 1] + m[i];
          var c = cx + Math.cos(_v) * r;
          var d = cy + Math.sin(_v) * s;
          a.cx = c;
          a.cy = d;
        });
      }

      return {
        cx: cx,
        cy: cy,
        radius: r,
        radiusA: r,
        radiusB: s
      };
    }
  };

  var Container =
  /*#__PURE__*/
  function (_InteractiveElement) {
    _inherits(Container, _InteractiveElement);

    function Container(text) {
      var _this;

      _classCallCheck(this, Container);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Container).call(this));
      _this.elementType = "container";
      _this.zIndex = zIndex_Container;
      _this.width = 100;
      _this.height = 100;
      _this.childs = [];
      _this.childDragble = true;
      _this.alpha = .5;
      _this.dragable = true;
      _this.visible = true;
      _this.fillColor = "10,100,80";
      _this.borderWidth = 0;
      _this.borderColor = "255,255,255";
      _this.borderRadius = null;
      _this.font = "12px Consolas";
      _this.fontColor = "255,255,255";
      _this.text = text;
      _this.textPosition = "Bottom_Center";
      _this.textOffsetX = 0;
      _this.textOffsetY = 0;
      _this.layout = new Layout.AutoBoundLayout();
      return _this;
    }

    _createClass(Container, [{
      key: "add",
      value: function add(ele) {
        this.childs.push(ele);
        ele.dragable = this.childDragble;
      }
    }, {
      key: "remove",
      value: function remove(ele) {
        for (var i = 0, len = this.childs.length; i < len; i++) {
          if (this.childs[i] === ele) {
            ele.parentContainer = null;
            this.childs = this.childs.del(i);
            ele.lastParentContainer = this;
            break;
          }
        }
      }
    }, {
      key: "removeAll",
      value: function removeAll() {
        this.childs = [];
      }
    }, {
      key: "setLocation",
      value: function setLocation(x, y) {
        var dx = x - this.x;
        var dy = y - this.y;
        this.x = x;
        this.y = y;

        for (var i = 0; i < this.childs.length; i++) {
          var ele = this.childs[i];
          ele.setLocation(ele.x + dx, ele.y + dy);
        }
      }
    }, {
      key: "doLayout",
      value: function doLayout(cb) {
        cb && cb(this, this.childs);
      }
    }, {
      key: "paint",
      value: function paint(ctx) {
        if (this.visible) {
          this.layout && this.layout(this, this.childs);
          ctx.beginPath();
          ctx.fillStyle = "rgba(" + this.fillColor + "," + this.alpha + ")";
          !this.borderRadius ? ctx.rect(this.x, this.y, this.width, this.height) : ctx.PTopoRoundRect(this.x, this.y, this.width, this.height, this.borderRadius);
          ctx.fill();
          ctx.closePath();
          this.paintBorder(ctx);
          this.paintText(ctx);
        }
      }
    }, {
      key: "paintBorder",
      value: function paintBorder(ctx) {
        if (this.borderWidth) {
          ctx.beginPath();
          ctx.lineWidth = this.borderWidth;
          ctx.strokeStyle = "rgba(" + this.borderColor + "," + this.alpha + ")";
          var b = this.borderWidth / 2;
          !this.borderRadius ? ctx.rect(this.x - b, this.y - b, this.width + this.borderWidth, this.height + this.borderWidth) : ctx.PTopoRoundRect(this.x - b, this.y - b, this.width + this.borderWidth, this.height + this.borderWidth, this.borderRadius);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }, {
      key: "paintText",
      value: function paintText(ctx) {
        var text = this.text;

        if (text) {
          ctx.beginPath();
          ctx.font = this.font;
          ctx.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
          var textW = ctx.measureText(text).width;
          var cnW = ctx.measureText("田").width;
          var textPos = this.getTextPostion(this.textPosition, textW, cnW);
          ctx.fillText(text, textPos.x, textPos.y);
          ctx.closePath();
        }
      }
    }, {
      key: "getTextPostion",
      value: function getTextPostion(posDesc, e, h) {
        var textPos = null;

        switch (posDesc) {
          case 'Top_Left':
            textPos = {
              x: this.x,
              y: this.y - h / 2
            };
            break;

          case 'Top_Center':
            textPos = {
              x: this.x + this.width / 2 - e / 2,
              y: this.y - h / 2
            };
            break;

          case 'Top_Right':
            textPos = {
              x: this.x + this.width - e,
              y: this.y - h / 2
            };
            break;

          case 'Bottom_Left':
            textPos = {
              x: this.x,
              y: this.y + this.height + h
            };
            break;

          case 'Bottom_Center':
            textPos = {
              x: this.x + this.width / 2 - e / 2,
              y: this.y + this.height + h
            };
            break;

          case 'Bottom_Right':
            textPos = {
              x: this.x + this.width - e,
              y: this.y + this.height + h
            };
            break;

          case 'Middle_Left':
            textPos = {
              x: this.x,
              y: this.y + this.height / 2 + h / 2
            };
            break;

          case 'Middle_Center':
            textPos = {
              x: this.x + this.width / 2 - e / 2,
              y: this.y + this.height / 2 + h / 2
            };
            break;

          case 'Middle_Right':
            textPos = {
              x: this.x + this.width - e,
              y: this.y + this.height / 2 + h / 2
            };
            break;
        }

        this.textOffsetX && (textPos.x += this.textOffsetX);
        this.textOffsetY && (textPos.y += this.textOffsetY);
        return textPos;
      }
    }, {
      key: "paintMouseover",
      value: function paintMouseover() {}
    }, {
      key: "paintSelected",
      value: function paintSelected(self) {
        self.shadowBlur = 10;
        self.shadowColor = "rgba(0,0,0,1)";
        self.shadowOffsetX = 0;
        self.shadowOffsetY = 0;
      }
    }]);

    return Container;
  }(InteractiveElement);

  function DrawRect(x, y, w, h) {
    return function (ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 0, 236, 0.5)";
      ctx.fillStyle = "rgba(0, 0, 236, 0.1)";
      ctx.rect(x, y, w, h);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    };
  }

  var Scene =
  /*#__PURE__*/
  function (_Element) {
    _inherits(Scene, _Element);

    function Scene(stage) {
      var _this;

      _classCallCheck(this, Scene);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Scene).call(this, stage));
      _this.eventEmitter = new EventEmitter();
      _this.elementType = "scene";
      _this.childs = [];
      _this.zIndexMap = {};
      _this.zIndexArray = [];
      _this.backgroundColor = "255, 255, 255";
      _this.visible = true;
      _this.alpha = 0;
      _this.scaleX = 1;
      _this.scaleY = 1;
      _this.mode = SceneMode.normal;
      _this.translate = true;
      _this.translateX = 0;
      _this.translateY = 0;
      _this.lastTranslateX = 0;
      _this.lastTranslateY = 0;
      _this.mouseDown = false;
      _this.mouseDownX = null;
      _this.mouseDownY = null;
      _this.mouseDownEvent = null;
      _this.areaSelect = true;
      _this.operations = [];
      _this.selectedElements = [];
      _this.paintAll = false;
      var properties = "background,backgroundColor,mode,paintAll,areaSelect,translate,translateX,translateY,lastTranslatedX,lastTranslatedY,alpha,visible,scaleX,scaleY".split(",");
      _this.serializedProperties = _this.serializedProperties.concat(properties);

      if (stage) {
        stage.add(_assertThisInitialized(_assertThisInitialized(_this)));

        _this.addTo(stage);
      }

      return _this;
    }

    _createClass(Scene, [{
      key: "setBackground",
      value: function setBackground(url) {
        this.background = url;
      }
    }, {
      key: "addTo",
      value: function addTo(stage) {
        this.stage !== stage && stage && (this.stage = stage);
      }
    }, {
      key: "show",
      value: function show() {
        this.visible = true;
      }
    }, {
      key: "hide",
      value: function hide() {
        this.visible = false;
      }
    }, {
      key: "paint",
      value: function paint(ctx) {
        if (this.visible && this.stage) {
          ctx.save();
          this.paintBackground(ctx);
          ctx.restore();
          ctx.save();
          ctx.scale(this.scaleX, this.scaleY);

          if (this.translate) {
            var offsetTransObj = this.getOffsetTranslate(ctx);
            ctx.translate(offsetTransObj.translateX, offsetTransObj.translateY);
          }

          this.paintChilds(ctx);
          ctx.restore();
          ctx.save();
          this.paintOperations(ctx, this.operations);
          ctx.restore();
        }
      }
    }, {
      key: "repaint",
      value: function repaint(ctx) {
        this.visible && this.paint(ctx);
      }
    }, {
      key: "paintBackground",
      value: function paintBackground(ctx) {
        if (this.background) {
          ctx.drawImage(this.background, 0, 0, ctx.canvas.width, ctx.canvas.height);
        } else {
          ctx.beginPath();
          ctx.fillStyle = "rgba(" + this.backgroundColor + "," + this.alpha + ")";
          ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.closePath();
        }
      }
    }, {
      key: "getDisplayedElements",
      value: function getDisplayedElements() {
        var displayedEleArr = [];

        for (var i = 0, len = this.zIndexArray.length; i < len; i++) {
          var c = this.zIndexArray[i];
          var eleArr = this.zIndexMap[c];

          for (var j = 0; j < eleArr.length; j++) {
            var ele = eleArr[j];
            this.isVisiable(ele) && displayedEleArr.push(ele);
          }
        }

        return displayedEleArr;
      }
    }, {
      key: "getDisplayedNodes",
      value: function getDisplayedNodes() {
        var displayedNodeArr = [];

        for (var i = 0; i < this.childs.length; i++) {
          var ele = this.childs[i];
          ele instanceof Node && this.isVisiable(ele) && displayedNodeArr.push(ele);
        }

        return displayedNodeArr;
      }
    }, {
      key: "paintChilds",
      value: function paintChilds(ctx) {
        for (var i = 0, len = this.zIndexArray.length; i < len; i++) {
          var zIndex = this.zIndexArray[i];
          var eleArr = this.zIndexMap[zIndex];

          for (var j = 0, _len = eleArr.length; j < _len; j++) {
            var ele = eleArr[j];

            if (this.paintAll || this.isVisiable(ele)) {
              ctx.save();

              if (ele.transformAble) {
                var h = ele.getCenterLocation();
                ctx.translate(h.x, h.y);

                if (ele.rotate) {
                  ctx.rotate(ele.rotate);

                  if (ele.scaleX && ele.scaleY) {
                    ctx.scale(ele.scaleX, ele.scaleY);
                  } else {
                    ele.scaleX ? ctx.scale(ele.scaleX, 1) : ele.scaleY && ctx.scale(1, ele.scaleY);
                  }
                }
              }

              if (ele.shadow) {
                ctx.shadowBlur = ele.shadowBlur;
                ctx.shadowColor = ele.shadowColor;
                ctx.shadowOffsetX = ele.shadowOffsetX;
                ctx.shadowOffsetY = ele.shadowOffsetY;
              }

              if (ele instanceof InteractiveElement) {
                ele.selected && ele.showSelected && ele.paintSelected(ctx);
                ele.isMouseOver && ele.paintMouseover(ctx);
              }

              ele.paint(ctx);
              ctx.restore();
            }
          }
        }
      }
    }, {
      key: "getOffsetTranslate",
      value: function getOffsetTranslate(a) {
        var w = this.stage.canvas.width;
        var h = this.stage.canvas.height;

        if (a && "move" !== a) {
          w = a.canvas.width;
          h = a.canvas.height;
        }

        var x = w / this.scaleX / 2;
        var y = h / this.scaleY / 2;
        return {
          translateX: this.translateX + (x - x * this.scaleX),
          translateY: this.translateY + (y - y * this.scaleY)
        };
      }
    }, {
      key: "isVisiable",
      value: function isVisiable(ele) {
        if (!ele.visible) return false;
        if (ele instanceof Link) return true;
        var offsetTranslateObj = this.getOffsetTranslate();
        var x = ele.x + offsetTranslateObj.translateX;
        var y = ele.y + offsetTranslateObj.translateY;
        x *= this.scaleX;
        y *= this.scaleY;
        var f = x + ele.width * this.scaleX;
        var g = y + ele.height * this.scaleY;
        return !(x > this.stage.canvas.width || y > this.stage.canvas.height || 0 > f || 0 > g);
      }
    }, {
      key: "paintOperations",
      value: function paintOperations(ctx, operations) {
        operations.forEach(function (operation) {
          operation(ctx);
        });
      }
    }, {
      key: "findElements",
      value: function findElements(cb) {
        var eleArr = [];
        this.childs.forEach(function (child) {
          cb(child) && eleArr.push(child);
        });
        return eleArr;
      }
    }, {
      key: "getElementsByClass",
      value: function getElementsByClass(ClassName) {
        return this.findElements(function (ele) {
          return ele instanceof ClassName;
        });
      }
    }, {
      key: "addOperation",
      value: function addOperation(operation) {
        this.operations.push(operation);
        return this;
      }
    }, {
      key: "clearOperations",
      value: function clearOperations() {
        this.operations = [];
        return this;
      }
    }, {
      key: "getElementByXY",
      value: function getElementByXY(x, y) {
        var d = null;

        for (var i = this.zIndexArray.length - 1; i >= 0; i--) {
          var zIndex = this.zIndexArray[i];
          var eleArr = this.zIndexMap[zIndex];

          for (var j = eleArr.length - 1; j >= 0; j--) {
            var ele = eleArr[j];

            if (ele instanceof InteractiveElement && this.isVisiable(ele) && ele.isInBound(x, y)) {
              return d = ele;
            }
          }
        }

        return d;
      }
    }, {
      key: "add",
      value: function add(ele) {
        this.childs.push(ele);

        if (!this.zIndexMap[ele.zIndex]) {
          this.zIndexMap[ele.zIndex] = [];
          this.zIndexArray.push(ele.zIndex);
          this.zIndexArray.sort(function (a, b) {
            return a - b;
          });
        }

        this.zIndexMap["" + ele.zIndex].push(ele);
      }
    }, {
      key: "remove",
      value: function remove(ele) {
        this.childs = removeFromArray(this.childs, ele);
        var c = this.zIndexMap[ele.zIndex];
        c && (this.zIndexMap[ele.zIndex] = removeFromArray(c, ele));
        ele.removeHandler(this);
      }
    }, {
      key: "clear",
      value: function clear() {
        var self = this;
        this.childs.forEach(function (child) {
          child.removeHandler(self);
        });
        this.childs = [];
        this.operations = [];
        this.zIndexArray = [];
        this.zIndexMap = {};
      }
    }, {
      key: "addToSelected",
      value: function addToSelected(ele) {
        this.selectedElements.push(ele);
      }
    }, {
      key: "cancelAllSelected",
      value: function cancelAllSelected(a) {
        for (var i = 0, len = this.selectedElements.length; i < len; i++) {
          this.selectedElements[i].unselectedHandler(a);
        }

        this.selectedElements = [];
      }
    }, {
      key: "notInSelectedNodes",
      value: function notInSelectedNodes(a) {
        for (var i = 0, len = this.selectedElements.length; i < len; i++) {
          if (a === this.selectedElements[i]) return false;
        }

        return true;
      }
    }, {
      key: "removeFromSelected",
      value: function removeFromSelected(a) {
        for (var i = 0, len = this.selectedElements.length; i < len; i++) {
          a === this.selectedElements[i] && (this.selectedElements = this.selectedElements.del(i));
        }
      }
    }, {
      key: "toSceneEvent",
      value: function toSceneEvent(e) {
        var eObj = clone(e);
        eObj.x /= this.scaleX;
        eObj.y /= this.scaleY;

        if (this.translate) {
          var offsetTranslateObj = this.getOffsetTranslate();
          eObj.x -= offsetTranslateObj.translateX;
          eObj.y -= offsetTranslateObj.translateY;
        }

        if (eObj.dx) {
          eObj.dx /= this.scaleX;
          eObj.dy /= this.scaleY;
        }

        this.currentElement && (eObj.target = this.currentElement);
        eObj.scene = this;
        return eObj;
      }
    }, {
      key: "selectElement",
      value: function selectElement(eObj) {
        var ele = this.getElementByXY(eObj.x, eObj.y);

        if (ele) {
          eObj.target = ele;
          ele.mousedownHander(eObj);
          ele.selectedHandler(eObj);

          if (this.notInSelectedNodes(ele)) {
            eObj.ctrlKey || this.cancelAllSelected();
            this.addToSelected(ele);
          } else {
            if (1 === eObj.ctrlKey) {
              ele.unselectedHandler();
              this.removeFromSelected(ele);
            }

            this.selectedElements.forEach(function (ele) {
              return ele.selectedHandler(eObj);
            });
          }
        } else {
          eObj.ctrlKey || this.cancelAllSelected();
        }

        this.currentElement = ele;
      }
    }, {
      key: "mousedownHandler",
      value: function mousedownHandler(eObj) {
        var e = this.toSceneEvent(eObj);
        this.mouseDown = !0;
        this.mouseDownX = e.x;
        this.mouseDownY = e.y;
        this.mouseDownEvent = e;

        switch (this.mode) {
          case SceneMode.normal:
            this.selectElement(e);

            if (!this.currentElement || this.currentElement instanceof Link && this.translate) {
              this.lastTranslateX = this.translateX;
              this.lastTranslateY = this.translateY;
            }

            break;

          case SceneMode.drag:
            if (this.translate) {
              this.lastTranslateX = this.translateX;
              this.lastTranslateY = this.translateY;
              return;
            }

            break;

          case SceneMode.select:
            this.selectElement(e);
            break;

          case SceneMode.edit:
            this.selectElement(e);

            if (!this.currentElement || this.currentElement instanceof Link && this.translate) {
              this.lastTranslateX = this.translateX;
              this.lastTranslateY = this.translateY;
            }

            break;
        }

        this.dispatchEvent("mousedown", e);
      }
    }, {
      key: "mouseupHandler",
      value: function mouseupHandler(eObj) {
        this.stage.cursor !== MouseCursor.normal && (this.stage.cursor = MouseCursor.normal);
        this.clearOperations();
        var e = this.toSceneEvent(eObj);

        if (this.currentElement) {
          e.target = this.currentElement;
          this.currentElement.mouseupHandler(e);
        }

        this.dispatchEvent("mouseup", e);
        this.mouseDown = false;
      }
    }, {
      key: "dragElements",
      value: function dragElements(eObj) {
        if (this.currentElement && this.currentElement.dragable) {
          for (var i = 0; i < this.selectedElements.length; i++) {
            var selectedEle = this.selectedElements[i];

            if (selectedEle.dragable) {
              var e = clone(eObj);
              e.target = selectedEle;
              selectedEle.mousedragHandler(e);
            }
          }
        }
      }
    }, {
      key: "mousedragHandler",
      value: function mousedragHandler(eObj) {
        var e = this.toSceneEvent(eObj);

        switch (this.mode) {
          case SceneMode.normal:
            if (!this.currentElement || this.currentElement instanceof Link) {
              if (this.translate) {
                this.stage.cursor = MouseCursor.closed_hand;
                this.translateX = this.lastTranslateX + e.dx;
                this.translateY = this.lastTranslateY + e.dy;
              }
            } else {
              this.dragElements(e);
            }

            break;

          case SceneMode.drag:
            if (this.translate) {
              this.stage.cursor = MouseCursor.closed_hand;
              this.translateX = this.lastTranslateX + e.dx;
              this.translateY = this.lastTranslateY + e.dy;
            }

            break;

          case SceneMode.select:
            this.currentElement ? this.currentElement.dragable && this.dragElements(e) : this.areaSelect && this.areaSelectHandle(e);
            break;

          case SceneMode.edit:
            if (!this.currentElement || this.currentElement instanceof Link) {
              if (this.translate) {
                this.stage.cursor = MouseCursor.closed_hand;
                this.translateX = this.lastTranslateX + e.dx;
                this.translateY = this.lastTranslateY + e.dy;
              }
            } else {
              this.dragElements(e);
            }

            break;
        }

        this.dispatchEvent("mousedrag", e);
      }
    }, {
      key: "areaSelectHandle",
      value: function areaSelectHandle(e) {
        var b = e.offsetLeft;
        var c = e.offsetTop;
        var f = this.mouseDownEvent.offsetLeft;
        var g = this.mouseDownEvent.offsetTop;
        var x = b >= f ? f : b;
        var y = c >= g ? g : c;
        var w = Math.abs(e.dx) * this.scaleX;
        var h = Math.abs(e.dy) * this.scaleY;
        var l = new DrawRect(x, y, w, h);
        this.clearOperations().addOperation(l);
        b = e.x;
        c = e.y;
        f = this.mouseDownEvent.x;
        g = this.mouseDownEvent.y;
        x = b >= f ? f : b;
        y = c >= g ? g : c;
        w = Math.abs(e.dx);
        h = Math.abs(e.dy);
        var m = x + w;
        var n = y + h;

        for (var i = 0; i < this.childs.length; i++) {
          var p = this.childs[i];

          if (p.x > x && p.x + p.width < m && p.y > y && p.y + p.height < n && this.notInSelectedNodes(p)) {
            p.selectedHandler(e);
            this.addToSelected(p);
          }
        }
      }
    }, {
      key: "mousemoveHandler",
      value: function mousemoveHandler(eObj) {
        this.mousecoord = {
          x: eObj.x,
          y: eObj.y
        };
        var e = this.toSceneEvent(eObj);

        if (this.mode === SceneMode.drag) {
          this.stage.cursor = MouseCursor.open_hand;
          return;
        }

        if (this.mode === SceneMode.normal) {
          this.stage.cursor = MouseCursor.normal;
        } else {
          this.mode === SceneMode.select && (this.stage.cursor = MouseCursor.normal);
        }

        var ele = this.getElementByXY(e.x, e.y);

        if (ele) {
          if (this.mouseOverelement && this.mouseOverelement !== ele) {
            e.target = ele;
            this.mouseOverelement.mouseoutHandler(e);
          }

          this.mouseOverelement = ele;

          if (!ele.isMouseOver) {
            e.target = ele;
            ele.mouseoverHandler(e);
            this.dispatchEvent("mouseover", e);
          } else {
            e.target = ele;
            ele.mousemoveHandler(e);
            this.dispatchEvent("mousemove", e);
          }
        } else {
          if (this.mouseOverelement) {
            e.target = ele;
            this.mouseOverelement.mouseoutHandler(e);
            this.mouseOverelement = null;
            this.dispatchEvent("mouseout", e);
          } else {
            e.target = null;
            this.dispatchEvent("mousemove", e);
          }
        }
      }
    }, {
      key: "mouseoverHandler",
      value: function mouseoverHandler(eObj) {
        var e = this.toSceneEvent(eObj);
        this.dispatchEvent("mouseover", e);
      }
    }, {
      key: "mouseoutHandler",
      value: function mouseoutHandler(eObj) {
        var e = this.toSceneEvent(eObj);
        this.dispatchEvent("mouseout", e);
      }
    }, {
      key: "clickHandler",
      value: function clickHandler(eObj) {
        var e = this.toSceneEvent(eObj);

        if (this.currentElement) {
          e.target = this.currentElement;
          this.currentElement.clickHandler(e);
        }

        this.dispatchEvent("click", e);
      }
    }, {
      key: "dbclickHandler",
      value: function dbclickHandler(eObj) {
        var e = this.toSceneEvent(eObj);

        if (this.currentElement) {
          e.target = this.currentElement;
          this.currentElement.dbclickHandler(e);
        } else {
          this.cancelAllSelected();
          this.dispatchEvent("dbclick", e);
        }
      }
    }, {
      key: "mousewheelHandler",
      value: function mousewheelHandler(eObj) {
        var e = this.toSceneEvent(eObj);
        this.dispatchEvent("mousewheel", e);
      }
    }, {
      key: "keydownHandler",
      value: function keydownHandler(eObj) {
        this.dispatchEvent("keydown", eObj);
      }
    }, {
      key: "keyupHandler",
      value: function keyupHandler(eObj) {
        this.dispatchEvent("keyup", eObj);
      }
    }, {
      key: "addEventListener",
      value: function addEventListener(eName, cb) {
        var fn = function fn(eName) {
          cb.call(this, eName);
        };

        this.eventEmitter.subscribe(eName, fn);
        return this;
      }
    }, {
      key: "removeEventListener",
      value: function removeEventListener(eName) {
        this.eventEmitter.unsubscribe(eName);
      }
    }, {
      key: "removeAllEventListener",
      value: function removeAllEventListener() {
        this.eventEmitter = new EventEmitter();
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(eName, eObj) {
        this.eventEmitter.publish(eName, eObj);
        return this;
      }
    }, {
      key: "zoom",
      value: function zoom(scaleX, scaleY) {
        scaleX && (this.scaleX = scaleX);
        scaleY && (this.scaleY = scaleY);
      }
    }, {
      key: "zoomOut",
      value: function zoomOut(scale) {
        if (scale) {
          this.scaleX /= scale;
          this.scaleY /= scale;
        } else {
          this.scaleX /= .8;
          this.scaleY /= .8;
        }
      }
    }, {
      key: "zoomIn",
      value: function zoomIn(scale) {
        if (scale) {
          this.scaleX *= scale;
          this.scaleY *= scale;
        } else {
          this.scaleX *= .8;
          this.scaleY *= .8;
        }
      }
    }, {
      key: "zoomReset",
      value: function zoomReset() {
        this.scaleX = 1;
        this.scaleY = 1;
      }
    }, {
      key: "getBound",
      value: function getBound() {
        return {
          left: 0,
          top: 0,
          right: this.stage.canvas.width,
          bottom: this.stage.canvas.height,
          width: this.stage.canvas.width,
          height: this.stage.canvas.height
        };
      }
    }, {
      key: "getElementsBound",
      value: function getElementsBound$$1() {
        return getElementsBound(this.childs);
      }
    }, {
      key: "translateToCenter",
      value: function translateToCenter(a) {
        var bObj = this.getElementsBound();
        var x = this.stage.canvas.width / 2 - (bObj.left + bObj.right) / 2;
        var y = this.stage.canvas.height / 2 - (bObj.top + bObj.bottom) / 2;

        if (a) {
          x = a.canvas.width / 2 - (bObj.left + bObj.right) / 2;
          y = a.canvas.height / 2 - (bObj.top + bObj.bottom) / 2;
        }

        this.translateX = x;
        this.translateY = y;
      }
    }, {
      key: "setCenter",
      value: function setCenter(x, y) {
        var translateX = x - this.stage.canvas.width / 2;
        var translateY = y - this.stage.canvas.height / 2;
        this.translateX = -translateX;
        this.translateY = -translateY;
      }
    }, {
      key: "centerAndZoom",
      value: function centerAndZoom(a, b, c) {
        if (a === 'toCenter') {
          this.translateToCenter(c);
          return;
        }

        this.translateToCenter(c);

        if (!a || !b) {
          var bObj = this.getElementsBound();
          var w = bObj.right - bObj.left;
          var h = bObj.bottom - bObj.top;
          var scaleW = this.stage.canvas.width / w;
          var scaleH = this.stage.canvas.height / h;

          if (c) {
            var canvasObj = document.getElementById('canvas');
            var canvasWidth = canvasObj.width;
            var canvasHeight = canvasObj.height;
            w < canvasWidth && (w = canvasWidth);
            h < canvasWidth && (h = canvasHeight);
            scaleW = c.canvas.width / w;
            scaleH = c.canvas.height / h;
          }

          var min = Math.min(scaleW, scaleH);
          if (min > 1) return;
          this.zoom(min, min);
        }

        this.zoom(a, b);
      }
    }, {
      key: "getCenterLocation",
      value: function getCenterLocation() {
        return {
          x: this.stage.canvas.width / 2,
          y: this.stage.canvas.height / 2
        };
      }
    }, {
      key: "doLayout",
      value: function doLayout(fn) {
        fn && fn(this, this.childs);
      }
    }, {
      key: "toJson",
      value: function toJson() {
        var self = this;
        var jsonStr = "{";
        this.serializedProperties.forEach(function (key) {
          "background" === key && (self[key] = self._background.src);
          "string" === typeof self[key] && (self[key] = '"' + self[key] + '"');
          jsonStr += '"' + key + '":' + self[key] + ",";
        });
        jsonStr += '"childs":[';
        var len = this.childs.length;
        this.childs.forEach(function (key, index) {
          jsonStr += key.toJson();
          len > index + 1 && (jsonStr += ",");
        });
        jsonStr += "]";
        jsonStr += "}";
        return jsonStr;
      }
    }, {
      key: "click",
      value: function click(fn) {
        fn ? this.addEventListener('click', fn) : this.dispatchEvent('click');
      }
    }, {
      key: "dbclick",
      value: function dbclick(fn) {
        fn ? this.addEventListener('dbclick', fn) : this.dispatchEvent('dbclick');
      }
    }, {
      key: "mousedown",
      value: function mousedown(fn) {
        fn ? this.addEventListener('mousedown', fn) : this.dispatchEvent('mousedown');
      }
    }, {
      key: "mouseup",
      value: function mouseup(fn) {
        fn ? this.addEventListener('mouseup', fn) : this.dispatchEvent('mouseup');
      }
    }, {
      key: "mouseover",
      value: function mouseover(fn) {
        fn ? this.addEventListener('mouseover', fn) : this.dispatchEvent('mouseover');
      }
    }, {
      key: "mouseout",
      value: function mouseout(fn) {
        fn ? this.addEventListener('mouseout', fn) : this.dispatchEvent('mouseout');
      }
    }, {
      key: "mousemove",
      value: function mousemove(fn) {
        fn ? this.addEventListener('mousemove', fn) : this.dispatchEvent('mousemove');
      }
    }, {
      key: "mousedrag",
      value: function mousedrag(fn) {
        fn ? this.addEventListener('mousedrag', fn) : this.dispatchEvent('mousedrag');
      }
    }, {
      key: "mousewheel",
      value: function mousewheel(fn) {
        fn ? this.addEventListener('mousewheel', fn) : this.dispatchEvent('mousewheel');
      }
    }, {
      key: "touchstart",
      value: function touchstart(fn) {
        fn ? this.addEventListener('touchstart', fn) : this.dispatchEvent('touchstart');
      }
    }, {
      key: "touchmove",
      value: function touchmove(fn) {
        fn ? this.addEventListener('touchmove', fn) : this.dispatchEvent('touchmove');
      }
    }, {
      key: "touchend",
      value: function touchend(fn) {
        fn ? this.addEventListener('touchend', fn) : this.dispatchEvent('touchend');
      }
    }, {
      key: "keydown",
      value: function keydown(fn) {
        fn ? this.addEventListener('keydown', fn) : this.dispatchEvent('keydown');
      }
    }, {
      key: "keyup",
      value: function keyup(fn) {
        fn ? this.addEventListener('keyup', fn) : this.dispatchEvent('keyup');
      }
    }, {
      key: "background",
      get: function get() {
        return this._background;
      },
      set: function set(a) {
        var cc = {};

        if ("string" === typeof a) {
          var b = cc[a];

          if (!b) {
            b = new Image();
            b.src = a;

            b.onload = function () {
              cc[a] = b;
            };
          }

          this._background = b;
        } else {
          this._background = a;
        }
      }
    }]);

    return Scene;
  }(Element);

  var version = "0.0.6";

  var Stage =
  /*#__PURE__*/
  function () {
    function Stage(canvas) {
      _classCallCheck(this, Stage);

      function eagleEye(stage) {
        return {
          hgap: 16,
          visible: false,
          exportCanvas: document.createElement("canvas"),
          getImage: function getImage(width, height) {
            var boundary = stage.getBound();
            var scaleWidth = 1;
            var scaleHeight = 1;
            this.exportCanvas.width = stage.canvas.width;
            this.exportCanvas.height = stage.canvas.height;

            if (width && height) {
              this.exportCanvas.width = width;
              this.exportCanvas.height = height;
              scaleWidth = width / boundary.width;
              scaleHeight = height / boundary.height;
            } else {
              boundary.width > stage.canvas.width && (this.exportCanvas.width = boundary.width);
              boundary.height > stage.canvas.height && (this.exportCanvas.height = boundary.height);
            }

            var ctx = this.exportCanvas.getContext("2d");

            if (stage.childs.length) {
              ctx.save();
              ctx.clearRect(0, 0, this.exportCanvas.width, this.exportCanvas.height);
              stage.childs.forEach(function (scene) {
                if (scene.visible) {
                  scene.save();
                  scene.translateX = 0;
                  scene.translateY = 0;
                  scene.scaleX = 1;
                  scene.scaleY = 1;
                  ctx.scale(scaleWidth, scaleHeight);
                  boundary.left < 0 && (scene.translateX = Math.abs(boundary.left));
                  boundary.top < 0 && (scene.translateY = Math.abs(boundary.top));
                  scene.paintAll = true;
                  scene.repaint(ctx);
                  scene.paintAll = false;
                  scene.restore();
                }
              });
              ctx.restore();
              return this.exportCanvas.toDataURL("image/png");
            }
          },
          canvas: document.createElement("canvas"),
          update: function update() {
            this.eagleImageDatas = this.getData(stage);
          },
          setSize: function setSize(w, h) {
            this.width = this.canvas.width = w;
            this.height = this.canvas.height = h;
          },
          getData: function getData(w, h) {
            var ctx = this.canvas.getContext("2d");
            w && h ? this.setSize(w, h) : this.setSize(200, 160);

            function getTranslateObj(scene) {
              var canvasW = scene.stage.canvas.width;
              var canvasH = scene.stage.canvas.height;
              var x = canvasW / scene.scaleX / 2;
              var y = canvasH / scene.scaleY / 2;
              return {
                translateX: scene.translateX + x - x * scene.scaleX,
                translateY: scene.translateY + y - y * scene.scaleY
              };
            }

            if (stage.childs.length) {
              ctx.save();
              ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
              stage.childs.forEach(function (scene) {
                if (scene.visible) {
                  scene.save();
                  scene.centerAndZoom(null, null, ctx);
                  scene.repaint(ctx, 'eagleEye');
                  scene.restore();
                }
              });
              var translateObj = getTranslateObj(stage.childs[0]);
              var translateX = translateObj.translateX * (this.canvas.width / stage.canvas.width) * stage.childs[0].scaleX;
              var translateY = translateObj.translateY * (this.canvas.height / stage.canvas.height) * stage.childs[0].scaleY;
              var stageBoundary = stage.getBound();

              var _w = stage.canvas.width / stage.childs[0].scaleX / stageBoundary.width;

              var _h = stage.canvas.height / stage.childs[0].scaleY / stageBoundary.height;

              _w > 1 && (_w = 1);
              _h > 1 && (_h = 1);
              translateX *= _w;
              translateY *= _h;
              stageBoundary.left < 0 && (translateX -= Math.abs(stageBoundary.left) * (this.width / stageBoundary.width));
              stageBoundary.top < 0 && (translateY -= Math.abs(stageBoundary.top) * (this.height / stageBoundary.height));
              ctx.save();
              ctx.lineWidth = 1;
              ctx.strokeStyle = 'rgba(255,0,0,1)';
              ctx.strokeRect(-translateX, -translateY, this.canvas.width * _w, this.canvas.height * _h);
              ctx.restore();
              var imgData = null;

              try {
                imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
              } catch (err) {}

              return imgData;
            }

            return null;
          },
          paint: function paint() {
            if (this.eagleImageDatas) {
              var ctx = stage.graphics;
              ctx.save();
              ctx.fillStyle = "rgba(211,211,211,0.3)";
              ctx.fillRect(stage.canvas.width - this.canvas.width - 2 * this.hgap, stage.canvas.height - this.canvas.height - 1, stage.canvas.width - this.canvas.height, this.canvas.height + 1);
              ctx.fill();
              ctx.save();
              ctx.lineWidth = 1;
              ctx.strokeStyle = 'rgba(0,0,0,1)';
              ctx.rect(stage.canvas.width - this.canvas.width - 2 * this.hgap, stage.canvas.height - this.canvas.height - 1, stage.canvas.width - this.canvas.height, this.canvas.height + 1);
              ctx.stroke();
              ctx.restore();
              ctx.putImageData(this.eagleImageDatas, stage.canvas.width - this.canvas.width - this.hgap, stage.canvas.height - this.canvas.height);
              ctx.restore();
            } else {
              this.eagleImageDatas = this.getData(stage);
            }
          },
          eventHandler: function eventHandler(eName, eObj, stage) {
            var eX = eObj.x;
            var eY = eObj.y;

            if (eX > stage.canvas.width - this.canvas.width && eY > stage.canvas.height - this.canvas.height) {
              eX = eObj.x - this.canvas.width;
              eY = eObj.y - this.canvas.height;

              if ("mousedown" === eName) {
                this.lastTranslateX = stage.childs[0].translateX;
                this.lastTranslateY = stage.childs[0].translateY;
              }

              if ("mousedrag" === eName && stage.childs.length > 0) {
                var dx = eObj.dx;
                var dy = eObj.dy;
                var stageBoundary = stage.getBound();
                var x = this.canvas.width / stage.childs[0].scaleX / stageBoundary.width;
                var y = this.canvas.height / stage.childs[0].scaleY / stageBoundary.height;
                stage.childs[0].translateX = this.lastTranslateX - dx / x;
                stage.childs[0].translateY = this.lastTranslateY - dy / y;
              }
            }
          }
        };
      }

      if (canvas) {
        this.initEvent(canvas);
        this.canvas = canvas;
        this.graphics = canvas.getContext("2d");
        this.childs = [];
        this.frames = 24;
        this.eventEmitter = new EventEmitter();
        this.eagleEye = eagleEye(this);
        this.wheelZoom = null;
        this.mouseDownX = 0;
        this.mouseDownY = 0;
        this.mouseDown = false;
        this.mouseOver = false;
        this.needRepaint = true;
        this.serializedProperties = ["frames", "wheelZoom"];
        this.mode = '';
      }
    }

    _createClass(Stage, [{
      key: "initEvent",
      value: function initEvent(ele) {
        var self = this;
        var timer = null;
        var isShowContextmenu = true;

        document.oncontextmenu = function () {
          return isShowContextmenu;
        };

        function getEventObj(e) {
          var eObj = getEventPosition(e);
          var offsetPosObj = getOffsetPosition(canvas);
          eObj.offsetLeft = eObj.pageX - offsetPosObj.left;
          eObj.offsetTop = eObj.pageY - offsetPosObj.top;
          eObj.x = eObj.offsetLeft;
          eObj.y = eObj.offsetTop;
          eObj.target = null;
          return eObj;
        }

        ele.addEventListener("mouseout", function (e) {
          timer = setTimeout(function () {
            isShowContextmenu = true;
          }, 500);

          document.onselectstart = function () {
            return true;
          };

          var eObj = getEventObj(e);
          self.dispatchEventToScenes("mouseout", eObj);
          self.dispatchEvent("mouseout", eObj);
          self.needRepaint = !!self.animate;
        });
        ele.addEventListener("mouseover", function (e) {
          document.onselectstart = function () {
            return false;
          };

          self.mouseOver = true;
          var eventObj = getEventObj(e);
          self.dispatchEventToScenes("mouseover", eventObj);
          self.dispatchEvent("mouseover", eventObj);
        });
        ele.addEventListener("mousedown", function (e) {
          var eObj = getEventObj(e);
          self.mouseDown = true;
          self.mouseDownX = eObj.x;
          self.mouseDownY = eObj.y;
          self.dispatchEventToScenes("mousedown", eObj);
          self.dispatchEvent("mousedown", eObj);
        });
        ele.addEventListener("mouseup", function (e) {
          var eObj = getEventObj(e);
          self.dispatchEventToScenes("mouseup", eObj);
          self.dispatchEvent("mouseup", eObj);
          self.mouseDown = false;
          self.needRepaint = !!self.animate;
        });
        ele.addEventListener("mousemove", function (e) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }

          isShowContextmenu = false;
          var eObj = getEventObj(e);

          if (self.mouseDown) {
            if (0 === e.button) {
              eObj.dx = eObj.x - self.mouseDownX;
              eObj.dy = eObj.y - self.mouseDownY;
              self.dispatchEventToScenes("mousedrag", eObj);
              self.dispatchEvent("mousedrag", eObj);
              self.eagleEye.visible && self.eagleEye.update();
            }
          } else {
            self.dispatchEventToScenes("mousemove", eObj);
            self.dispatchEvent("mousemove", eObj);
          }
        });
        ele.addEventListener("click", function (e) {
          var eObj = getEventObj(e);
          self.dispatchEventToScenes("click", eObj);
          self.dispatchEvent("click", eObj);
        });
        ele.addEventListener("dblclick", function (e) {
          var eObj = getEventObj(e);
          self.dispatchEventToScenes("dbclick", eObj);
          self.dispatchEvent("dbclick", eObj);
        });
        ele.addEventListener("mousewheel", function (e) {
          var eObj = getEventObj(e);
          self.dispatchEventToScenes("mousewheel", eObj);
          self.dispatchEvent("mousewheel", eObj);

          if (self.wheelZoom) {
            if (e.preventDefault) {
              e.preventDefault();
            } else {
              e = e || window.event;
              e.returnValue = false;
            }

            self.eagleEye.visible && self.eagleEye.update();
          }
        });
        window.addEventListener("keydown", function (e) {
          self.dispatchEventToScenes("keydown", cloneEvent(e));
          var keyCode = e.keyCode;

          if (37 === keyCode || 38 === keyCode || 39 === keyCode || 40 === keyCode) {
            if (e.preventDefault) {
              e.preventDefault();
            } else {
              e = e || window.event;
              e.returnValue = false;
            }
          }
        }, true);
        window.addEventListener("keyup", function (e) {
          self.dispatchEventToScenes("keyup", cloneEvent(e));
          var keyCode = e.keyCode;

          if (37 === keyCode || 38 === keyCode || 39 === keyCode || 40 === keyCode) {
            if (e.preventDefault) {
              e.preventDefault();
            } else {
              e = e || window.event;
              e.returnValue = false;
            }
          }
        }, true); // TODO: need to optimizate

        !function hahaha() {
          if (!self.frames) {
            setTimeout(hahaha, 100);
          } else {
            if (self.frames < 0) {
              self.repaint();
              setTimeout(hahaha, 1e3 / -self.frames);
            } else {
              self.repaint();
              setTimeout(hahaha, 1e3 / self.frames);
            }
          }
        }();
        setTimeout(function () {
          self.mousewheel(function (a) {
            var b = !a.wheelDelta ? a.detail : a.wheelDelta;
            this.wheelZoom && (b > 0 ? this.zoomIn(this.wheelZoom) : this.zoomOut(this.wheelZoom));
          });
          self.paint();
        }, 300);
        setTimeout(function () {
          self.paint();
        }, 1e3);
        setTimeout(function () {
          self.paint();
        }, 3e3);
      }
    }, {
      key: "dispatchEventToScenes",
      value: function dispatchEventToScenes(eName, eObj) {
        this.frames && (this.needRepaint = true);

        if (this.eagleEye.visible && -1 !== eName.indexOf("mouse")) {
          var eX = eObj.x;
          var eY = eObj.y;

          if (eX > this.width - this.eagleEye.width && eY > this.height - this.eagleEye.height) {
            this.eagleEye.eventHandler(eName, eObj, this);
            return;
          }
        }

        this.childs.forEach(function (scene) {
          if (scene.visible) {
            var eHandler = scene[eName + "Handler"];

            if (!eHandler) {
              throw new Error("Function not found:" + eName + "Handler");
            }

            eHandler.call(scene, eObj);
          }
        });
      }
    }, {
      key: "add",
      value: function add(scene) {
        for (var i = 0, len = this.childs.length; i < len; i++) {
          if (this.childs[i] === scene) return;
        }

        scene.addTo(this);
        this.childs.push(scene);
      }
    }, {
      key: "remove",
      value: function remove(scene) {
        if (!scene) {
          throw new Error("the argument of Stage.remove cannot be null!");
        }

        for (var i = 0, len = this.childs.length; i < len; i++) {
          if (this.childs[i] === scene) {
            scene.stage = null;
            this.childs = this.childs.del(i);
          }
        }

        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.childs = [];
      }
    }, {
      key: "addEventListener",
      value: function addEventListener(eName, cb) {
        var self = this;

        var fn = function fn(eObj) {
          cb.call(self, eObj);
        };

        this.eventEmitter.subscribe(eName, fn);
        return this;
      }
    }, {
      key: "removeEventListener",
      value: function removeEventListener(eName) {
        this.eventEmitter.unsubscribe(eName);
      }
    }, {
      key: "removeAllEventListener",
      value: function removeAllEventListener() {
        this.eventEmitter = new EventEmitter();
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(eName, eObj) {
        this.eventEmitter.publish(eName, eObj);
        return this;
      }
    }, {
      key: "saveImageInfo",
      value: function saveImageInfo(w, h) {
        var dataUrl = this.eagleEye.getImage(w, h);
        var newWindow = window.open("about:blank");
        newWindow.document.write("<img src='" + dataUrl + "' alt='from canvas'/>");
        return this;
      }
    }, {
      key: "saveAsLocalImage",
      value: function saveAsLocalImage(w, h) {
        var dataUrl = this.eagleEye.getImage(w, h);
        dataUrl.replace("image/png", "image/octet-stream");
        window.location.href = dataUrl;
        return this;
      }
    }, {
      key: "paint",
      value: function paint() {
        var self = this;

        if (self.canvas) {
          self.graphics.save();
          self.graphics.clearRect(0, 0, self.width, self.height);
          self.childs.forEach(function (scene) {
            scene.visible && scene.repaint(self.graphics);
          });
          self.eagleEye.visible && self.eagleEye.paint(self);
          self.graphics.restore();
        }
      }
    }, {
      key: "repaint",
      value: function repaint() {
        if (this.frames) {
          if (this.frames || this.needRepaint) {
            this.paint();
            this.frames < 0 && (this.needRepaint = false);
          }
        }
      }
    }, {
      key: "zoom",
      value: function zoom(scale) {
        this.childs.forEach(function (scene) {
          scene.visible && scene.zoom(scale);
        });
      }
    }, {
      key: "zoomOut",
      value: function zoomOut(scale) {
        this.childs.forEach(function (scene) {
          scene.visible && scene.zoomOut(scale);
        });
      }
    }, {
      key: "zoomIn",
      value: function zoomIn(scale) {
        this.childs.forEach(function (scene) {
          scene.visible && scene.zoomIn(scale);
        });
      }
    }, {
      key: "zoomReset",
      value: function zoomReset() {
        this.childs.forEach(function (scene) {
          scene.visible && scene.zoomReset();
        });
      }
    }, {
      key: "centerAndZoom",
      value: function centerAndZoom() {
        this.childs.forEach(function (scene) {
          scene.visible && scene.centerAndZoom();
        });
      }
    }, {
      key: "setCenter",
      value: function setCenter(x, y) {
        this.childs.forEach(function (scene) {
          var translateX = x - this.canvas.width / 2;
          var translateY = y - this.canvas.height / 2;
          scene.translateX = -translateX;
          scene.translateY = -translateY;
        });
      }
    }, {
      key: "getBound",
      value: function getBound() {
        var allSceneBoundary = {
          left: Number.MAX_VALUE,
          right: Number.MIN_VALUE,
          top: Number.MAX_VALUE,
          bottom: Number.MIN_VALUE
        };
        this.childs.forEach(function (scene) {
          var allEleBoundary = scene.getElementsBound();

          if (allEleBoundary.left < allSceneBoundary.left) {
            allSceneBoundary.left = allEleBoundary.left;
            allSceneBoundary.leftNode = allEleBoundary.leftNode;
          }

          if (allEleBoundary.top < allSceneBoundary.top) {
            allSceneBoundary.top = allEleBoundary.top;
            allSceneBoundary.topNode = allEleBoundary.topNode;
          }

          if (allEleBoundary.right > allSceneBoundary.right) {
            allSceneBoundary.right = allEleBoundary.right;
            allSceneBoundary.rightNode = allEleBoundary.rightNode;
          }

          if (allEleBoundary.bottom > allSceneBoundary.bottom) {
            allSceneBoundary.bottom = allEleBoundary.bottom;
            allSceneBoundary.bottomNode = allEleBoundary.bottomNode;
          }
        });
        allSceneBoundary.width = allSceneBoundary.right - allSceneBoundary.left;
        allSceneBoundary.height = allSceneBoundary.bottom - allSceneBoundary.top;
        return allSceneBoundary;
      }
    }, {
      key: "toJson",
      value: function toJson() {
        var self = this;
        var jsonStr = '{"version":"' + version + '",';
        this.serializedProperties.forEach(function (prop) {
          var val = self[prop];
          "string" === typeof val && (val = '"' + val + '"');
          jsonStr += '"' + prop + '":' + val + ",";
        });
        jsonStr += '"childs":[';
        this.childs.forEach(function (a) {
          jsonStr += a.toJson();
        });
        jsonStr += "]";
        jsonStr += "}";
        return jsonStr;
      }
    }, {
      key: "find",
      value: function (_find) {
        function find(_x) {
          return _find.apply(this, arguments);
        }

        find.toString = function () {
          return _find.toString();
        };

        return find;
      }(function (cbOrCond) {
        var eNameArr1 = "click,mousedown,mouseup,mouseover,mouseout,mousedrag,keydown,keyup".split(",");

        function getFilteredScenes(scenes, filterCond) {
          var arr = [];
          if (!scenes.length) return arr;
          var reArr = filterCond.match(/^\s*(\w+)\s*$/);

          if (reArr) {
            var result = scenes.filter(function (scene) {
              return scene.elementType === reArr[1];
            });
            result && result.length && (arr = arr.concat(result));
          } else {
            var sign = false;
            reArr = filterCond.match(/\s*(\w+)\s*\[\s*(\w+)\s*([>=<])\s*['"](\S+)['"]\s*]\s*/);

            if (!reArr || reArr.length < 5) {
              reArr = filterCond.match(/\s*(\w+)\s*\[\s*(\w+)\s*([>=<])\s*(\d+(\.\d+)?)\s*]\s*/);
              sign = true;
            }

            if (reArr && reArr.length >= 5) {
              var eleType = reArr[1];
              var h = reArr[2];
              var i = reArr[3];
              var j = reArr[4];
              eNameArr1 = scenes.filter(function (scene) {
                if (scene.elementType !== eleType) return false;
                var b = scene[h];
                sign && (b = parseInt(b));

                switch (i) {
                  case '=':
                    return b === j;

                  case '>':
                    return b > j;

                  case '<':
                    return j > b;

                  case '<=':
                    return j >= b;

                  case '>=':
                    return b >= j;

                  case '!=':
                    return b !== j;

                  default:
                    return false;
                }
              });
              eNameArr1 && eNameArr1.length && (arr = arr.concat(eNameArr1));
            }
          }

          return arr;
        }

        function getFinalFilteredScenes(filteredScenes) {
          filteredScenes.find = function (scene) {
            return find.call(this, scene);
          };

          eNameArr1.forEach(function (eName) {
            filteredScenes[eName] = function (a) {
              for (var i = 0; i < this.length; i++) {
                this[i][eName](a);
              }

              return this;
            };
          });

          if (filteredScenes.length) {
            var firstScene = filteredScenes[0];

            var _loop = function _loop(k) {
              var v = firstScene[k];
              "function" === typeof v && !function (fn) {
                filteredScenes[k] = function () {
                  var c = [];

                  for (var i = 0; i < filteredScenes.length; i++) {
                    c.push(fn.apply(filteredScenes[i], arguments));
                  }

                  return c;
                };
              }(v);
            };

            for (var k in firstScene) {
              _loop(k);
            }
          }

          filteredScenes.attr = function (k, v) {
            if (k && v) {
              for (var i = 0; i < this.length; i++) {
                this[i][k] = v;
              }
            } else {
              if (k && "string" === typeof k) {
                var d = [];

                for (var _i = 0; _i < this.length; _i++) {
                  d.push(this[_i][k]);
                }

                return d;
              }

              if (k) {
                for (var _i2 = 0; _i2 < this.length; _i2++) {
                  for (var e in k) {
                    this[_i2][e] = k[e];
                  }
                }
              }
            }

            return this;
          };

          return filteredScenes;
        }

        var scenes = [];
        var scenes1 = [];

        if (this instanceof Stage) {
          scenes = this.childs;
          scenes1 = scenes1.concat(scenes);
        } else {
          this instanceof Scene ? scenes = [this] : scenes1 = this;
          scenes.forEach(function (a) {
            scenes1 = scenes1.concat(a.childs);
          });
        }

        var filteredScenes = "function" === typeof cbOrCond ? scenes1.filter(cbOrCond) : getFilteredScenes(scenes1, cbOrCond);
        return getFinalFilteredScenes(filteredScenes);
      })
    }, {
      key: "click",
      value: function click(fn) {
        fn ? this.addEventListener('click', fn) : this.dispatchEvent('click');
      }
    }, {
      key: "dbclick",
      value: function dbclick(fn) {
        fn ? this.addEventListener('dbclick', fn) : this.dispatchEvent('dbclick');
      }
    }, {
      key: "mousedown",
      value: function mousedown(fn) {
        fn ? this.addEventListener('mousedown', fn) : this.dispatchEvent('mousedown');
      }
    }, {
      key: "mouseup",
      value: function mouseup(fn) {
        fn ? this.addEventListener('mouseup', fn) : this.dispatchEvent('mouseup');
      }
    }, {
      key: "mouseover",
      value: function mouseover(fn) {
        fn ? this.addEventListener('mouseover', fn) : this.dispatchEvent('mouseover');
      }
    }, {
      key: "mouseout",
      value: function mouseout(fn) {
        fn ? this.addEventListener('mouseout', fn) : this.dispatchEvent('mouseout');
      }
    }, {
      key: "mousemove",
      value: function mousemove(fn) {
        fn ? this.addEventListener('mousemove', fn) : this.dispatchEvent('mousemove');
      }
    }, {
      key: "mousedrag",
      value: function mousedrag(fn) {
        fn ? this.addEventListener('mousedrag', fn) : this.dispatchEvent('mousedrag');
      }
    }, {
      key: "mousewheel",
      value: function mousewheel(fn) {
        fn ? this.addEventListener('mousewheel', fn) : this.dispatchEvent('mousewheel');
      }
    }, {
      key: "touchstart",
      value: function touchstart(fn) {
        fn ? this.addEventListener('touchstart', fn) : this.dispatchEvent('touchstart');
      }
    }, {
      key: "touchmove",
      value: function touchmove(fn) {
        fn ? this.addEventListener('touchmove', fn) : this.dispatchEvent('touchmove');
      }
    }, {
      key: "touchend",
      value: function touchend(fn) {
        fn ? this.addEventListener('touchend', fn) : this.dispatchEvent('touchend');
      }
    }, {
      key: "keydown",
      value: function keydown(fn) {
        fn ? this.addEventListener('keydown', fn) : this.dispatchEvent('keydown');
      }
    }, {
      key: "keyup",
      value: function keyup(fn) {
        fn ? this.addEventListener('keyup', fn) : this.dispatchEvent('keyup');
      }
    }, {
      key: "width",
      get: function get() {
        return this.canvas.width;
      }
    }, {
      key: "height",
      get: function get() {
        return this.canvas.height;
      }
    }, {
      key: "cursor",
      set: function set(shape) {
        this.canvas.style.cursor = shape;
      },
      get: function get() {
        return this.canvas.style.cursor;
      }
    }, {
      key: "mode",
      set: function set(m) {
        this.childs.forEach(function (scene) {
          scene.mode = m;
        });
      }
    }]);

    return Stage;
  }();

  function b(fn, interval) {
    var timer;
    var eventEmitter = null;
    return {
      stop: function stop() {
        if (timer) {
          clearInterval(timer);
          eventEmitter && eventEmitter.publish("stop");
        }

        return this;
      },
      start: function start() {
        var self = this;
        timer = setInterval(function () {
          fn.call(self);
        }, interval);
        return this;
      },
      onStop: function onStop(fn) {
        !eventEmitter && (eventEmitter = new EventEmitter());
        eventEmitter.subscribe("stop", fn);
        return this;
      }
    };
  }

  var Effect =
  /*#__PURE__*/
  function () {
    function Effect() {
      _classCallCheck(this, Effect);
    }

    _createClass(Effect, [{
      key: "spring",
      value: function spring(obj) {
        !obj && (obj = {});
        var spring = obj.spring || .1;
        var friction = obj.friction || .8;
        var grivity = obj.grivity || 0;
        var minLength = obj.minLength || 0;
        return {
          items: [],
          timer: null,
          isPause: false,
          addNode: function addNode(node, targetNode) {
            var item = {
              node: node,
              target: targetNode,
              vx: 0,
              vy: 0
            };
            this.items.push(item);
            return this;
          },
          play: function play(time) {
            this.stop();
            time = time ? time : 1e3 / 24;
            var self = this;
            this.timer = setInterval(function () {
              self.nextFrame();
            }, time);
          },
          stop: function stop() {
            this.timer && clearInterval(this.timer);
          },
          nextFrame: function nextFrame() {
            for (var i = 0; i < this.items.length; i++) {
              var item = this.items[i];
              var node = item.node;
              var target = item.target;
              var vx = item.vx;
              var vy = item.vy;
              var x = target.x - node.x;
              var y = target.y - node.y;
              var m = Math.atan2(y, x);

              if (minLength) {
                var n = target.x - Math.cos(m) * minLength;
                var o = target.y - Math.sin(m) * minLength;
                vx += (n - node.x) * spring;
                vy += (o - node.y) * spring;
              } else {
                vx += x * spring;
                vy += y * spring;
              }

              vx *= friction;
              vy *= friction;
              vy += grivity;
              node.x += vx;
              node.y += vy;
              item.vx = vx;
              item.vy = vy;
            }
          }
        };
      }
    }, {
      key: "gravity",
      value: function gravity(a, c) {
        c = c || {};
        var d = c.gravity || .1;
        var e = c.dx || 0;
        var f = c.dy || 5;
        var g = c.stop;
        var interval = c.interval || 30;
        return new b(function () {
          if (g && g()) {
            f = .5;
            this.stop();
          } else {
            f += d;
            a.setLocation(a.x + e, a.y + f);
          }
        }, interval);
      }
    }]);

    return Effect;
  }();

  var PTopo$1 = Object.assign({
    version: version,
    createStageFromJson: function createStageFromJson(jsonStr, canvas) {
      var jsonObj = JSON.parse(jsonStr);
      var stage = new Stage(canvas);

      for (var key in jsonObj) {
        'childs' !== key && (stage[key] = jsonObj[key]);
      }

      var scenes = jsonObj.childs;
      scenes.forEach(function (scene) {
        var sceneInstance = new Scene(stage);

        for (var key1 in scene) {
          "childs" !== key1 && (sceneInstance[key1] = scene[key1]);
          "background" === key1 && (sceneInstance.background = scene[key1]);
        }

        var nodes = scene.childs;
        nodes.forEach(function (node) {
          var newNode = null;
          var elementType = node.elementType;
          'node' === elementType ? newNode = new Node$1() : 'CircleNode' === elementType && (newNode = new CircleNode());

          for (var i in node) {
            newNode[i] = node[i];
          }

          sceneInstance.add(newNode);
        });
      });
      return stage;
    }
  }, _objectSpread({
    EventEmitter: EventEmitter,
    util: util
  }, Element$1, Link$1, Node$1, {
    Container: Container,
    Scene: Scene,
    Stage: Stage,
    Layout: Layout,
    Effect: Effect,
    Animate: Animate
  }));
  window.PTopo = PTopo$1;

})));
