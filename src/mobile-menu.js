/**
 * Mobile
 *
 * モバイル固有の基本処理を提供しています。
 *
 * @class MobileMenu
 * @module InfoTown
 */
export default (function () {
	/**
	 * 初期化
	 *
	 * @method init
	 * @private
	 * @param {jQuery} toggle メニュー開閉機構のjQueryオブジェクトです。
	 * @param {jQuery} body メニュー本体のラッパーオブジェクトです。
	 * @param {String} cssName メニュー表示させるためのクラス名です。
	 */
	function init( toggle, body, cssName ) {
		$( toggle ).on( 'click', function () {
			$( this ).toggleClass( cssName );
			const display = body.css( 'display' );
			if ( 'none' === display ) {
				body.fadeToggle( 600, 'swing' );
			}
			if ( 'block' === display ) {
				body.fadeToggle( 600, 'swing' );
			}
		} );
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
	function close( toggle, body, cssName ) {
		$( 'a', body ).on( 'click', function () {
			$( body ).hide();
			$( toggle ).toggleClass( cssName );
		} );
	}

	/**
	 * 設定
	 *
	 * @method set
	 * @public
	 * @param {jQuery} toggle メニュー開閉機構のjQueryオブジェクトです。
	 * @param {jQuery} body メニュー本体のラッパーオブジェクトです。
	 */
	function set( toggle, body, cssName ) {
		init( toggle, body, cssName );
		close( toggle, body, cssName );
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
	function setResize( toggle, body, breakpoint ) {
		$( window ).on( 'resize', function () {
			if ( $( window ).width() < breakpoint ) {
				$( toggle ).show();
				$( body ).show();
			}
		} );
	}

	return {
		set: set,
		setResize: setResize
	}
}());