import User from "../../models/User";
import authActions from "../constants/auth.actions";
const defaultState = {
	user: new User(),
	loading: false,
	notify: {
		message: null,
		isError: false,
		isWarning: false,
	},
	isLoggedIn: false,
	jwt: null,
};

const authReducer = (state = defaultState, action) => {
	switch (action.type) {
		default:
			return { ...state };
		case authActions.SIGNIN:
			return {
				...state,
				loading: false,
				notify: {
					message: null,
					isError: false,
					isWarning: false,
				},
				isLoggedIn: action.payload.user.accountVerified ? true : false,
				user: { ...action.payload.user } || { ...state.user },
				jwt: action.payload.jwt || state.jwt,
			};
		case authActions.SIGNUP:
			return {
				...state,
				loading: false,
				notify: {
					message: null,
					isError: false,
					isWarning: false,
				},
				isLoggedIn: false,
				user: { ...action.payload.user } || { ...state.user },
				jwt: state.jwt,
			};
		case authActions.VERIFYUSER:
			return {
				...state,
				loading: false,
				notify: {
					message: null,
					isError: false,
					isWarning: false,
				},
				isLoggedIn: false,
				user: { ...action.payload.user } || { ...state.user },
			};
		case authActions.SIGNOUT:
			return { ...defaultState };
		case authActions.LOADING:
			return {
				...state,
				loading: true,
				notify: {
					message: null,
					isError: false,
					isWarning: false,
				},
			};
		case authActions.NOTIFY:
			return {
				...state,
				loading: false,
				notify: { ...state.notify, ...action.payload.notify },
			};
	}
};

export default authReducer;
