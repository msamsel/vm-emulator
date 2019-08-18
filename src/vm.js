export default class VM {
	constructor( obj ) {
		this.instrHandler = 0;
		this.instrLength = 1;

		// Interruptions:
		this.intMemoryError = 0;
		this.intDivisionError = 1;
		this.intGeneralError = 2;
		this.intPIT = 8;
		this.intConsole = 9;
	}
}
