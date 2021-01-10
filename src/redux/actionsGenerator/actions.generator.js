import authActions from "../constants/auth.actions";
import blogsActions from "../constants/blogs.actions";
import User from "../models/User";
import { signIn } from "../middlewares/authentication";

const actionGenerator = (action, payload) => {
	switch (action) {
		default:
			return {
				type: "Invalid Action",
				payload: payload,
			};
		// case authActions.SIGNIN:
		// 	return {
		// 		type: authActions.SIGNIN,
		// 		payload: payload || { user: new User() },
		// 	};
		case authActions.SIGNIN:
			return signIn(action);
		case authActions.SIGNUP:
			return {
				type: authActions.SIGNUP,
				payload: payload || { user: new User() },
			};
		case authActions.SIGNOUT:
			return {
				type: authActions.SIGNOUT,
				payload: payload || { user: new User() },
			};
		case blogsActions.CREATE:
			return {
				type: blogsActions.CREATE,
				payload: payload || { blogs: [] },
			};
		case blogsActions.GETALL:
			return {
				type: blogsActions.GETALL,
				payload: payload || { blogs: [] },
			};
		case blogsActions.GETBYID:
			return {
				type: blogsActions.GETBYID,
				payload: payload || { blogs: [] },
			};
		case blogsActions.UPDATE:
			return {
				type: blogsActions.UPDATE,
				payload: payload || { blogs: [] },
			};
		case blogsActions.DELETE:
			return {
				type: blogsActions.DELETE,
				payload: payload || { blogs: [] },
			};
	}
};

export default actionGenerator;
