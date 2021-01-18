import React from "react";
import loadingSvg from "../../assets/images/loading.svg";
import styles from "./loading.module.scss";
function loading() {
	return (
		<div className={styles["loading-container"]}>
			<img src={loadingSvg} alt="loading-icon" />
		</div>
	);
}

export default loading;
