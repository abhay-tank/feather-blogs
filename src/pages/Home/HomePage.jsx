import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./HomePage.module.scss";
export default class HomePage extends Component {
	static propTypes = {
		user: PropTypes.object,
	};

	render() {
		return (
			<div className={styles["container"]}>
				<h1>Home Component</h1>
			</div>
		);
	}
}
