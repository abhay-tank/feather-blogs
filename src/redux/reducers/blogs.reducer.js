import blogsActions from "../constants/blogs.actions";
const defaultState = {
	blogs: [],
	loading: false,
	error: null,
};
const blogsReducer = (state = defaultState, action) => {
	switch (action.type) {
		default:
			return { ...state };
		case blogsActions.CREATE:
			return {
				...state,
				blogs: [...state.blogs, ...action.payload.blogs],
			};
		case blogsActions.GETALL:
			return {
				...state,
				blogs: [...state.blogs, ...action.payload.blogs],
			};
		case blogsActions.GETBYID:
			return {
				...state,
				blogs: [...state.blogs, ...action.payload.blogs],
			};
		case blogsActions.UPDATE:
			return {
				...state,
				blogs: [...state.blogs, ...action.payload.blogs],
			};
		case blogsActions.DELETE:
			return {
				...state,
				blogs: [...state.blogs, ...action.payload.blogs],
			};

		case blogsActions.LOADING:
			return {
				...state,
				loading: true,
				error: null,
			};
		case blogsActions.ERROR:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			};
	}
};

export default blogsReducer;
