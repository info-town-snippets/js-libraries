/**
 * Centerオブジェクト
 *
 * 要素を親要素の中央へ配置するための各種メソッドを提供します。
 *
 * @class Center
 * @module InfoTown
 */
export default (function () {
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
	function center( target, parent, offset ) {
		var width, height, parentWidth, parentHeight, parentCssPos, offsetX, offsetY;

		target = (target instanceof jQuery) ? target : $( target );
		parent = parent || target.parent().get( 0 );
		parent = (parent instanceof jQuery) ? parent : $( parent );

		width = target.width();
		height = target.height();

		/* 要素親のサイズとpositionプロパティ設定 */
		if ( parent.get( 0 ) === $( 'body' ).get( 0 ) ) {
			/* 親要素がbody */
			parentWidth = $( window ).width();
			parentHeight = $( window ).height();
		} else {
			/* 親要素がbody以外 */
			parentWidth = parent.width();
			parentHeight = parent.height();
			parentCssPos = parent.css( 'position' );
			if ( (parentCssPos !== 'absolute') && (parentCssPos !== 'relative') ) {
				parent.css( {
					position: 'relative'
				} );
			}
		}
		/* オフセット */
		offsetX = (parentWidth - width) / 2;
		offsetY = (parentHeight - height) / 2;
		if ( typeof offset !== "undefined" ) {
			offsetX = (offset.left !== "undefined" && typeof offset.left === "number" ) ? offsetX + offset.left : offsetX;
			offsetY = (offset.top !== "undefined" && typeof offset.top === "number" ) ? offsetY + offset.top : offsetY;
		}
		target.css( {
			position: 'absolute',
			top: offsetY,
			left: offsetX
		} );
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
	function getOffset( target, parent ) {
		var width, height, parentWidth, parentHeight;
		target = (target instanceof jQuery) ? target : $( target );
		if ( typeof parent === "undefined" ) {
			parent = $( "body" );
		} else {
			parent = (parent instanceof jQuery) ? parent : $( parent );
		}
		/* 要素のサイズ取得 */
		width = target.width();
		height = target.height();
		/* 要素親のサイズ取得 */
		parentWidth = parent.width();
		parentHeight = parent.height();
		/* オフセット */
		return {
			"x": (parentWidth - width ) / 2,
			"y": (parentHeight - height) / 2
		};
	}

	/* パブリックメソッド */
	return {
		center: center,
		getOffset: getOffset
	};
})();
