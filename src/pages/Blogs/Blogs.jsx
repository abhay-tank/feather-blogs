import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import actionGenerator from "../../redux/actionsGenerator/actions.generator";
import blogsActions from "../../redux/constants/blogs.actions";
import styles from "./Blogs.module.scss";
function Blogs(props) {
	useEffect(() => {
		if (!props.blogsState.blogs.length) {
			props.getAllBlogs();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (props.blogsState.loading) {
		return <h1>Loading</h1>;
	} else {
		return (
			<div className={styles["container"]}>
				<div className={styles["blog-card"]}>
					<h1>Create Blog</h1>
				</div>
				{props.blogsState.error ? <h1>{props.blogsState.error}</h1> : null}
				{props.blogsState.blogs.map((blog) => {
					return (
						<div className={styles["blog-card"]} key={blog.blogId}>
							<h1>{blog.blogTitle}</h1>
							<hr className={styles["hr"]} />
							<h3>{blog.blogAuthor}</h3>
							<h4>{blog.blogId}</h4>
							<p>
								{blog.blogContent.length > 100
									? blog.blogContent.substring(0, 100) + "  ....."
									: blog.blogContent}
							</p>
							<Link to={`/blogs/${blog.blogId}`}>
								<button className={styles["btn-small"]}>Read more</button>
							</Link>
						</div>
					);
				})}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllBlogs: () => {
			dispatch(actionGenerator(blogsActions.GETALL, {}));
		},
	};
};

export default connect(null, mapDispatchToProps)(withRouter(Blogs));
