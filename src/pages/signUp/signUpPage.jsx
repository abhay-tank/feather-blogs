import React, { Component } from "react";
import PropTypes from "prop-types";
// import styles from "./signUpPage.module.scss";
export default class signUpPage extends Component {
	static propTypes = {
		user: PropTypes.object,
	};

	render() {
		return (
			<div>
				<h1>Sign Up Page</h1>
			</div>
		);
	}
}
