import React, { useEffect } from "react";
import { connect } from "react-redux";
import authActions from "../../redux/constants/auth.actions";
import blogsActions from "../../redux/constants/blogs.actions";
import styles from "./error.module.scss";
function Error(props) {
	useEffect(() => {
		setTimeout(() => {
			props.clearError();
		}, 5000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className={styles["error-container"]}>
			<h3>{props.errorMessage}</h3>
		</div>
	);
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const dispatchError = (dispatch, getState) => {
		const { authReducer: authState, blogsReducer: blogsState } = getState();
		if (authState.error) {
			dispatch({
				type: authActions.CLEARERROR,
				payload: {},
			});
		}
		if (blogsState.error) {
			dispatch({
				type: blogsActions.CLEARERROR,
				payload: {},
			});
		}
	};
	return {
		clearError: () => {
			dispatch(dispatchError);
		},
	};
};

export default connect(null, mapDispatchToProps)(Error);
