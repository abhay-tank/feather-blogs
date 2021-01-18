import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./HomePage.module.scss";
import logo from "../../assets/images/feather-logo.svg";
export default class HomePage extends Component {
	static propTypes = {
		user: PropTypes.object,
	};

	render() {
		return (
			<div>
				<div className={styles["container"]}>
					<img src={logo} alt="logo" />
					<h1>
						Publish your passions your way. Whether you'd like to share your
						knowledge, experiences or the latest news, create a unique and
						beautiful blog for free.
					</h1>
				</div>
			</div>
		);
	}
}
