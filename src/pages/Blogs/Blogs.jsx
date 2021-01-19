import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import actionGenerator from "../../redux/actionsGenerator/actions.generator";
import blogsActions from "../../redux/constants/blogs.actions";
import styles from "./Blogs.module.scss";
import createBlog from "../../assets/images/icons/create-blog.svg";
import Loading from "../../components/loading/loading";
import Error from "../../components/error/error";

function Blogs(props) {
	useEffect(() => {
		if (!props.blogsState.blogs.length) {
			props.getAllBlogs();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles["container"]}>
			{props.blogsState.loading ? <Loading /> : null}
			<div className={`${styles["blog-card"]} ${styles["create-card"]}`}>
				<img src={createBlog} alt="Create Blog Icon" />
				<Link to="/createBlog" className={styles["btn-small"]}>
					Create Blog ✒️
				</Link>
			</div>
			{props.blogsState.error ? (
				<Error errorMessage={props.blogsState.error} />
			) : null}

			{props.blogsState.blogs.map((blog) => {
				return (
					<div key={blog.blogId} className={styles["blog-card"]}>
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

const mapDispatchToProps = (dispatch) => {
	return {
		getAllBlogs: () => {
			dispatch(actionGenerator(blogsActions.GETALL, {}));
		},
	};
};

export default withRouter(connect(null, mapDispatchToProps)(Blogs));
