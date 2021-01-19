import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUpPage from "../pages/SignUp/SignUpPage";
import HomePage from "../pages/Home/HomePage";
import VerifyUser from "../pages/VerifiyUser/VerifyUser";
import SignInPage from "./../pages/SignIn/SignInPage";
import ProtectedRoute from "./ProtectedRoute";
import NavbarComponent from "./../components/navbar/navbarComponent";
import Blogs from "../pages/Blogs/Blogs";
import Blog from "../pages/Blog/Blog";
import { connect } from "react-redux";
import actionGenerator from "../redux/actionsGenerator/actions.generator";
import authActions from "../redux/constants/auth.actions";
import Cookies from "js-cookie";
import CreateBlog from "../pages/CreateBlog/CreateBlog";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
function BlogsRouter(props) {
	const jwt = Cookies.get("jwt");
	useEffect(() => {
		if (!props.state.isLoggedIn) {
			if (jwt) {
				props.fetchSession(jwt);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (jwt && props.state.error) {
		Cookies.remove("jwt");
	}
	return (
		<BrowserRouter>
			<NavbarComponent />
			<div className="main-container">
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
					<ProtectedRoute exact path="/blogs/:blogId" component={Blog} />
					<ProtectedRoute exact path="/createBlog" component={CreateBlog} />
					<Route>
						<PageNotFound />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

const mapStateToProps = (state, defaultProps) => {
	return {
		state: state.authReducer,
	};
};

const mapDispatchToProps = (dispatch, getState) => {
	return {
		fetchSession: (jwt) => {
			dispatch(actionGenerator(authActions.FETCHSESSIONFROMCOOKIES, { jwt }));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(BlogsRouter);
