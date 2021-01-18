import axios from "axios";
import config from "../../configuration/config";
import Blog from "../../models/Blog";
import blogsActions from "../constants/blogs.actions";

const getAllBlogs = (action, payload) => (dispatch, getState) => {
	const { authReducer } = getState();
	dispatch({
		type: blogsActions.LOADING,
		payload: { ...payload },
	});
	axios
		.get(config.BACKEND_BASE_URL + config.BLOGS_GET_ALL_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${authReducer.jwt}`,
			},
		})
		.then((response) => {
			console.log("Blog data => ", response.data.data);
			let blogs = response.data.data.map(
				(blog) =>
					new Blog(
						blog.blogId,
						blog.blogAuthor,
						blog.blogTitle,
						blog.blogContent,
						blog.blogImages.map((image) => {
							return {
								blogImageAlt: image.blogImageAlt,
								blogImageId: image.blogImagePublicId,
								blogImageURL: image.blogImageURL,
							};
						}),
						blog.blogRelatedLinks,
						blog.createdAt,
						blog.updatedAt
					)
			);
			dispatch({
				type: blogsActions.GETALL,
				payload: { blogs },
			});
		})
		.catch((error) => {
			let newError;
			console.error(error);
			if (error.response && error.response.status === 404) {
				console.error("Error fetching data => ", error.response.data.message);
				newError = "Authentication Error: " + error.response.data.message;
			} else if (error.response && error.response.status === 500) {
				console.error(error.response.data.message);
				newError = "Blogs Server Error.";
			} else {
				newError = "Error loading blogs.";
			}
			dispatch({
				type: blogsActions.ERROR,
				payload: { ...payload, error: newError },
			});
		});
};

const getBlogById = (action, payload) => (dispatch, getState) => {
	const { authReducer } = getState();
	dispatch({
		type: blogsActions.LOADING,
		payload: { ...payload },
	});
	axios
		.get(
			config.BACKEND_BASE_URL +
				config.BLOGS_GET_BY_ID_ENDPOINT +
				payload.blogId,
			{
				headers: {
					Authorization: `Bearer ${authReducer.jwt}`,
				},
			}
		)
		.then((response) => {
			let blog = response.data.data;
			dispatch({
				type: blogsActions.GETBYID,
				payload: { blog },
			});
		})
		.catch((error) => {
			let newError;
			console.error(error);
			if (error.response && error.response.status === 404) {
				console.error("Error fetching data => ", error.response.data.message);
				newError = "Authentication Error: " + error.response.data.message;
			} else if (error.response && error.response.status === 500) {
				console.error(error.response.data.message);
				newError = "Blogs Server Error.";
			} else {
				newError = "Error loading blogs.";
			}
			dispatch({
				type: blogsActions.ERROR,
				payload: { ...payload, error: newError },
			});
		});
};

const wipeData = (action, payload) => (dispatch, getState) => {
	dispatch({
		type: blogsActions.WIPEDATA,
		payload: {},
	});
};

export { getAllBlogs, getBlogById, wipeData };
