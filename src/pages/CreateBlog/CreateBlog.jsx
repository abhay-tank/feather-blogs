import React, { useState } from "react";
import { connect } from "react-redux";
import actionGenerator from "../../redux/actionsGenerator/actions.generator";
import blogsActions from "../../redux/constants/blogs.actions";
import styles from "./CreateBlog.module.scss";
import Loading from "../../components/loading/loading";
import createBlogImage from "../../assets/images/create-blog.svg";
import Notification from "../../components/notification/notification";

function CreateBlog(props) {
	let author = `${props.authState.user.firstName} ${props.authState.user.lastName}`;
	let loading = props.authState.loading || props.blogsState.loading;
	let notify = props.authState.notify.message
		? props.authState.notify
		: props.blogsState.notify.message
		? props.blogsState.notify
		: null;
	const [formData, setFormData] = useState({
		blogTitle: "",
		blogContent: "",
		blogImages: [],
		blogRelatedLinks: [
			{
				relatedBlogId: "",
				relatedBlogTitle: "",
			},
		],
	});
	const handleChange = (event) => {
		event.preventDefault();
		switch (event.target.name) {
			default:
				break;
			case "blogTitle":
				if (event.target.value.trim().length <= 1) {
					props.raiseError("Blog Title too short.");
					setFormData({ ...formData, blogTitle: event.target.value });
				} else {
					setFormData({ ...formData, blogTitle: event.target.value });
				}
				break;
			case "blogContent":
				if (event.target.value.trim().length <= 10) {
					props.raiseError("Blog Content too short.");
					setFormData({
						...formData,
						blogTitle: event.target.value,
					});
				} else {
					setFormData({
						...formData,
						blogTitle: event.target.value,
					});
				}
				setFormData({ ...formData, blogContent: event.target.value });
				break;
			case "relatedBlogId":
				let idIndex = event.target.id.split("-")[1];
				let newBlogIdRelatedLinks = [...formData.blogRelatedLinks];
				newBlogIdRelatedLinks[
					idIndex
				].relatedBlogId = event.target.value.trim();
				setFormData({
					...formData,
					blogRelatedLinks: newBlogIdRelatedLinks,
				});
				break;
			case "relatedBlogTitle":
				let index = event.target.id.split("-")[1];
				let newBlogTitleRelatedLinks = [...formData.blogRelatedLinks];
				newBlogTitleRelatedLinks[index].relatedBlogTitle = event.target.value;
				setFormData({
					...formData,
					blogRelatedLinks: newBlogTitleRelatedLinks,
				});
				break;
			case "blogImages":
				if (event.target.files.length) {
					setFormData({ ...formData, blogImages: [...event.target.files] });
				} else {
					props.raiseError("Upload blog images.");
				}
				break;
		}
	};
	const createBlog = (event) => {
		event.preventDefault();
		let newBlog = new FormData();
		Object.keys(formData).forEach((key) => {
			if (key === "blogImages") {
				if (formData.blogImages.length) {
					formData.blogImages.forEach((image) => {
						console.log(image);
						newBlog.append("blogImages", image, image.name);
					});
				}
			} else if (key === "blogRelatedLinks") {
				if (formData[key].length) {
					let relatedLinks = [];
					formData[key].forEach((link) => {
						if (link.relatedBlogId.length && link.relatedBlogTitle) {
							relatedLinks.push(link);
						}
					});
					if (relatedLinks.length) {
						newBlog.append(key, JSON.stringify(relatedLinks));
					}
				}
			} else {
				newBlog.append(key, formData[key]);
			}
		});
		newBlog.append("blogAuthor", author);
		props.createBlog(newBlog);
	};

	const deleteRelatedLink = (index) => {
		let relatedLinks = formData.blogRelatedLinks;
		relatedLinks.splice(index, 1);
		setFormData({ ...formData, blogRelatedLinks: [...relatedLinks] });
	};

	const addRelatedLink = () => {
		setFormData({
			...formData,
			blogRelatedLinks: [
				...formData.blogRelatedLinks,
				{
					relatedBlogId: "",
					relatedBlogTitle: "",
				},
			],
		});
	};

	return (
		<div className={styles["container"]}>
			{loading ? <Loading /> : null}
			{notify && notify.message ? (
				<Notification isError={notify.isError} message={notify.message} />
			) : null}
			<img src={createBlogImage} alt="Create Blog Banner" />
			<form onSubmit={createBlog} id="createBlog" name="createBlog">
				<input
					id="blogTitle"
					onChange={handleChange}
					value={formData.blogTitle}
					placeholder="✨ Blog Title"
					name="blogTitle"
					type="text"
					required
				/>
				<textarea
					rows="10"
					id="blogContent"
					onChange={handleChange}
					value={formData.blogContent}
					name="blogContent"
					placeholder="‍✏️ Blog Content"
					type="text"
					required
				/>
				{formData.blogRelatedLinks.map((link, index) => {
					return (
						<fieldset key={index}>
							<legend>
								{formData.blogRelatedLinks[index].relatedBlogTitle
									? `${formData.blogRelatedLinks[index].relatedBlogTitle}`
									: "Related Link"}
							</legend>
							<input
								id={`relatedBlogId-${index}`}
								onChange={handleChange}
								value={formData.blogRelatedLinks[index].relatedBlogId}
								placeholder="🔗 Blog ID"
								name="relatedBlogId"
								type="text"
								required
							/>
							<input
								id={`relatedBlogTitle-${index}`}
								onChange={handleChange}
								value={formData.blogRelatedLinks[index].relatedBlogTitle}
								placeholder="📄 Blog Title"
								name="relatedBlogTitle"
								type="text"
								required
							/>
							<button
								onClick={() => {
									deleteRelatedLink(index);
								}}
								className={styles["btn-small"]}
							>
								❌
							</button>
						</fieldset>
					);
				})}
				<button onClick={addRelatedLink} className={styles["btn-small"]}>
					Add Related Link ➕
				</button>
				<label htmlFor="blogImages" className={styles["custom-file-upload"]}>
					{formData.blogImages.length > 0
						? "Images Added"
						: "📸 Upload Blog Images"}
				</label>
				<input
					className={styles["custom-file-input"]}
					onChange={handleChange}
					id="blogImages"
					name="blogImages"
					type="file"
					accept="image/*"
					multiple
				/>
				<button className="btn" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		raiseError: (message) => {
			dispatch({
				type: blogsActions.NOTIFY,
				payload: {
					notify: {
						message: message,
						isError: true,
						isWarning: false,
					},
				},
			});
		},
		clearNotification: () => {
			dispatch({
				type: blogsActions.NOTIFY,
				payload: {
					notify: {
						message: null,
						isError: false,
						isWarning: false,
					},
				},
			});
		},
		createBlog: (newBlog) => {
			dispatch(actionGenerator(blogsActions.CREATE, { newBlog }));
		},
	};
};

export default connect(null, mapDispatchToProps)(CreateBlog);
