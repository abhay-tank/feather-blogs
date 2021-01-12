import React from "react";
import { connect } from "react-redux";
import { useState } from "react";
import actionGenerator from "../../redux/actionsGenerator/actions.generator";
import authActions from "./../../redux/constants/auth.actions";
function SignUpPage(props) {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		avatarImage: [],
	});
	const [error, setError] = useState({
		hasError: false,
		message: "",
	});
	const handleChange = (event) => {
		event.preventDefault();
		setError({ ...error, hasError: false, message: "" });
		switch (event.target.name) {
			default:
				return null;
			case "firstName":
				if (event.target.value.trim().length <= 0) {
					setError({
						...error,
						hasError: true,
						message: "FirstName too short.",
					});
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
					console.log(event.target.files[0]);
					setFormData({ ...formData, avatarImage: event.target.files[0] });
				} else {
					setError({ hasError: true, message: "Upload avatar image." });
				}
				break;
		}
	};
	const signUp = (event) => {
		event.preventDefault();
		let newUser = new FormData();
		Object.keys(formData).forEach((key) => {
			console.log(newUser);
			if (key === "avatarImage") {
				console.log("Image => ", formData[key].name);
				newUser.append(key, formData[key], formData[key].name);
			} else {
				newUser.append(key, formData[key]);
			}
		});
		console.log(newUser.getAll());
		// return props.signUp(event, newUser);
	};
	return (
		<div>
			{props.state.loading ? (
				<div>Loading</div>
			) : props.state.error ? (
				<div>Error</div>
			) : (
				<div>
					{error.hasError ? <h3>{error.message}</h3> : null}
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
		signUp: (event, newUser) => {
			event.preventDefault();
			console.log(newUser);
			dispatch(actionGenerator(authActions.SIGNUP, { user: newUser }));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
