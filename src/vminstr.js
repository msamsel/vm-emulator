/* global BigInt */

function to_dw( args ) {
	// unpack( '<H', str(args) )
	// 2 bytes to hex
}

function to_dd( args ) {
	return args[ 0 ] |
		args[ 1 ] << 8 |
		args[ 2 ] << 16 |
		args[ 3 ] << 24;
}

// args = [ r-dst, r-src, other args ];

function VMOV( vm, args ) {
	vm.reg[ args[ 0 ] ].value = vm.reg[ args[ 1 ] ].value;
}

function VSET( vm, args ) {
	vm.reg[ args[ 0 ] ].value = to_dd( args.slice( 1 ) );
}

function VLD ( vm, args ) {
	const dd = vm.mem.fetchDoubleWord( vm.reg[ args[ 1 ] ].value );

	if ( dd === null ) {
		vm.interrupts( vm.INT_MEMORY_ERROR );
		return;
	}

	vm.reg[ args[ 0 ] ].value = dd;
}

function VST( vm, args ) {
	if ( !vm.mem.storeDoubleWord( vm.reg[ args[ 0 ] ].value , vm.reg[ args[ 1 ] ].value ) ) {
		vm.interrupts( vm.INT_MEMORY_ERROR );
	}
}

function VLDB( vm, args ) {
	const db = vm.mem.fetchByte( vm.reg[ args[ 1 ] ].value );

	if ( db === null ) {
		vm.interrupts( vm.INT_MEMORY_ERROR );
		return;
	}

	vm.reg[ args[ 0 ] ].value = db;
}

function VSTB( vm, args ) {
	if ( !vm.mem.storeByte( vm.reg[ args[ 0 ] ].value, vm.reg[ args[ 1 ] ].value ) ) {
		vm.interrupts( vm.INT_MEMORY_ERROR );
	}
}

// Overflows are not treat correctly
function VADD( vm, args ) {
	vm.reg[ args[ 0 ] ].value = ( vm.reg[ args[ 0 ] ].value + vm.reg[ args[ 1 ] ].value & 0xffffffff );
}

function VSUB( vm, args ) {
	vm.reg[ args[ 0 ] ].value = ( vm.reg[ args[ 0 ] ].value - vm.reg[ args[ 1 ] ].value & 0xffffffff );
}

function VMUL( vm, args ) {
	let val0 = vm.reg[ args[ 0 ] ].value;
	let val1 = vm.reg[ args[ 1 ] ].value;
	let res;

	if ( val0 * val1 > Number.MAX_SAFE_INTEGER ) {
		val0 = BigInt( val0 );
		val1 = BigInt( val1 );

		res = Number( ( val0 * val1 ) & BigInt( 0xffffffff ) );
	} else {
		res = ( val0 * val1 ) & 0xffffffff;
	}

	vm.reg[ args[ 0 ] ].value = res;
}

function VDIV( vm, args ) {
	if ( vm.reg[ args[ 1 ] ].value === 0 ) {
		vm.interrupts( vm.INT_DIVISION_ERROR );
	} else {
		vm.reg[ args[ 0 ] ].value = Math.floor( vm.reg[ args[ 0 ] ].value / vm.reg[ args[ 1 ] ].value );
	}
}

function VMOD( vm, args ) {
	if( vm.reg[ args[ 1 ] ].value === 0 ) {
		vm.interrupts( vm.INT_DIVISION_ERROR );
	} else {
		vm.reg[ args[ 0 ] ].value = vm.reg[ args[ 0 ] ].value % vm.reg[ args[ 1 ] ].value;
	}
}

function VOR( vm, args ) {
	vm.reg[ args[ 0 ] ].value |= vm.reg[ args[ 1 ] ].value;
}

function VAND( vm, args ) {
	vm.reg[ args[ 0 ] ].value &= vm.reg[ args[ 1 ] ].value;
}

function VXOR( vm, args ) {
	vm.reg[ args[ 0 ] ].value ^= vm.reg[ args[ 1 ] ].value;
}

// function VNOT( vm, args ) {
// 	vm.reg[ args[ 0 ] ).valu ~= vm.reg
// }


export default {
	VADD,
	VMUL
};
