import React from "react";
import { connect } from "react-redux";
import { useState } from "react";
import actionGenerator from "../../redux/actionsGenerator/actions.generator";
import authActions from "../../redux/constants/auth.actions";
function SignUpPage(props) {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		avatarImage: [],
	});
	const handleChange = (event) => {
		event.preventDefault();
		switch (event.target.name) {
			default:
				return null;
			case "firstName":
				if (event.target.value.trim().length <= 0) {
					props.raiseError("FirstName too short.");
					setFormData({ ...formData, firstName: event.target.value.trim() });
				} else {
					setFormData({ ...formData, firstName: event.target.value.trim() });
				}
				break;
			case "lastName":
				setFormData({ ...formData, lastName: event.target.value });
				break;
			case "email":
				setFormData({ ...formData, email: event.target.value });
				break;
			case "password":
				setFormData({ ...formData, password: event.target.value });
				break;
			case "avatarImage":
				if (event.target.files.length) {
					setFormData({ ...formData, avatarImage: event.target.files[0] });
				} else {
					props.raiseError("Upload avatar image.");
				}
				break;
		}
	};
	const signUp = (event) => {
		event.preventDefault();
		let newUser = new FormData();
		Object.keys(formData).forEach((key) => {
			if (key === "avatarImage") {
				newUser.append(key, formData[key], formData[key].name);
			} else {
				newUser.append(key, formData[key]);
			}
		});
		return props.signUp(newUser);
	};
	return (
		<div>
			{props.state.loading ? (
				<div>Loading</div>
			) : (
				<div>
					{props.state.error ? <h3>{props.state.error}</h3> : null}
					{props.state.isLoggedIn && !props.state.user.accountVerified ? (
						<h1>Verification email sent. Verify account and sign in.</h1>
					) : (
						<form onSubmit={signUp} id="signUpForm" name="signUpForm">
							<label htmlFor="firstName">First Name</label>
							<input
								id="firstName"
								onChange={handleChange}
								value={formData.firstName}
								name="firstName"
								type="text"
								required
							/>
							<br />
							<label htmlFor="lastName">Last Name</label>
							<input
								id="lastName"
								onChange={handleChange}
								value={formData.lastName}
								name="lastName"
								type="text"
							/>
							<br />
							<label htmlFor="email">Email</label>
							<input
								onChange={handleChange}
								value={formData.email}
								id="email"
								name="email"
								type="email"
								required
							/>
							<br />
							<label htmlFor="password">Password</label>
							<input
								onChange={handleChange}
								value={formData.password}
								id="password"
								name="password"
								type="password"
								autoComplete="true"
								required
							/>
							<br />
							<label htmlFor="avatarImage">Profile Image</label>
							<input
								onChange={handleChange}
								id="avatarImage"
								name="avatarImage"
								type="file"
								accept="image/*"
							/>
							<button type="submit">Submit</button>
						</form>
					)}
				</div>
			)}
		</div>
	);
}

export const mapStateToProps = (state, defaultProps) => {
	return {
		state: state.authReducer,
	};
};

export const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		signUp: (newUser) => {
			dispatch(actionGenerator(authActions.SIGNUP, { user: newUser }));
		},
		raiseError: (message) => {
			dispatch({
				type: authActions.ERROR,
				payload: { error: message },
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
