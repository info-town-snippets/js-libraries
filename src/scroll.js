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
		var target, speed, position;
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

	/* パブリックメソッド */
	return {
		scroll: scroll
	};
})();
