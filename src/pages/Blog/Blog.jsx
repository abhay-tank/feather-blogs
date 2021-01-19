import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import actionGenerator from "../../redux/actionsGenerator/actions.generator";
import blogsActions from "../../redux/constants/blogs.actions";
import styles from "./Blog.module.scss";
import Loading from "../../components/loading/loading";
import Error from "../../components/error/error";

function Blog(props) {
	useEffect(() => {
		if (props.history.location.pathName !== props.location.pathname) {
			props.fetchBlogById(props.match.params.blogId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.history.location.pathName, props.location.pathname]);

	let blog = props.blogsState.currentBlog;
	return (
		<div className={styles["container"]}>
			{props.blogsState.loading ? <Loading /> : null}
			{props.blogsState.error ? (
				<Error errorMessage={props.blogsState.error} />
			) : null}
			<h1>{blog.blogTitle}</h1>
			<h2>{blog.blogAuthor}</h2>
			<h3>{blog.blogId}</h3>
			<div>
				{blog.blogImages.map((image, index) => {
					return (
						<div key={index}>
							<img src={image.blogImageURL} alt={image.blogImageAlt} />
						</div>
					);
				})}
			</div>
			<p>{blog.blogContent}</p>
			<div>
				{blog.blogRelatedLinks.length
					? blog.blogRelatedLinks.map((link, index) => {
							return (
								<div className={styles["related-link"]} key={index}>
									<h1>{link.relatedBlogTitle}</h1>
									<Link to={`/blogs/${link.relatedBlogId}`}>
										<button className="btn">Read Blog</button>
									</Link>
								</div>
							);
					  })
					: null}
			</div>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBlogById: (blogId) => {
			dispatch(actionGenerator(blogsActions.GETBYID, { blogId: blogId }));
		},
	};
};
export default withRouter(connect(null, mapDispatchToProps)(Blog));
