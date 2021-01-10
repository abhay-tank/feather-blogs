import axios from "axios";
import config from "./../configuration/config";
import User from "../models/User";
import AuthError from "./../models/AuthError";

class Auth {
	signIn = async (formData) => {
		try {
			let response = await axios.post(
				config.BACKEND_BASE_URL + config.AUTH_SIGNIN_ENDPOINT,
				formData
			);
			if (response.status === 202 && response.data.status === "successful") {
				let { user } = response.data.data;
				this.user = new User(
					user.firstName,
					user.lastName || null,
					user.email,
					{
						avatarURL: user.avatarImage.avatarURL,
						avatarAlt: user.avatarImage.avatarAlt,
					},
					user.accountVerified
				);
				this.jwt = response.data.data.jwt;
				return;
			} else if (response.status === 400) {
				throw new AuthError("Authentication Error: " + response.data.message);
			} else {
				console.error(response.data.message);
				throw new AuthError("Authentication Server Error");
			}
		} catch (error) {
			console.error(error);
			if (error instanceof AuthError) {
				return error;
			}
			return new Error("Error authenticating: ", error);
		}
	};

	signUp = async (formData) => {
		try {
			let response = await axios.post(
				config.BACKEND_BASE_URL + config.AUTH_SIGNUP_ENDPOINT,
				formData
			);
			console.log(response);
		} catch (error) {}
	};
}

export default new Auth();
