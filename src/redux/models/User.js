class User {
	constructor(
		firstName = "",
		lastName = "",
		email = "",
		avatarImage = {
			avatarURL: "",
			avatarAlt: "",
		},
		accountVerified = false
	) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.avatarImage = avatarImage;
		this.accountVerified = accountVerified;
	}
}

export default User;
