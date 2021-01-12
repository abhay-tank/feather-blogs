import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SignUpPage from "../pages/SignUp/SignUpPage";
import HomePage from "../pages/home/HomePage";

export default class BlogsRouter extends Component {
	render() {
		return (
			<BrowserRouter>
				<Route path="/" exact>
					<HomePage />
				</Route>
				<Route path="/signUp" exact>
					<SignUpPage />
				</Route>
			</BrowserRouter>
		);
	}
}
