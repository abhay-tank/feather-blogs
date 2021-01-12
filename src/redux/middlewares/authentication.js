import axios from "axios";
import config from "../../configuration/config";
import authActions from "../constants/auth.actions";
import User from "./../../models/User";

const signUp = (action, payload) => (dispatch, getState) => {
	dispatch({
		type: authActions.LOADING,
		payload: { ...payload },
	});
	axios
		.post(config.BACKEND_BASE_URL + config.AUTH_SIGNUP_ENDPOINT, payload.user, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => {
			if (response.status === 200 && response.data.status === "successful") {
				let user = response.data.data;
				console.log(user);
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
				console.log(newPayload);
				dispatch({
					type: authActions.SIGNUP,
					payload: newPayload,
				});
			}
		})
		.catch((error) => {
			console.error("Inside Error =>", error);
			let newError;
			if (
				(error.response && error.response.status === 400) ||
				error.response.status === 406
			) {
				console.error("Error fetching data => ", error.response.data.message);
				newError = "Authentication Error: " + error.response.data.message;
			} else {
				console.error(error.response.data.message);
				newError = "Authentication Server Error";
			}
			dispatch({
				type: authActions.ERROR,
				payload: { ...payload, error: newError },
			});
		});
};

const signIn = (action, payload) => async (dispatch, getState) => {};

export { signIn, signUp };
