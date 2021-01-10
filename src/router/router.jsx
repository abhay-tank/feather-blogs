import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SignUpPage from "../pages/SignUp/SignUpPage";

export default class BlogsRouter extends Component {
	render() {
		return (
			<BrowserRouter>
				<Route path="/" exact>
					<h1>Hello world</h1>
				</Route>
				<Route path="/signUp" exact>
					<SignUpPage />
				</Route>
			</BrowserRouter>
		);
	}
}
