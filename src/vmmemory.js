const MEMORY_SIZE = 64 * 1024; // 64kB

export default class VMMemory {
	constructor() {
		const memory = new ArrayBuffer( MEMORY_SIZE );

		this.view = new DataView( memory );
	}

	// 8bits
	fetchByte( addr ) {
		if ( addr < 0 || addr >= MEMORY_SIZE ) {
			return null;
		}

		return this.view.getUint8( addr );
	}

	// 8buts
	storeByte( addr, value ) {
		if ( addr < 0 || addr >= MEMORY_SIZE ) {
			return false;
		}

		this.view.setUint8( addr, value );
	}

	// 32bits
	fetchDoubleWord( addr ) {
		if( addr < 0 || addr + 3 >= MEMORY_SIZE ) {
			return null;
		}
		const v = this.view;

		// ? same as v.getUint32( addr, true );
		return (
			v.getUint8( addr ) |
			v.getUint8( addr + 1) << 8 |
			v.getUint8( addr + 2 ) << 16 |
			v.getUint8( addr + 3 ) << 24 );
	}

	// 32bits
	storeDoubleWord( addr, value ) {
		if ( addr < 0 || addr + 3 >= MEMORY_SIZE ) {
			return false;
		}

		const v = this.view;

		// same as v.setUint32( addr, value, true )
		v.setUint8( addr, value & 0xff );
		v.setUint8( addr + 1, value >>> 8 & 0xff );
		v.setUint8( addr + 2, value >>> 16 & 0xff );
		v.setUint8( addr + 3, value >>> 24 & 0xff );

		return true;
	}

	fetchManu( addr, size ) {
		if ( addr < 0 || addr + size - 1 >= MEMORY_SIZE ) {
			return null;
		}

		const ret = [];

		for ( let i = 0; i < size; i++ ) {
			ret.push( this.fetchByte( addr + i ) );
		}

		return ret;
	}

	storeMany( addr, arrayValues ) {
		if ( addr < 0 || addr + arrayValues.length - 1 > MEMORY_SIZE ) {
			return false;
		}

		arrayValues.forEach( ( value, i ) => {
			this.storeByte( addr + i, value );
		} );

		return true;
	}
}
