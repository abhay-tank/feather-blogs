import blogsActions from "../constants/blogs.actions";
const defaultState = {
	blogs: [],
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
	}
};

export default blogsReducer;
