import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./navbarComponent.module.scss";
function NavbarComponent({ state }) {
	return (
		<div className={styles["navbar-container"]}>
			<Link className={styles["navbar-link"]} to="/">
				Home
			</Link>
			{state.isLoggedIn ? (
				<Link className={styles["navbar-link"]} to="/blogs">
					Blogs
				</Link>
			) : (
				<>
					<Link className={styles["navbar-link"]} to="/signUp">
						SignUp
					</Link>
					<Link className={styles["navbar-link"]} to="/signIn">
						SignIn
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
