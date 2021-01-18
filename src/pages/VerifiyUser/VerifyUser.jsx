import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import actionGenerator from "./../../redux/actionsGenerator/actions.generator";
import authActions from "./../../redux/constants/auth.actions";
import Loading from "../../components/loading/loading";

function VerifyUser(props) {
	useEffect(() => {
		if (!props.state.isLoggedIn) {
			console.log("DATA FETCHED FOR VERIFICATION");
			props.verifyUserAccount(props.match.params.authToken);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (props.state.user.accountVerified) {
		return (
			<div>
				<h1>You are successfully verified. SignIn to continue</h1>
				<Link to="/signIn">
					<button>Sign In</button>
				</Link>
			</div>
		);
	} else if (props.state.error) {
		return <h1>{props.state.error}</h1>;
	} else if (props.state.loading) {
		return <Loading />;
	} else {
		return <h1>Signup first.</h1>;
	}
}

const mapStateToProps = (state, defaultProps) => {
	return {
		state: state.authReducer,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		verifyUserAccount: (token) => {
			dispatch(
				actionGenerator(authActions.VERIFYUSER, { verificationToken: token })
			);
		},
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(VerifyUser)
);
