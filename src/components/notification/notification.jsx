import React, { useEffect } from "react";
import { connect } from "react-redux";
import authActions from "../../redux/constants/auth.actions";
import blogsActions from "../../redux/constants/blogs.actions";
import styles from "./notification.module.scss";
function Notification(props) {
	useEffect(() => {
		setTimeout(() => {
			props.hideNotification();
		}, 5000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div
			className={`${styles["notification-container"]} ${
				props.isError ? styles["notify-error"] : styles["notify-success"]
			}`}
		>
			<h3>{props.message}</h3>
		</div>
	);
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const dispatchError = (dispatch, getState) => {
		const { authReducer: authState, blogsReducer: blogsState } = getState();
		if (authState.notify.message) {
			dispatch({
				type: authActions.NOTIFY,
				payload: {
					notify: {
						message: null,
						isError: false,
						isWarning: false,
					},
				},
			});
		}
		if (blogsState.notify.message) {
			dispatch({
				type: blogsActions.NOTIFY,
				payload: {
					notify: {
						message: null,
						isError: false,
						isWarning: false,
					},
				},
			});
		}
	};
	return {
		hideNotification: () => {
			dispatch(dispatchError);
		},
	};
};

export default connect(null, mapDispatchToProps)(Notification);
