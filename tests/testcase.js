QUnit.module( "getOffsetのテスト" );
QUnit.test( "jQueryオブジェクトを渡したとき親要素の中央へ配置するためのオフセット値を返す ", function ( assert ) {
	var target, parent;
	target = $( '<div style="width: 100px; height: 100px">' );
	parent = $( '<div style="width: 200px; height: 300px">' );
	target.appendTo( parent );
	parent.appendTo( $( 'body' ) );
	var point = InfoTown.Center.getOffset( target, parent );
	assert.ok( point.x == "50", "Passed!" );
	assert.ok( point.y == "100", "Passed!" );
} );
QUnit.test( "DOMを渡したとき親要素の中央へ配置するためのオフセット値を返す ", function ( assert ) {
	var target, parent;
	target = $( '<div style="width: 100px; height: 100px">' );
	parent = $( '<div style="width: 200px; height: 300px">' );
	target.appendTo( parent );
	parent.appendTo( $( 'body' ) );
	var point = InfoTown.Center.getOffset( target.get( 0 ), parent.get( 0 ) );
	assert.ok( point.x == "50", "Passed!" );
	assert.ok( point.y == "100", "Passed!" )
} );
QUnit.test( "子要素が親要素より大きいときはマイナスのオフセットを返す。", function ( assert ) {
	var target, parent;
	target = $( '<div style="width: 300px; height: 400px">' );
	parent = $( '<div style="width: 200px; height: 300px">' );
	target.appendTo( parent );
	parent.appendTo( $( 'body' ) );
	var point = InfoTown.Center.getOffset( target.get( 0 ), parent.get( 0 ) );
	assert.ok( point.x == "-50", "Passed!" );
	assert.ok( point.y == "-50", "Passed!" )
} );
QUnit.test( "親要素が指定されないときはbody要素に対するオフセットを返す。", function ( assert ) {
	var target, parent;
	target = $( '<div style="width: 300px; height: 400px">' );
	target.appendTo( $( 'body' ) );
	expectedX = ($( "body" ).width() - target.width() ) / 2;
	expectedY = ($( "body" ).height() - target.height() ) / 2;
	var point = InfoTown.Center.getOffset( target.get( 0 ) );
	assert.ok( point.x == expectedX, "Passed!" );
	assert.ok( point.y == expectedY, "Passed!" )
} );

QUnit.module( "centerのテスト" );
QUnit.test( "jQueryオブジェクトを渡したとき親要素の中央へ配置する", function ( assert ) {
	var target, parent;
	target = $( '<div style="width: 100px; height: 100px">' );
	parent = $( '<div style="width: 200px; height: 300px">' );
	target.appendTo( parent );
	parent.appendTo( $( 'body' ) );
	InfoTown.Center.center( target, parent );
	assert.ok( target.css( 'left' ) == "50px", "Passed!" );
	assert.ok( target.css( 'top' ) == "100px", "Passed!" );
} );
QUnit.test( "jQueryオブジェクトを渡したとき親要素の中央へ配置しオフセットを返す", function ( assert ) {
	var target, parent;
	target = $( '<div style="width: 100px; height: 100px">' );
	parent = $( '<div style="width: 200px; height: 300px">' );
	target.appendTo( parent );
	parent.appendTo( $( 'body' ) );
	var pos = InfoTown.Center.center( target, parent );
	assert.ok( pos.left == 50, "Passed!" );
	assert.ok( pos.top  == 100, "Passed!" );
} );
QUnit.test( "DOMを渡したとき親要素の中央へ配置する", function ( assert ) {
	var target, parent;
	target = $( '<div style="width: 100px; height: 100px">' );
	parent = $( '<div style="width: 200px; height: 300px">' );
	target.appendTo( parent );
	parent.appendTo( $( 'body' ) );
	InfoTown.Center.center( target.get( 0 ), parent.get( 0 ) );
	assert.ok( target.css( "left" ) == "50px", "Passed!" );
	assert.ok( target.css( "top" ) == "100px", "Passed!" )
} );
QUnit.test( "子要素が親要素より大きいときはマイナスのオフセットで配置す", function ( assert ) {
	var target, parent;
	target = $( '<div style="width: 300px; height: 400px">' );
	parent = $( '<div style="width: 200px; height: 300px">' );
	target.appendTo( parent );
	parent.appendTo( "body");
	InfoTown.Center.center( target, parent );
	assert.ok( target.css( "left" ) == "-50px", "Passed!" );
	assert.ok( target.css( "top" ) == "-50px", "Passed!" )
} );