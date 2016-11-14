// Set global menu.
InfoTown.mobileMenu.set( $( '.menu-toggle' ), $( '.menu-body' ), 'menu-toggle-active' );
InfoTown.scroll.anchor( true );

// Set scroll.
$( '.scroll-top' ).on( 'click', function () {
	InfoTown.scroll.scroll( {
		'target': $( '#view1' ),
		'speed': 800
	} );
} );
$( '.scroll-down' ).on( 'click', function () {
	InfoTown.scroll.scroll( {
		'target': $( '#view2' ),
		'speed': 800
	} )
} );
$( window ).on( 'scroll', function () {
	InfoTown.scroll.show2ndView( $( '.scroll-top' ), 'scroll-top-active' );
} );
$( window ).on( 'load', function () {
	InfoTown.scroll.show2ndView( $( '.scroll-top' ), 'scroll-top-active' );
} );

// Detect scroll.
$( window ).scroll( InfoTown.scroll.scrollSpy(
	$( ".scroll-toggle a" ),
	[$( '#view1' ), $( '#view2' ), $( '#view3' )]
) );

