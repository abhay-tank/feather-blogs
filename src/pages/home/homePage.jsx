import React, { Component } from "react";
import PropTypes from "prop-types";
// import styles from "./homePage.module.scss";
import NavbarComponent from "./../../components/navbar/navbarComponent";
export default class HomePage extends Component {
	static propTypes = {
		user: PropTypes.object,
	};

	render() {
		return (
			<div>
				<NavbarComponent />
				<h1>Home Component</h1>
			</div>
		);
	}
}
