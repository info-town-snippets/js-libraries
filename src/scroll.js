/**
 * Scrollオブジェクト
 *
 * スクロールを管理します。
 *
 * @class Scroll
 * @module InfoTown
 */
export default (function () {
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
	function scroll( params, callback ) {
		let target, speed, position;
		params.target = params.target || $( 'html' );
		target = (params.target instanceof jQuery) ? params.target : $( params.target );
		speed = params.speed || 400;
		position = target.offset().top;
		if ( typeof callback !== 'undefined' && typeof callback === 'function' ) {
			$( 'body,html' ).animate( { scrollTop: position }, speed, 'swing', callback );
		} else {
			$( 'body,html' ).animate( { scrollTop: position }, speed, 'swing' );
		}
		return false;
	}

	/**
	 * アンカーに対してページ内スクロール設定
	 */
	function anchor( isScroll ) {
		if ( isScroll ) {
			$( 'a[href^="#"]' ).on( 'click', function () {
				const speed = 400;
				let href = $( this ).attr( 'href' );
				let target = $( href === '#' || href === '' ? 'html' : href );
				let position = target.offset().top;
				$( 'body,html' ).animate( { scrollTop: position }, speed, 'swing' );
				return false;
			} );
		}
	}

	function show2ndView( elem, className ) {
		const scrollValue = $( window ).scrollTop();
		const windowHeight = $( window ).height();
		elem = (elem instanceof jQuery) ? elem : $( elem );
		if ( scrollValue > windowHeight ) {
			if ( !elem.hasClass( className ) ) {
				elem.addClass( className );
			}
		} else {
			if ( elem.hasClass( className ) ) {
				elem.removeClass( className );
			}
		}
	}

	/* パブリックメソッド */
	return {
		scroll: scroll,
		anchor: anchor,
		show2ndView: show2ndView
	};
})();
