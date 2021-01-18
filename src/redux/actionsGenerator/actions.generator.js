import authActions from "../constants/auth.actions";
import blogsActions from "../constants/blogs.actions";
import {
	signIn,
	signUp,
	signOut,
	verifyUser,
	fetchSessionFromCookies,
} from "../middlewares/authentication";
import { getAllBlogs, getBlogById, wipeData } from "../middlewares/blogs";
const actionGenerator = (action, payload) => {
	switch (action) {
		default:
			return {
				type: "Invalid Action",
				payload: payload,
			};
		case authActions.FETCHSESSIONFROMCOOKIES:
			return fetchSessionFromCookies(action, payload);
		case authActions.SIGNIN:
			return signIn(action, payload);
		case authActions.SIGNUP:
			return signUp(action, payload);
		case authActions.VERIFYUSER:
			return verifyUser(action, payload);
		case authActions.SIGNOUT:
			return signOut(action, payload);
		case blogsActions.CREATE:
			return {
				type: blogsActions.CREATE,
				payload: payload || { blogs: [] },
			};
		case blogsActions.GETALL:
			return getAllBlogs(action, payload);
		case blogsActions.GETBYID:
			return getBlogById(action, payload);
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
		case blogsActions.WIPEDATA:
			return wipeData(action, payload);
	}
};

export default actionGenerator;
