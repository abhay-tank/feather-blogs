import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUpPage from "../pages/SignUp/SignUpPage";
import HomePage from "../pages/Home/HomePage";

export default class BlogsRouter extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" exact>
						<HomePage />
					</Route>
					<Route path="/signUp" exact>
						<SignUpPage />
					</Route>
				</Switch>
			</BrowserRouter>
		);
	}
}
