export default class AuthError extends Error {
	constructor(message) {
		super(message);
		this.message = message;
	}
}
