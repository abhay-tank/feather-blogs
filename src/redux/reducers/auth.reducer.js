import User from "../models/User";
import authActions from "../constants/auth.actions";
const defaultState = {
	user: new User(),
};

const authReducer = (state = defaultState, action) => {
	switch (action.type) {
		default:
			return { ...state };
		case authActions.SIGNIN:
			return {
				...state,
				user: { ...action.payload.user } || { ...state.user },
			};
		case authActions.SIGNUP:
			return {
				...state,
				user: { ...action.payload.user } || { ...state.user },
			};
		case authActions.SIGNOUT:
			return {
				...state,
				user: { ...action.payload.user } || { ...state.user },
			};
	}
};

export default authReducer;
