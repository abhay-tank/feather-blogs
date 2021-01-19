import axios from "axios";
import config from "../../configuration/config";
import authActions from "../constants/auth.actions";
import User from "./../../models/User";
const fetchSessionFromCookies = (action, payload) => (dispatch, getState) => {
	axios
		.get(config.BACKEND_BASE_URL + config.AUTH_VERIFY_JWT, {
			headers: {
				Authorization: `Bearer ${payload.jwt}`,
			},
		})
		.then((response) => {
			let user = response.data.data.user;
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
		})
		.catch((error) => {
			let newError;
			if (error.response && error.response.status === 401) {
				console.error(error.response.data.message);
			} else {
				console.error(error);
			}
			newError = "Error verifying JWT";
			console.error(newError);
		});
};

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
			let user = response.data.data;
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
				type: authActions.SIGNUP,
				payload: newPayload,
			});
		})
		.catch((error) => {
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
				type: authActions.NOTIFY,
				payload: { ...payload, notify: { message: newError, isError: true } },
			});
		});
};

const verifyUser = (action, payload) => (dispatch, getState) => {
	dispatch({
		type: authActions.LOADING,
		payload: { ...payload },
	});
	axios
		.get(
			config.BACKEND_BASE_URL +
				config.AUTH_VERIFY_USER_ACCOUNT_ENDPOINT +
				payload.verificationToken
		)
		.then((response) => {
			let user = response.data.data;
			if (response.status === 200 && response.data.status === "successful") {
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
					type: authActions.VERIFYUSER,
					payload: newPayload,
				});
			} else {
				console.error("some error occurred while verifying user");
			}
		})
		.catch((error) => {
			let newError;
			if (
				(error.response && error.response.status === 404) ||
				error.response.status === 400
			) {
				console.error("Error fetching data => ", error.response.data.message);
				newError = "Authentication Error: " + error.response.data.message;
			} else {
				console.error(error.response.data.message);
				newError = "Authentication Server Error";
			}
			dispatch({
				type: authActions.NOTIFY,
				payload: { ...payload, notify: { message: newError, isError: true } },
			});
		});
};

const signIn = (action, payload) => async (dispatch, getState) => {
	dispatch({
		type: authActions.LOADING,
		payload: { ...payload },
	});
	axios
		.post(config.BACKEND_BASE_URL + config.AUTH_SIGNIN_ENDPOINT, payload.user, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => {
			let user = response.data.data.user;
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
		})
		.catch((error) => {
			let newError;
			if (
				(error.response && error.response.status === 404) ||
				error.response.status === 400
			) {
				console.error("Error fetching data => ", error.response.data.message);
				newError = "Authentication Error: " + error.response.data.message;
			} else {
				console.error(error.response.data.message);
				newError = "Authentication Server Error";
			}
			dispatch({
				type: authActions.NOTIFY,
				payload: { ...payload, notify: { message: newError, isError: true } },
			});
		});
};

const signOut = (action, payload) => (dispatch, getState) => {
	axios.get(config.BACKEND_BASE_URL + config.AUTH_SIGNOUT_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${payload.jwt}`,
		},
	});
	dispatch({
		type: authActions.SIGNOUT,
		payload: { ...payload },
	});
};

export { fetchSessionFromCookies, signIn, signUp, verifyUser, signOut };
