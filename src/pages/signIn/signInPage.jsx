import React, { Component } from "react";
import PropTypes from "prop-types";
// import styles from "./signInPage.module.scss";
export default class signInPage extends Component {
	static propTypes = {
		user: PropTypes.object,
	};

	render() {
		return (
			<div>
				<h1>Sign In Page</h1>
			</div>
		);
	}
}
