( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get OpusMagnum.
		module.exports = factory( global, true );
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

"use strict";

if ( !window.document ) {
	throw new Error( "OpusMagnum requires a window with a document" );
}

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

// Support: IE 11+
// IE doesn't have Array#flat; provide a fallback.
var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};

var push = arr.push;

var indexOf = arr.indexOf;

// [[Class]] -> type pairs
var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

// All support tests are defined in their respective modules.
var support = {};

function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	return typeof obj === "object" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}

function isWindow( obj ) {
	return obj != null && obj === obj.window;
}

function isArrayLike( obj ) {

	var length = !!obj && obj.length,
		type = toType( obj );

	if ( typeof obj === "function" || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

var document = window.document;

var preservedScriptAttributes = {
	type: true,
	src: true,
	nonce: true,
	noModule: true
};

function DOMEval( code, node, doc ) {
	doc = doc || document;

	var i,
		script = doc.createElement( "script" );

	script.text = code;
	for ( i in preservedScriptAttributes ) {
		if ( node && node[ i ] ) {
			script[ i ] = node[ i ];
		}
	}

	if ( doc.head.appendChild( script ).parentNode ) {
		script.parentNode.removeChild( script );
	}
}

var version = "4.0.0-beta",

	rhtmlSuffix = /HTML$/i,

	// Define a local copy of OpusMagnum
