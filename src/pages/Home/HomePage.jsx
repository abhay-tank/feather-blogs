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
					<button className="btn">Get Started</button>
				</div>
			</div>
		);
	}
}
