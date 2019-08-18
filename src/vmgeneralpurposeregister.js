const _value = Symbol( 'value' );

export default class VMGeneralPurposeRegister {}

Object.defineProperty( VMGeneralPurposeRegister.prototype, 'value', {
	get: function() {
		return this[ _value ];
	},

	set: function( val ) {
		// Fix negative numbers;
		if ( val < 0 ) {
			val += 0xffffffff + 1;
		}

		this[ _value ] = val;
	}
} );
