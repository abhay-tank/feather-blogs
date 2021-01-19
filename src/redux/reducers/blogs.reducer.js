import Blog from "../../models/Blog";
import blogsActions from "../constants/blogs.actions";
const defaultState = {
	blogs: [],
	currentBlog: new Blog(),
	loading: false,
	notify: {
		message: null,
		isError: false,
		isWarning: false,
	},
};
const blogsReducer = (state = defaultState, action) => {
	switch (action.type) {
		default:
			return { ...state };
		case blogsActions.WIPEDATA:
			return {
				...defaultState,
			};
		case blogsActions.CREATE:
			return {
				...state,
				loading: false,
				notify: {
					message: null,
					isError: false,
					isWarning: false,
				},
				blogs: [...state.blogs, { ...action.payload.blog }],
			};
		case blogsActions.GETALL:
			return {
				...state,
				loading: false,
				notify: {
					message: null,
					isError: false,
					isWarning: false,
				},
				blogs: [...state.blogs, ...action.payload.blogs],
			};
		case blogsActions.GETBYID:
			return {
				...state,
				loading: false,
				notify: {
					message: null,
					isError: false,
					isWarning: false,
				},
				blogs: [...state.blogs],
				currentBlog: { ...action.payload.blog },
			};
		case blogsActions.UPDATE:
			return {
				...state,
				loading: false,
				notify: {
					message: null,
					isError: false,
					isWarning: false,
				},
				blogs: [...state.blogs, ...action.payload.blogs],
			};
		case blogsActions.DELETE:
			return {
				...state,
				loading: false,
				notify: {
					message: null,
					isError: false,
					isWarning: false,
				},
				blogs: [...state.blogs, ...action.payload.blogs],
			};

		case blogsActions.LOADING:
			return {
				...state,
				loading: true,
				error: null,
			};
		case blogsActions.NOTIFY:
			return {
				...state,
				loading: false,
				notify: { ...state.notify, ...action.payload.notify },
			};
	}
};

export default blogsReducer;
