import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./navbarComponent.module.scss";
import signInIcon from "../../assets/images/icons/enter.svg";
import signUpIcon from "../../assets/images/icons/user.svg";
import blogsIcon from "../../assets/images/icons/blogs.svg";
import featherLogo from "../../assets/images/icons/logo.svg";
import signOutIcon from "../../assets/images/icons/logout.svg";
function NavbarComponent({ state }) {
	return (
		<div className={styles["navbar-container"]}>
			<Link className={styles["navbar-link"]} to="/">
				<img src={featherLogo} title="Feather Home" alt="Logo" />
			</Link>
			{state.isLoggedIn ? (
				<>
					<Link className={styles["navbar-link"]} to="/blogs">
						<img src={blogsIcon} title="Blogs" alt="blogsIcon" />
					</Link>
					<Link
						className={`${styles["navbar-link"]} ${styles["sign-out"]}`}
						to="/signOut"
					>
						<img src={signOutIcon} title="Sign Out" alt="Sign Out" />
					</Link>
				</>
			) : (
				<>
					<Link className={styles["navbar-link"]} to="/signUp">
						<img src={signUpIcon} title="SignUp" alt="signUpIcon" />
					</Link>
					<Link className={styles["navbar-link"]} to="/signIn">
						<img src={signInIcon} title="SignIn" alt="signInIcon" />
					</Link>
				</>
			)}
		</div>
	);
}
export const mapStateToProps = (state) => {
	return {
		state: state.authReducer,
	};
};
export default connect(mapStateToProps)(NavbarComponent);
