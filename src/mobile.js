/**
 * モバイルナビゲーション処理(768未満)
 */
jQuery( function ( $ ) {
	$( ".site-nav__switch" ).on( 'click', function () {
		var display = $( ".site-nav__body" ).css( "display" );
		if ( "none" === display ) {
			$( 'i', this ).replaceWith( '<i class="fa fa-2x fa-times"></i>' );
			$( ".site-nav__body" ).fadeToggle( 400, 'swing' );
		}
		if ( "block" === display ) {
			$( 'i', this ).replaceWith( '<i class="fa fa-2x fa-bars"></i>' );
			$( ".site-nav__body" ).hide();
		}
	} );
	$( window ).on( 'resize', function () {
		if ( $( window ).width() < 768 ) {
			$( ".site-nav__item a" ).on( 'click', function () {
				$( ".site-nav__body" ).hide();
				$( ".site-nav__close" ).hide();
			} );
		}
	} );
} );