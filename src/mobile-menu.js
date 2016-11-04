/**
 * Mobile
 *
 * モバイル固有の基本処理を提供しています。
 *
 * @class Mobile
 */
export default (function () {
	/**
	 * 初期化
	 *
	 * @method init
	 * @private
	 * @param {jQuery} toggle メニュー開閉機構のjQueryオブジェクトです。
	 * @param {jQuery} body メニュー本体のラッパーオブジェクトです。
	 */
	function init( toggle, body ) {
		$( toggle ).on( "click", function () {
			$( this ).toggleClass( "active" );
			const display = body.css( "display" );
			if ( "none" === display ) {
				body.fadeToggle( 600, "swing" );
			}
			if ( "block" === display ) {
				body.fadeToggle( 600, "swing" );
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
	 */
	function close( toggle, body ) {
		$( "a", body ).on( 'click', function () {
			$( body ).hide();
			$( toggle ).toggleClass( "active" );
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
	function set( toggle, body ) {
		init( toggle, body );
		close( toggle, body );
	}

	/**
	 * リサイズ処理
	 *
	 * @method set
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