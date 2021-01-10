import axios from "axios";
import config from "../../configuration/config";
import AuthError from "../../models/AuthError";
import authActions from "../constants/auth.actions";
import User from "./../../models/User";

const signIn = (action) => async (dispatch, getState) => {
	dispatch({
		type: authActions.LOADING,
	});
	try {
		let response = await axios.post(
			config.BACKEND_BASE_URL + config.AUTH_SIGNIN_ENDPOINT,
			action.payload.formData
		);
		if (response.status === 202 && response.data.status === "successful") {
			let { user } = response.data.data;
			let newPayload = {
				user: new User(
					user.firstName,
					user.lastName || null,
					user.email,
					{
						avatarURL: user.avatarImage.avatarURL,
						avatarAlt: user.avatarImage.avatarAlt,
					},
					user.accountVerified
				),
				jwt: response.data.data.jwt,
			};
			dispatch({
				type: authActions.SIGNIN,
				payload: newPayload,
			});
		} else if (response.status === 400) {
			throw new AuthError("Authentication Error: " + response.data.message);
		} else {
			console.error(response.data.message);
			throw new AuthError("Authentication Server Error");
		}
	} catch (error) {
		console.error(error);
		let newError;
		if (error instanceof AuthError) {
			newError = error;
		}
		newError = new Error("Error authenticating: ", error);
		dispatch({ type: authActions.ERROR, payload: { error: newError } });
	}
};

const signUp = (action) => async (dispatch, getState) => {
	dispatch({
		type: authActions.LOADING,
	});
	try {
		let response = await axios.post(
			config.BACKEND_BASE_URL + config.AUTH_SIGNUP_ENDPOINT,
			action.payload.formData
		);
		if (response.status === 200 && response.data.status === "successful") {
			let { user } = response.data.data;
			let newPayload = {
				user: new User(
					user.firstName,
					user.lastName || null,
					user.email,
					{
						avatarURL: user.avatarImage.avatarURL,
						avatarAlt: user.avatarImage.avatarAlt,
					},
					user.accountVerified
				),
			};
			dispatch({
				type: authActions.SIGNIN,
				payload: newPayload,
			});
		} else if (response.status === 400) {
			throw new AuthError("Authentication Error: " + response.data.message);
		} else {
			console.error(response.data.message);
			throw new AuthError("Authentication Server Error");
		}
	} catch (error) {
		console.error(error);
		let newError;
		if (error instanceof AuthError) {
			newError = error;
		}
		newError = new Error("Error authenticating: ", error);
		dispatch({ type: authActions.ERROR, payload: { error: newError } });
	}
};

export { signIn, signUp };
