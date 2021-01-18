import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";
function ProtectedRoute({
	component: Component,
	authState,
	blogsState,
	...rest
}) {
	const isCookiePresent = () => {
		let jwt = Cookies.get("jwt");
		if (jwt !== undefined && jwt.length > 0) {
			return true;
		} else {
			return false;
		}
	};
	if (authState.isLoggedIn && isCookiePresent()) {
		return (
			<Route
				{...rest}
				render={(props) => (
					<Component authState={authState} blogsState={blogsState} {...props} />
				)}
			/>
		);
	} else {
		console.log("Navigating to signIn");
		return <Redirect to="/signIn" exact />;
	}
}

export const mapStateToProps = (state, defaultProps) => {
	return {
		authState: state.authReducer,
		blogsState: state.blogsReducer,
	};
};

export default connect(mapStateToProps)(ProtectedRoute);
