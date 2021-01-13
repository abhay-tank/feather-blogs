class User {
	constructor(
		firstName = null,
		lastName = null,
		email = null,
		avatarImage = {
			avatarURL: null,
			avatarAlt: null,
		},
		accountVerified = null
	) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.avatarImage = avatarImage;
		this.accountVerified = accountVerified;
	}
}

export default User;
