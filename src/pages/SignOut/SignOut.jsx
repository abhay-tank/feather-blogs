import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import actionGenerator from "../../redux/actionsGenerator/actions.generator";
import authActions from "../../redux/constants/auth.actions";
function SignOut(props) {
	useEffect(() => {
		if (props.authState.isLoggedIn && props.authState.jwt) {
			Cookies.remove("jwt");
			props.signOut(props.authState.jwt);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (props.authState.isLoggedIn) {
		return <div>Signing Out</div>;
	} else {
		props.history.push("/");
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: (jwt) => {
			dispatch(actionGenerator(authActions.SIGNOUT, { jwt }));
		},
	};
};
export default connect(null, mapDispatchToProps)(withRouter(SignOut));
