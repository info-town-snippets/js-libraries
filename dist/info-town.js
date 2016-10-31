(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

/**
 * @module InfoTown
 */
/**
 * Centerオブジェクト
 *
 * 要素を親要素の中央へ配置するための各種メソッドを提供します。
 *
 * @class Center
 */
exports.default = function () {
	/**
  *  中央配置
  *
  *  CSSの絶対配置を使い親要素の中央へ配置します。
  *
  *  @method center
  *  @public
  *  @param {jQuery} target 中央配置するjQueryオブジェクトです。
  *  @param {jQuery} parent 親要素のjQueryオブジェクトです。
  *  @param {Object} [offset] センターからのオフセット値です。
  *    @param {Number} [offset.top] Y座標のオフセット値を指定します。
  *    @param {Number} [offset.left] X座標のオフセット値を指定します。
  *  @return {Object} 設定したtop, leftの値を返します。
  */
	function center(target, parent, offset) {
		var width, height, parentWidth, parentHeight, parentCssPos, offsetX, offsetY;

		target = target instanceof jQuery ? target : $(target);
		parent = parent || target.parent().get(0);
		parent = parent instanceof jQuery ? parent : $(parent);

		width = target.width();
		height = target.height();

		/* 要素親のサイズとpositionプロパティ設定 */
		if (parent.get(0) === $('body').get(0)) {
			/* 親要素がbody */
			parentWidth = $(window).width();
			parentHeight = $(window).height();
		} else {
			/* 親要素がbody以外 */
			parentWidth = parent.width();
			parentHeight = parent.height();
			parentCssPos = parent.css('position');
			if (parentCssPos !== 'absolute' && parentCssPos !== 'relative') {
				parent.css({
					position: 'relative'
				});
			}
		}
		/* オフセット */
		offsetX = (parentWidth - width) / 2;
		offsetY = (parentHeight - height) / 2;
		if (typeof offset !== "undefined") {
			offsetX = offset.left !== "undefined" && typeof offset.left === "number" ? offsetX + offset.left : offsetX;
			offsetY = offset.top !== "undefined" && typeof offset.top === "number" ? offsetY + offset.top : offsetY;
		}
		target.css({
			position: 'absolute',
			top: offsetY,
			left: offsetX
		});
		return {
			top: offsetY,
			left: offsetX
		};
	}

	/**
  *  オフセット取得
  *
  *  target要素をparent要素の中央へ配置するために
  *  CSSのtop, leftプロパティへ設定すべき値を取得します。
  *
  *  @method getOffset
  *  @public
  *  @param {jQuery} target 中央配置するjQueryオブジェクトです。
  *  @param {jQuery} parent 親のjQueryオブジェクトです。
  *  @return {Object} CSSのtop, leftプロパティへ設定すべき値を返します。
  */
	function getOffset(target, parent) {
		var width, height, parentWidth, parentHeight;
		target = target instanceof jQuery ? target : $(target);
		if (typeof parent === "undefined") {
			parent = $("body");
		} else {
			parent = parent instanceof jQuery ? parent : $(parent);
		}
		/* 要素のサイズ取得 */
		width = target.width();
		height = target.height();
		/* 要素親のサイズ取得 */
		parentWidth = parent.width();
		parentHeight = parent.height();
		/* オフセット */
		return {
			"x": (parentWidth - width) / 2,
			"y": (parentHeight - height) / 2
		};
	}

	/* パブリックメソッド */
	return {
		center: center,
		getOffset: getOffset
	};
}();

},{}],2:[function(require,module,exports){
'use strict';

var _center = require('./center.js');

var _center2 = _interopRequireDefault(_center);

var _scroll = require('./scroll.js');

var _scroll2 = _interopRequireDefault(_scroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.InfoTown = {
	center: _center2.default,
	scroll: _scroll2.default
};

},{"./center.js":1,"./scroll.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

/**
 * @module InfoTown
 */
/**
 * Scrollオブジェクト
 *
 * スクロールを管理します。
 *
 * @class Scroll
 */
exports.default = function () {
	/**
  * スクロール
  *
  * 引数で指定したオブジェクト上端へスクロールします。
  *
  * @method scroll
  * @public
  * @param {Object} params key/value pair
  *  @param {jQuery} params.target スクロール先のjQueryオブジェクトです。
  *  @param {int} params.speed スクロールのスピードです。
  * @param {Function} [callback] スクロール完了後のコールバック関数です。
  * @returns {boolean} デフォルト処理をキャンセルするためfalseを返します。
  */
	function scroll(params, callback) {
		var target, speed, position;
		params.target = params.target || $('html');
		target = params.target instanceof jQuery ? params.target : $(params.target);
		speed = params.speed || 400;
		position = target.offset().top;
		if (typeof callback !== 'undefined' && typeof callback === 'function') {
			$('body,html').animate({ scrollTop: position }, speed, 'swing', callback);
		} else {
			$('body,html').animate({ scrollTop: position }, speed, 'swing');
		}
		return false;
	}

	/* パブリックメソッド */
	return {
		scroll: scroll
	};
}();

},{}]},{},[2]);
