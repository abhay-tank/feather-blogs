import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

export default class BlogsRouter extends Component {
	render() {
		return (
			<BrowserRouter>
				<Route path="/" exact>
					<h1>Hello world</h1>
				</Route>
			</BrowserRouter>
		);
	}
}
