/* global expect, before, describe, it */

import 'chai/register-expect';
import commands from '../src/vminstr';
import VMGeneralPurposeRegister from '../src/vmgeneralpurposeregister';

describe( 'vminstr', () => {
	const vm = {
		reg: {
			0: new VMGeneralPurposeRegister(),
			1: new VMGeneralPurposeRegister()
		}
	};
	const reg0 = vm.reg[ 0 ];


	describe( 'VADD', () => {
		const VADD = commands.VADD;

		it( 'should add 0, 0', () => {
			resetRegisters( vm );

			VADD( vm, [ 0, 1 ] );

			expect( reg0.value ).to.equal( 0 );
		} );

		it( 'should add 100, 100', () => {
			setRegisterValeus( vm, 100, 100 );

			VADD( vm, [ 0, 1 ] );

			expect( reg0.value ).to.equal( 200 );
		} );

		it( 'should add 100, -30', () => {
			setRegisterValeus( vm, 100, -30 );

			VADD( vm, [ 0, 1 ] );

			expect( reg0.value ).to.equal( 70 );
		} );

		it( 'should add 0xffffffff, 1', () => {
			setRegisterValeus( vm, 0xffffffff, 1 );

			VADD( vm, [ 0, 1 ] );

			expect( reg0.value ).to.equal( 0 );
		} );

		it( 'should add 0xffffffff, 0xffffffff', () => {
			setRegisterValeus( vm, 0xffffffff, 0xffffffff );

			VADD( vm, [ 0, 1 ] );

			expect( reg0.value ).to.equal( 0xfffffffe );
		} );

		it( 'should add negative numbers, 1, -2 ', () => {
			setRegisterValeus( vm, 1, -2 );

			VADD( vm, [ 0, 1 ] );

			expect( reg0.value ).to.equal( 0xffffffff );
		} );
	} );

	describe( 'VMUL', () => {
		const VMUL = commands.VMUL;

		it( 'should multiply 0, 0', () => {
			resetRegisters( vm );

			VMUL( vm, [ 0, 1 ] );

			expect( reg0.value ).to.equal( 0 );
		} );

		it( 'should multiply 100, 100', () => {
			setRegisterValeus( vm, 100, 100 );

			VMUL( vm, [ 0, 1 ] );

			expect( reg0.value ).to.equal( 10000 );
		} );

		it( 'should multiply 0xffffffff, 0xffffffff', () => {
			setRegisterValeus( vm, 0xffffffff, 0xffffffff );

			VMUL( vm, [ 0, 1 ] );

			expect( reg0.value ).to.equal( 1 );
		} );

		it( 'should multiply negative numbers -1, -1', () => {
			setRegisterValeus( vm, -1, -1 );

			VMUL( vm, [ 0, 1 ] );

			expect( reg0.value ).to.equal( 1 );
		} );

		it( 'should multiply negative and positive number -2, 8 ', () => {
			setRegisterValeus( vm, -2, 8 );

			VMUL( vm, [ 0, 1 ] );

			expect( reg0.value ).to.equal( 0xfffffff0 );
		} );
	} );
} );

function setRegisterValeus( vm, val0, val1 ) {
	vm.reg[ 0 ].value = val0;
	vm.reg[ 1 ].value = val1;
}

function resetRegisters( vm ) {
	setRegisterValeus( vm, 0, 0 );
}
