import { useState, useEffect } from "react";
// import styles from "./signInPage.module.scss";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import actionGenerator from "../../redux/actionsGenerator/actions.generator";
import authActions from "../../redux/constants/auth.actions";
import Cookies from "js-cookie";
import styles from "./SignInPage.module.scss";
import signInImage from "../../assets/images/sign-in.svg";
import Loading from "../../components/loading/loading";
import Error from "../../components/error/error";

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
		const strongPasswordRegex = new RegExp(
			"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
		);
		if (!strongPasswordRegex.test(formData.password)) {
			return props.raiseError(
				"Password does not meet criteria. Password must be atleast of 8 characters or more and must not exceed 512 characters. Password must be combination of lowercase alphabets, uppercase alphabets, numbers and symbols out of !, @, #, $, %, ^, &, * "
			);
		}
		let user = new FormData();
		Object.keys(formData).forEach((key) => {
			user.append(key, formData[key]);
		});
		return props.signIn(user);
	};

	const isCookiePresent = () => {
		let jwt = Cookies.get("jwt");
		if (jwt !== undefined && jwt.length > 0) {
			return true;
		} else {
			return false;
		}
	};
	if (props.state.isLoggedIn && props.state.jwt && !isCookiePresent()) {
		Cookies.set("jwt", props.state.jwt);
	} else if (props.state.isLoggedIn && props.state.jwt && isCookiePresent()) {
		console.log("Navigating to Blogs");
		return <Redirect to={"/blogs"} exact />;
	} else {
		return (
			<div className={styles["container"]}>
				{props.state.loading ? <Loading /> : null}
				{props.state.error ? <Error errorMessage={props.state.error} /> : null}

				<img src={signInImage} alt="SignIn Banner" />
				<form>
					<label htmlFor="email"></label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="📧 Email"
						onChange={handleChange}
						value={formData.email}
						required
					/>
					<label htmlFor="password"></label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="🔐 Password"
						onChange={handleChange}
						value={formData.password}
						autoComplete="true"
						required
					/>
					<button className="btn" onClick={signIn}>
						SignIn
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

const mapDispatchToProps = (dispatch) => {
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
