(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

/**
 * Centerオブジェクト
 *
 * 要素を親要素の中央へ配置するための各種メソッドを提供します。
 *
 * @class Center
 * @module InfoTown
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

var _mobileMenu = require('./mobile-menu.js');

var _mobileMenu2 = _interopRequireDefault(_mobileMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.InfoTown = {
	center: _center2.default,
	scroll: _scroll2.default,
	mobileMenu: _mobileMenu2.default
};

},{"./center.js":1,"./mobile-menu.js":3,"./scroll.js":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

/**
 * Mobile
 *
 * モバイル固有の基本処理を提供しています。
 *
 * @class MobileMenu
 * @module InfoTown
 */
exports.default = function () {
	/**
  * 初期化
  *
  * @method init
  * @private
  * @param {jQuery} toggle メニュー開閉機構のjQueryオブジェクトです。
  * @param {jQuery} body メニュー本体のラッパーオブジェクトです。
  * @param {String} cssName メニュー表示させるためのクラス名です。
  */
	function init(toggle, body, cssName) {
		$(toggle).on('click', function () {
			$(this).toggleClass(cssName);
			var display = body.css('display');
			if ('none' === display) {
				body.fadeToggle(600, 'swing');
			}
			if ('block' === display) {
				body.fadeToggle(600, 'swing');
			}
		});
	}

	/**
  * 閉じる設定
  *
  * @method close
  * @private
  * @param {jQuery} toggle メニュー開閉機構のjQueryオブジェクトです。
  * @param {jQuery} body メニュー本体のラッパーオブジェクトです。
  * @param {String} cssName メニュー非表示させるための削除するクラス名です。
  */
	function close(toggle, body, cssName) {
		$('a', body).on('click', function () {
			$(body).hide();
			$(toggle).toggleClass(cssName);
		});
	}

	/**
  * 設定
  *
  * @method set
  * @public
  * @param {jQuery} toggle メニュー開閉機構のjQueryオブジェクトです。
  * @param {jQuery} body メニュー本体のラッパーオブジェクトです。
  */
	function set(toggle, body, cssName) {
		init(toggle, body, cssName);
		close(toggle, body, cssName);
	}

	/**
  * リサイズ処理
  *
  * @method setResize
  * @public
  * @param {jQuery} toggle メニュー開閉機構のjQueryオブジェクトです。
  * @param {jQuery} body メニュー本体のラッパーオブジェクトです。
  * @param {Number} breakpoint ブレークポイントです。
  */
	function setResize(toggle, body, breakpoint) {
		$(window).on('resize', function () {
			if ($(window).width() < breakpoint) {
				$(toggle).show();
				$(body).show();
			}
		});
	}

	return {
		set: set,
		setResize: setResize
	};
}();

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

/**
 * Scrollオブジェクト
 *
 * スクロールを管理します。
 *
 * @class Scroll
 * @module InfoTown
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
		var target = void 0,
		    speed = void 0,
		    position = void 0;
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

	/**
  * アンカーに対してページ内スクロール設定
  *
  * @method anchor
  * @public
  * @param {Boolean} isScroll ページ内スクロールを設定するときはtrueを指定します。
  */
	function anchor(isScroll) {
		if (isScroll) {
			$('a[href^="#"]').on('click', function () {
				var speed = 400;
				var href = $(this).attr('href');
				var target = $(href === '#' || href === '' ? 'html' : href);
				var position = target.offset().top;
				$('body,html').animate({ scrollTop: position }, speed, 'swing');
				return false;
			});
		}
	}

	/**
  * スクロールスパイ
  *
  * スクロールを監視します。
  *
  * @method scrollSpy
  * @public
  * @param {Array} toggle スクロールを受けて変化するトッグルのjQueryオフジェクトの配列です。
  * @param {Array} targets 監視対象のjQueryオブジェクトです。
  * @returns {Function} スクロールイベントへ設定する関数です。
  */
	function scrollSpy(toggle, targets) {
		var props = [];
		targets.forEach(function (elem, index) {
			props.push({ 'id': $(toggle[index]).attr('id'), 'top': $(elem).offset().top });
		});
		return function () {
			var scroll = $(document).scrollTop();
			$(toggle).each(function () {
				$(this).removeClass('scroll-toggle-active');
			});
			for (var i = 0; i < props.length; i++) {
				if (i == 0) {
					if (scroll >= 0 && scroll < props[i + 1].top) {
						$('#' + props[i].id).addClass("scroll-toggle-active");
					}
				} else if (i == props.length - 1) {
					if (scroll >= props[i].top) {
						$('#' + props[i].id).addClass("scroll-toggle-active");
					}
				} else {
					if (scroll >= props[i].top && scroll < props[i + 1].top) {
						$('#' + props[i].id).addClass("scroll-toggle-active");
					}
				}
			}
		};
	}

	/**
  * 2ndビュー設定
  *
  * @method show2ndView
  * @public
  * @param elem
  * @param className
  */
	function show2ndView(elem, className) {
		var scrollValue = $(window).scrollTop();
		var windowHeight = $(window).height();
		elem = elem instanceof jQuery ? elem : $(elem);
		if (scrollValue >= windowHeight) {
			if (!elem.hasClass(className)) {
				elem.addClass(className);
			}
		} else {
			if (elem.hasClass(className)) {
				elem.removeClass(className);
			}
		}
	}

	/* パブリックメソッド */
	return {
		scroll: scroll,
		anchor: anchor,
		scrollSpy: scrollSpy,
		show2ndView: show2ndView
	};
}();

},{}]},{},[2]);
