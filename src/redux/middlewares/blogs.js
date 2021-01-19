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
				type: blogsActions.NOTIFY,
				payload: { ...payload, notify: { message: newError, isError: true } },
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
				type: blogsActions.NOTIFY,
				payload: { ...payload, notify: { message: newError, isError: true } },
			});
		});
};

const createBlog = (action, payload) => (dispatch, getState) => {
	const { authReducer } = getState();
	dispatch({
		type: blogsActions.LOADING,
		payload: { ...payload },
	});
	axios
		.post(
			config.BACKEND_BASE_URL + config.BLOGS_CREATE_ENDPOINT,
			payload.newBlog,
			{
				headers: {
					Authorization: `Bearer ${authReducer.jwt}`,
					"Content-Type": "multipart/form-data",
				},
			}
		)
		.then((response) => {
			let blog = response.data.data;
			let newPayload = {
				blog: new Blog(
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
				),
			};
			dispatch({
				type: blogsActions.CREATE,
				payload: newPayload,
			});
		})
		.catch((error) => {
			let newError;
			if (error.response && error.response.status === 400) {
				console.error("Error fetching data => ", error.response.data.message);
				newError = "Blog server Error: " + error.response.data.message;
			} else if (error.response && error.response.status === 500) {
				console.error(error.response.data.message);
				newError = "Blog server Error";
			} else {
				console.error("Error creating blogs: ", error);
				newError = "Blog server Error";
			}
			dispatch({
				type: blogsActions.NOTIFY,
				payload: { ...payload, notify: { message: newError, isError: true } },
			});
		});
};
const wipeData = (action, payload) => (dispatch, getState) => {
	dispatch({
		type: blogsActions.WIPEDATA,
		payload: {},
	});
};

export { getAllBlogs, getBlogById, wipeData, createBlog };
