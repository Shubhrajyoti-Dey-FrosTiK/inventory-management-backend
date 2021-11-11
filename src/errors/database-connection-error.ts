import { CustomError } from './custom-error';
export class DatabaseConnectionError extends CustomError {
	statusCode = 500;
	reason: string = 'Error connecting to Database';
	constructor() {
		super('DB Connection Error');
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}
	serializeErrors() {
		return [{ message: this.reason }];
	}
}
