import React from "react";
import { Link } from "react-router-dom";
function NavbarComponent() {
	return (
		<div>
			<Link to="/">Home</Link>
			<br />
			<Link to="/signUp">SignUp</Link>
		</div>
	);
}

export default NavbarComponent;
