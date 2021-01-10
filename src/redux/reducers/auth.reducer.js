import User from "../models/User";
import authActions from "../constants/auth.actions";
const defaultState = {
	user: new User(),
	loading: false,
	error: null,
};

const authReducer = (state = defaultState, action) => {
	switch (action.type) {
		default:
			return { ...state };
		case authActions.SIGNIN:
			return {
				...state,
				loading: false,
				error: null,
				user: { ...action.payload.user } || { ...state.user },
			};
		case authActions.SIGNUP:
			return {
				...state,
				loading: false,
				error: null,
				user: { ...action.payload.user } || { ...state.user },
			};
		case authActions.SIGNOUT:
			return {
				...state,
				loading: false,
				error: null,
				user: { ...action.payload.user } || { ...state.user },
			};
		case authActions.LOADING:
			return {
				...state,
				loading: true,
				error: null,
			};
		case authActions.ERROR:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			};
	}
};

export default authReducer;
