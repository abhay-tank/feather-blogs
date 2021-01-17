import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import actionGenerator from "../../redux/actionsGenerator/actions.generator";
import blogsActions from "../../redux/constants/blogs.actions";
import styles from "./Blog.module.scss";
function Blog(props) {
	useEffect(() => {
		if (props.blogsState.currentBlog.blogId === null) {
			props.fetchBlogById(props.match.params.blogId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (props.blogsState.loading) {
		return <h1>Loading</h1>;
	} else {
		let blog = props.blogsState.currentBlog;
		return (
			<div className={styles["container"]}>
				{props.blogsState.error ? <h1>{props.blogsState.error}</h1> : null}
				<h1>{blog.blogTitle}</h1>
				<h3>{blog.blogAuthor}</h3>
				<h4>{blog.blogId}</h4>
				<div>
					{blog.blogImages.map((image) => {
						return (
							<div key={image._id}>
								<img src={image.blogImageURL} alt={image.blogImageAlt} />
							</div>
						);
					})}
				</div>
				<p>{blog.blogContent}</p>
				<div>
					{blog.blogRelatedLinks.length
						? blog.blogRelatedLinks.map((link) => {
								return (
									<Link key={link.relatedBlogId}>{link.relatedBlogTitle}</Link>
								);
						  })
						: null}
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBlogById: (blogId) => {
			dispatch(actionGenerator(blogsActions.GETBYID, { blogId: blogId }));
		},
	};
};
export default connect(null, mapDispatchToProps)(withRouter(Blog));
