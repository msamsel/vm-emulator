/* global expect, describe, it */

import 'chai/register-expect';
import commands from '../src/vminstr';

describe( 'vminstr', () => {
	it( 'test', () => {
		expect( commands ).to.be.an.instanceof( Object );
	} );
} );
