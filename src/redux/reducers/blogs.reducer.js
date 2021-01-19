import Blog from "../../models/Blog";
import blogsActions from "../constants/blogs.actions";
const defaultState = {
	blogs: [],
	currentBlog: new Blog(),
	loading: false,
	error: null,
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
				error: null,
				blogs: [...state.blogs, { ...action.payload.blog }],
			};
		case blogsActions.GETALL:
			return {
				...state,
				loading: false,
				error: null,
				blogs: [...state.blogs, ...action.payload.blogs],
			};
		case blogsActions.GETBYID:
			return {
				...state,
				loading: false,
				error: null,
				blogs: [...state.blogs],
				currentBlog: { ...action.payload.blog },
			};
		case blogsActions.UPDATE:
			return {
				...state,
				loading: false,
				error: null,
				blogs: [...state.blogs, ...action.payload.blogs],
			};
		case blogsActions.DELETE:
			return {
				...state,
				loading: false,
				error: null,
				blogs: [...state.blogs, ...action.payload.blogs],
			};

		case blogsActions.LOADING:
			return {
				...state,
				loading: true,
				error: null,
			};
		case blogsActions.CLEARLOADING:
			return {
				...state,
				loading: false,
				error: null,
			};
		case blogsActions.ERROR:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			};
		case blogsActions.CLEARERROR:
			return {
				...state,
				loading: false,
				error: null,
			};
	}
};

export default blogsReducer;
