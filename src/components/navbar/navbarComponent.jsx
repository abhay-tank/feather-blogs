import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbarComponent.module.scss";
function NavbarComponent() {
	return (
		<div className={styles["navbar-container"]}>
			<Link className={styles["navbar-link"]} to="/">
				Home
			</Link>
			<br />
			<Link className={styles["navbar-link"]} to="/signUp">
				SignUp
			</Link>
			<Link className={styles["navbar-link"]} to="/signIn">
				SignIn
			</Link>
		</div>
	);
}

export default NavbarComponent;
