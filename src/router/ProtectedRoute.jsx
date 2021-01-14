import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({
	component: Component,
	authState,
	blogsState,
	...rest
}) {
	if (authState.isLoggedIn) {
		return (
			<Route
				{...rest}
				render={(props) => (
					<Component authState={authState} blogsState={blogsState} {...props} />
				)}
			/>
		);
	} else {
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
