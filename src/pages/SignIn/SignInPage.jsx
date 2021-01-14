import { useState, useEffect } from "react";
// import styles from "./signInPage.module.scss";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import actionGenerator from "../../redux/actionsGenerator/actions.generator";
import authActions from "../../redux/constants/auth.actions";

function SignInPage(props) {
	let [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	useEffect(() => {
		if (
			!formData.email.length &&
			props.state.user.email &&
			props.state.user.email.length
		) {
			setFormData({ ...formData, email: props.state.user.email });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (event) => {
		event.preventDefault();
		switch (event.target.name) {
			case "email":
				setFormData({ ...formData, email: event.target.value.trim() });
				break;
			case "password":
				setFormData({ ...formData, password: event.target.value.trim() });
				break;
			default:
				break;
		}
	};

	const signIn = (event) => {
		event.preventDefault();
		let user = new FormData();
		Object.keys(formData).forEach((key) => {
			user.append(key, formData[key]);
		});
		return props.signIn(user);
	};
	if (props.state.isLoggedIn) {
		return <Redirect to={"/blogs"} exact />;
	} else if (props.state.loading) {
		return <h1>Loading</h1>;
	} else {
		return (
			<div>
				{props.state.error && props.state.error.length ? (
					<h1>{props.state.error}</h1>
				) : null}
				<form>
					<label htmlFor="email"></label>
					<input
						type="email"
						name="email"
						id="email"
						onChange={handleChange}
						value={formData.email}
						required
					/>
					<label htmlFor="password"></label>
					<input
						type="password"
						name="password"
						id="password"
						onChange={handleChange}
						value={formData.password}
						autoComplete="true"
						required
					/>
					<button onClick={signIn}>SignIn</button>
				</form>
			</div>
		);
	}
}

export const mapStateToProps = (state, defaultProps) => {
	return {
		state: state.authReducer,
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (user) => {
			dispatch(actionGenerator(authActions.SIGNIN, { user: user }));
		},
		raiseError: (message) => {
			dispatch({
				type: authActions.ERROR,
				payload: { error: message },
			});
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(SignInPage));
