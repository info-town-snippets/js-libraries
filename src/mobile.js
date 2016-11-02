/**
 * Mobile
 *
 * モバイル固有の基本処理を提供しています。
 *
 * @class Mobile
 */
export default (function () {
	/**
	 * モバイルメニュー設定
	 * 
	 * @method setMenu
	 * @public
	 * @param {jQuery} toggle メニュー開閉機構のjQueryオブジェクトです。
	 * @param {jQuery} body メニュー本体のラッパーオブジェクトです。
	 */
	function setMenu( toggle, body ) {
		$(toggle).on( 'click', function () {
			$( this ).toggleClass( 'active' );
			const display = body.css( "display" );
			if ( "none" === display ) {
				body.fadeToggle( 600, 'swing' );
			}
			if ( "block" === display ) {
				body.fadeToggle( 600, 'swing' );
			}
		} );
	}

	function setBreakPoint(toggle, body) {
		$( window ).on( 'resize', function () {
			if ( $( window ).width() < 768 ) {
				$( ".site-nav__item a" ).on( 'click', function () {
					$( ".site-nav__body" ).hide();
					$( ".site-nav__close" ).hide();
				} );
			}
		} );
	}
	return {
		setMenu: setMenu
	}
}());