import React, { Component } from "react";
import { Route } from "react-router-dom";

export default class ProtectedRoute extends Component {
	render() {
		return <Route path="/blogs" />;
	}
}
