import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUpPage from "../pages/SignUp/SignUpPage";
import HomePage from "../pages/Home/HomePage";
import VerifyUser from "../pages/VerifiyUser/VerifyUser";
import SignInPage from "./../pages/SignIn/SignInPage";
import ProtectedRoute from "./ProtectedRoute";
import NavbarComponent from "./../components/navbar/navbarComponent";
import Blogs from "../pages/Blogs/Blogs";
export default class BlogsRouter extends Component {
	render() {
		return (
			<BrowserRouter>
				<NavbarComponent />
				<Switch>
					<Route path="/" exact>
						<HomePage />
					</Route>
					<Route path="/signUp" exact>
						<SignUpPage />
					</Route>
					<Route path="/signIn" exact>
						<SignInPage />
					</Route>
					<Route path="/auth/verifyUserAccount/:authToken">
						<VerifyUser />
					</Route>
					<ProtectedRoute exact path="/blogs" component={Blogs} />
				</Switch>
			</BrowserRouter>
		);
	}
}
