import React from "react";
import { connect } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import actionGenerator from "../../redux/actionsGenerator/actions.generator";
import authActions from "../../redux/constants/auth.actions";
import styles from "./SignUpPage.module.scss";
import signUpImage from "../../assets/images/sign-up.svg";
import Loading from "../../components/loading/loading";
import Notification from "../../components/notification/notification";
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
				break;
			case "firstName":
				if (event.target.value.trim().length <= 0) {
					props.raiseError("FirstName too short.");
					setFormData({ ...formData, firstName: event.target.value.trim() });
				} else {
					setFormData({ ...formData, firstName: event.target.value.trim() });
				}
				break;
			case "lastName":
				setFormData({ ...formData, lastName: event.target.value.trim() });
				break;
			case "email":
				setFormData({ ...formData, email: event.target.value.trim() });
				break;
			case "password":
				setFormData({ ...formData, password: event.target.value.trim() });
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
		const strongPasswordRegex = new RegExp(
			"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
		);
		if (!strongPasswordRegex.test(formData.password)) {
			return props.raiseError(
				"Password does not meet criteria. Password must be atleast of 8 characters or more and must not exceed 512 characters. Password must be combination of lowercase alphabets, uppercase alphabets, numbers and symbols out of !, @, #, $, %, ^, &, * "
			);
		}
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
	if (props.state.isLoggedIn) {
		return <Redirect to={"/blogs"} exact />;
	} else if (
		props.state.user.firstName &&
		props.state.user.firstName.length &&
		!props.state.user.accountVerified
	) {
		return (
			<div className={styles["container"]}>
				<h1>Verification email sent. Verify account and sign in.</h1>
			</div>
		);
	} else {
		return (
			<div className={styles["container"]}>
				{props.state.loading ? <Loading /> : null}
				{props.state.error ? (
					<Notification isError={true} message={props.state.error} />
				) : null}
				<img src={signUpImage} alt="SignUpBanner" />
				<form onSubmit={signUp} id="signUpForm" name="signUpForm">
					<input
						id="firstName"
						onChange={handleChange}
						value={formData.firstName}
						placeholder="👦 First Name"
						name="firstName"
						type="text"
						required
					/>
					<input
						id="lastName"
						onChange={handleChange}
						value={formData.lastName}
						name="lastName"
						placeholder="👨‍🦳 Last Name"
						type="text"
					/>
					<input
						onChange={handleChange}
						value={formData.email}
						id="email"
						name="email"
						placeholder="📧 Email"
						type="email"
						required
					/>
					<input
						onChange={handleChange}
						value={formData.password}
						id="password"
						name="password"
						type="password"
						placeholder="🔐 Password"
						autoComplete="true"
						required
					/>
					<label htmlFor="avatarImage" className={styles["custom-file-upload"]}>
						{formData.avatarImage && formData.avatarImage.name
							? formData.avatarImage.name.length > 20
								? `${formData.avatarImage.name.substring(0, 20)}...`
								: `${formData.avatarImage.name}`
							: "📸 Upload Avatar Image"}
					</label>
					<input
						className={styles["custom-file-input"]}
						onChange={handleChange}
						id="avatarImage"
						name="avatarImage"
						type="file"
						accept="image/*"
					/>
					<button className="btn" type="submit">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state, defaultProps) => {
	return {
		state: state.authReducer,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
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
