/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./navbarComponent.module.scss";
import signInIcon from "../../assets/images/icons/enter.svg";
import signUpIcon from "../../assets/images/icons/user.svg";
import blogsIcon from "../../assets/images/icons/blogs.svg";
import featherLogo from "../../assets/images/icons/feather-alt.svg";
import signOutIcon from "../../assets/images/icons/logout.svg";
import actionGenerator from "../../redux/actionsGenerator/actions.generator";
import authActions from "../../redux/constants/auth.actions";
import Cookies from "js-cookie";
import blogsActions from "../../redux/constants/blogs.actions";
function NavbarComponent(props) {
	const signOut = () => {
		if (props.authState.jwt) {
			const jwt = props.authState.jwt;
			Cookies.remove("jwt");
			props.signOut(jwt);
			props.wipeData();
			props.history.push("/");
		}
	};
	return (
		<div className={styles["navbar-container"]}>
			<Link className={styles["navbar-link"]} to="/">
				<img src={featherLogo} title="Feather Home" alt="Logo" />
				<p>Feather</p>
			</Link>
			{props.authState.isLoggedIn ? (
				<>
					<Link className={styles["navbar-link"]} to="/blogs">
						<img src={blogsIcon} title="Blogs" alt="blogsIcon" />
						<p>Blogs</p>
					</Link>
					<a
						onClick={signOut}
						className={`${styles["navbar-link"]} ${styles["sign-out"]}`}
					>
						<img src={signOutIcon} title="Sign Out" alt="Sign Out" />
						<p>Sign Out</p>
					</a>
				</>
			) : (
				<>
					<Link className={styles["navbar-link"]} to="/signUp">
						<img src={signUpIcon} title="SignUp" alt="signUpIcon" />
						<p>Sign Up</p>
					</Link>
					<Link className={styles["navbar-link"]} to="/signIn">
						<img src={signInIcon} title="SignIn" alt="signInIcon" />
						<p>Sign In</p>
					</Link>
				</>
			)}
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		authState: state.authReducer,
		blogsState: state.blogsReducer,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: (jwt) => {
			dispatch(actionGenerator(authActions.SIGNOUT, { jwt }));
		},
		wipeData: () => {
			dispatch(actionGenerator(blogsActions.WIPEDATA, {}));
		},
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(NavbarComponent));
