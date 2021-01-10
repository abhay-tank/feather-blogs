import React from "react";
import { connect } from "react-redux";

function SignUpPage(props) {
	return (
		<div>
			{props.state.loading ? (
				<div>Loading</div>
			) : props.state.error ? (
				<div>Error</div>
			) : (
				<div>
					<form>
						<label htmlFor="firstName">First Name</label>
						<input id="firstName" name="firstName" type="text" required />
						<br />
						<label htmlFor="lastName">Last Name</label>
						<input id="lastName" name="lastName" type="text" />
						<br />
						<label htmlFor="email">Email</label>
						<input id="email" name="email" type="email" required />
						<br />
						<label htmlFor="password">Password</label>
						<input id="password" name="password" type="password" required />
						<br />
						<label htmlFor="avatarImage">Profile Image</label>
						<input
							id="avatarImage"
							name="avatarImage"
							type="file"
							accept="image/*"
						/>
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

export default connect(mapStateToProps)(SignUpPage);
