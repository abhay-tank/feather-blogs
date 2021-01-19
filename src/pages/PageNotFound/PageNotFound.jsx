import React from "react";
import styles from "./PageNotFound.module.scss";
import birdImage from "../../assets/images/404.gif";
import { Link } from "react-router-dom";
function PageNotFound() {
	return (
		<div className={styles["container"]}>
			<img src={birdImage} alt="404" />
			<h1>Nothing here. You lost???</h1>
			<Link className="btn" to="/">
				Home
			</Link>
		</div>
	);
}

export default PageNotFound;
