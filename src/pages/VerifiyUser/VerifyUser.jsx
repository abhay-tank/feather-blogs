import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import actionGenerator from "./../../redux/actionsGenerator/actions.generator";
import authActions from "./../../redux/constants/auth.actions";
import styles from "./VerifyUser.module.scss";
import Loading from "../../components/loading/loading";
import Notification from "../../components/notification/notification";

function VerifyUser(props) {
	useEffect(() => {
		if (!props.state.isLoggedIn) {
			console.log("DATA FETCHED FOR VERIFICATION");
			props.verifyUserAccount(props.match.params.authToken);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles["container"]}>
			{props.state.loading ? <Loading /> : null}
			{props.state.error ? (
				<Notification isError={true} message={props.state.error} />
			) : null}
			{props.state.user.accountVerified ? (
				<>
					{" "}
					<h1>You are successfully verified. SignIn to continue</h1>
					<Link to="/signIn">
						<button className="btn">Sign In</button>
					</Link>
				</>
			) : (
				<h1>Signup first.</h1>
			)}
		</div>
	);
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
